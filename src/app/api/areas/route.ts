import { connect } from "@/lib/mongodb";
import Post from "models/post";
import { NextResponse } from "next/server";


export async function GET() {
    await connect();

    try {
        const areaWithPosts = await Post.aggregate([
            { $match: { area: { $ne: null } } },
            { $group: { _id: "$areas", count: { $sum: 1 } } },
            { $project: { slug: "$_id", count: 1, _id: 0 } },
        ]);
        console.log("area:", areaWithPosts)
        return NextResponse.json(areaWithPosts)
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "内部サーバーエラー" }, { status: 500 });
    }


}