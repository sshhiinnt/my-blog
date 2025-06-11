import { NextResponse } from "next/server";
import formidable, { File } from "formidable";
import fs from "fs";
import path from "path";
import { connect } from "../../../../lib/mongodb";
import Post from "models/post";
import Category from "models/category";
import { ReadableStreamBuffer } from 'stream-buffers';


export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadsDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

export async function POST(req: Request) {
    await connect();

    const form = formidable({
        multiples: true,
        uploadDir: uploadsDir,
        keepExtensions: true,
        filename: (name, ext, part) => {
            return Date.now() + "_" + part.originalFilename;
        },
    });

    const buffer = await req.arrayBuffer();
    const data = Buffer.from(buffer);

    return new Promise((resolve, reject) => {
        form.parse(
            Object.assign(new ReadableStreamBuffer(data), {
                headers: req.headers,
                methods: req.method,
            }),

            async (err, fields, files) => {
                if (err) {
                    console.error("フォーム解析エラー", err);
                    return resolve(NextResponse.json({ error: "form parse error" }, { status: 500 }));
                }

                try {
                    const title = fields.title?.[0] || "";
                    const content = fields.content?.[0] || "";
                    const categoryId = fields.category?.[0] || "";

                    if (!title || !content || !categoryId) {
                        return resolve(NextResponse.json({ error: "Missing fields" }, { status: 500 }));
                    }

                    const category = await Category.findById(categoryId);
                    if (!category) {
                        return resolve(NextResponse.json({ error: "Invalid category" }, { status: 400 }));
                    }

                    const imagePaths: string[] = [];
                    const images = files.images ? (Array.isArray(files.images) ? files.images : [files.images]) : [];

                    images.forEach((img: File) => {
                        imagePaths.push("/uploads/" + path.basename(img.filepath));
                    });

                    const newPost = new Post({
                        title,
                        content,
                        category: category._id,
                        images: imagePaths,
                        createAt: new Date(),
                    });

                    await newPost.save();

                    return resolve(NextResponse.json({ message: "投稿作成成功", post: newPost }, { status: 201 }));
                } catch (e) {
                    console.error("保存失敗:", e);
                    return resolve(NextResponse.json({ error: "Failed to save post" }, { status: 500 }));
                }

            }
        )
    })
}