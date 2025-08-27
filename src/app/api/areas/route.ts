import { connect } from "@/lib/mongodb";
import Post from "models/post";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest,) {
    await connect();

    try {
        const areaWithPosts = await Post.distinct("area", { area: { $ne: null } });
        console.log("area:", areaWithPosts)
        return NextResponse.json(areaWithPosts)
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "内部サーバーエラー" }, { status: 500 });
    }


}