import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import Post from "../../../../../models/post";

export async function GET() {
    await connect();

    const recentPost = await Post.find()
        .sort({ createAt: -1 })
        .limit(5);

        return NextResponse.json(recentPost);
}