import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/lib/mongodb";
import Post from "../../../models/post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import z from "zod";
import { IncomingForm } from "formidable";
import { generateSlug } from "@/lib/slugify";


export const config = {
    api: {
        bodyParser: false,
    },
};

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



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session || session.user.role !== "admin") {
        return res.status(401).json({ success: false, error: "認証または管理者権限がありません" });
    }

    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }


    const form = new IncomingForm();
    form.parse(req, async (err, fields) => {
        if (err) {
            return res.status(500).json({ success: false, error: "フォーム解析エラー" });
        }

        try {
            const title = fields.title?.toString() || "";
            const description = fields.description?.toString() || "";
            const content = fields.content?.toString() || "";
            const parsedCategory = JSON.parse(fields.category?.toString() || "{}");
            const thumbnailUrl = fields.thumbnailUrl?.toString();
            const slug = await generateSlug(title);
            const climbDateStr = fields.climbDate?.toString();
            const climbDate = climbDateStr ? new Date(climbDateStr) : undefined;
            const areaStr = fields.area?.toString();
            const areaValue = areaStr && areaStr.trim() !== "" ? areaStr : null;

            let images: Array<{ url: string, width: number, height: number }> = [];
            if (fields.images) {
                const rawImages = Array.isArray(fields.images) ? fields.images : [fields.images];

                images = rawImages
                    .map(imgStr => {
                        if (typeof imgStr === "string") {
                            try {
                                return JSON.parse(imgStr) as Array<{ url: string, width: number, height: number }>;
                            } catch (e) {
                                console.error("JSON parse error for image:", imgStr, e);
                                return [];
                            }
                        }
                        return [];
                    })
                    .flat();
            }

            console.log("API で受け取った images:", fields.images);


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


            return res.status(201).json({ success: true, data: post });
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error("バリデーションまたはDBエラー", error);
            return res.status(500).json({ success: false, error: message || "不明なエラー" });
        }
    });
}

