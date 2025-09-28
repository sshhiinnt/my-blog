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
    climbDate: z.string().optional(),
    area: z.string().optional(),
});


export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "認証または管理者権限がありません" }, { status: 401 });
    }

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
        });

        await connect();


        const post = await Post.create(validated);


        return NextResponse.json({ success: true, data: post }, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("バリデーションまたはDBエラー", error);
        return NextResponse.json({ error: message || "不明なエラー" }, { status: 500 });
    }
}


