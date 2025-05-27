import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import Post from "../../../models/post";

export async function GET(request: NextRequest) {
    try {
        await connect();
        const posts = await Post.find({}).lean();
        return NextResponse.json({ succes: true, data: posts });
    } catch (error) {
        return NextResponse.json({ succes: false, error: (error as Error).message }, { status: 500 });

    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json;
        await connect();
        const post = await Post.create(body);
        return NextResponse.json({ succes: true, data: post }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ succes: false, error: (error as Error).message }, { status: 400 });

    }
}







