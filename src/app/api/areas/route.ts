import { connect } from "@/lib/mongodb";
import Post from "models/post";
import { NextResponse } from "next/server";


const slugMap: Record<string, string> = {
    "九州": "kyushu",
    "四国": "shikoku",
    "中国地方": "chugoku",
    "近畿地方": "kinki",
    "中部地方": "chubu",
    "北アルプス": "north_alps",
    "中央アルプス": "central_alps",
    "南アルプス": "south_alps",
    "関東": "kanto",
    "東北": "tohoku",
    "北海道": "hokkaido",
    "未指定": "noarea",
};

export async function GET() {
    await connect();


    try {
        const areaWithPosts = await Post.aggregate([
            { $match: { area: { $ne: null } } },
            { $group: { _id: "$area", count: { $sum: 1 } } },
            {
                $project: {
                    slug: { $literal: "" },
                    name: "$_id",
                    count: 1,
                    _id: 0
                }
            },
        ]);
        const result = areaWithPosts.map(a => ({
            ...a,
            slug: slugMap[a.name] || a.name,
        }));
        return NextResponse.json(result)
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "内部サーバーエラー" }, { status: 500 });
    }


}