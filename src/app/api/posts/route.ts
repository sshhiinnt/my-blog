import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import Post from "../../../../models/post";

export async function GET(req: NextRequest) {
    try {
        await connect();

        const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
        const limit = 8;
        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Post.countDocuments();
        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({ success: true, posts, total, totalPages });

    } catch (error) {
        console.error("GET /api/posts error:", error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}



