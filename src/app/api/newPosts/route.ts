import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import Post from "../../../../models/post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import z from "zod";
import { generateSlug } from "@/lib/slugify";


const postSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    content: z.string().min(1),
    slug: z.string().min(1),
    thumbnailUrl: z.string().url().optional(),
    category: z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        group: z.string().min(1),
    }),
    images: z.array(
        z.object({
            url: z.string().url(),
            width: z.number(),
            height: z.number(),
        })
    ).default([]),
    climbDate: z.date().optional(),
    socialCaption: z.string().optional(),
    area: z.string().optional(),
});

async function generateCaption(content: string) {
    try {
        const res = await fetch(
            `https://api.groq.com/openai/v1/chat/completions`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    model: "llama-3.1-8b-instant",
                    messages: [
                        {
                            role: "system",
                            content: "あなたはクライミング記事のSNSキャプションを作る編集者です"
                        },
                        {
                            role: "user",
                            content: `
                                以下の記事からInstagram用キャプションを作ってください。

                                条件
                                ・詩的一行
                                ・英語訳
                                ・40文字以内
                                ・説明禁止
                                ・その下にSEOハッシュタグを日本語と英語6個ずつ

                                形式

                                キャプション
                                キャプション英語訳
                                #タグ1 #タグ2 #タグ3 #タグ4 #タグ5 #タグ6
                                #tag1 #tag2 #tag3 #tag4 #tag5 #tag6

                                記事
                                ${content.slice(0, 400)}
                                `
                        }
                    ],
                    temperature: 0.7
                })
            });
        if (!res.ok) {
            console.error("GROQ error:", await res.text());
            return "";
        }

        const data = await res.json();

        console.log("CAPTION:", data?.choices?.[0]?.message?.content);

        return data?.choices?.[0]?.message?.content ?? "";

    } catch (e) {
        console.error("AI caption error:", e);
        return "";
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "認証または管理者権限がありません" }, { status: 401 });
    }

    await connect();

    try {
        const formData = await req.formData();

        const title = formData.get("title")?.toString() || "";
        const description = formData.get("description")?.toString() || "";
        const content = formData.get("content")?.toString() || "";
        const rawCategory = formData.get("category")?.toString() || "{}";
        const parsedCategory = JSON.parse(rawCategory);
        const thumbnailUrl = formData.get("thumbnailUrl")?.toString();
        const slug = await generateSlug(title);
        const climbDateStr = formData.get("climbDate")?.toString();
        const climbDate = climbDateStr ? new Date(climbDateStr) : undefined;
        const areaStr = formData.get("area")?.toString();
        const areaValue = areaStr && areaStr.trim() !== "" ? areaStr : null;
        const rawImages = formData.get("images")?.toString() || "[]";
        const images: Array<{ url: string; width: number; height: number }> = JSON.parse(rawImages);
        const caption = await generateCaption(content);



        const validated = postSchema.parse({
            title,
            content,
            slug,
            description,
            thumbnailUrl: thumbnailUrl && thumbnailUrl.trim() !== "" ? thumbnailUrl : undefined,
            category: {
                name: parsedCategory.name || "",
                slug: parsedCategory.slug || "",
                group: parsedCategory.group || "",
            },
            images,
            climbDate,
            area: areaValue,
            socialCaption: caption,
        });


        console.log("validated:", validated);

        const post = await Post.create(validated);




        return NextResponse.json({ success: true, data: post }, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("バリデーションまたはDBエラー", error);
        return NextResponse.json({ error: message || "不明なエラー" }, { status: 500 });
    }
}


