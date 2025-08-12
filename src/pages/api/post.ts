import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/lib/mongodb";
import Post from "../../../models/post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import z from "zod";
import { IncomingForm } from "formidable";
import { slugify } from "@/lib/slugify";

export const config = {
    api: {
        bodyParser: false,
    },
};

const postSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    slug: z.string().min(1),
    thumbnailUrl: z.string().url().optional(),
    category: z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        group: z.string().min(1),
    }),
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
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ success: false, error: "フォーム解析エラー" });
        }

        try {
            const title = fields.title?.toString() || "";
            const content = fields.content?.toString() || "";
            const parsedCategory = JSON.parse(fields.category?.toString() || "{}");
            const thumbnailUrl = fields.thumbnailUrl?.toString();
            const slug = slugify(title);

            console.log("thumbnailUrl:", thumbnailUrl);


            const validated = postSchema.parse({
                title,
                content,
                slug,
                thumbnailUrl: thumbnailUrl && thumbnailUrl.trim() !== "" ? thumbnailUrl : undefined,
                category: {
                    name: parsedCategory.name || "",
                    slug: parsedCategory.slug || "",
                    group: parsedCategory.group || "",
                },
            });

            await connect();

            if (files.image) {
                console.log("アップロードされたファイル:", files.image);
            }

            const post = await Post.create(validated);


            return res.status(201).json({ success: true, data: post });
        } catch (error: any) {
            console.error("バリデーションまたはDBエラー", error);
            return res.status(500).json({ success: false, error: error.message || "不明なエラー" });
        }
    });
}

