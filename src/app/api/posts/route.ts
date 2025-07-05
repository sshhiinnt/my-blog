import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import Post from "../../../../models/post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import z from "zod";

export async function GET(req: NextRequest) {
    try {
        await connect();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = 8;
        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Post.countDocuments();

        return NextResponse.json({ success: true, posts, total });

    } catch (error) {
        console.error("GET /api/posts error:", error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ success: false, error: "認証または管理者権限がありません" }, { status: 401 });
    }

    const postSchema = z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        category: z.string().min(1),
        slug: z.string().min(1),
    })


    try {
        const body = await request.json();
        const validated = postSchema.parse(body);

        await connect();
        const post = await Post.create(validated);
        return NextResponse.json({ success: true, data: post }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });

    }
}
