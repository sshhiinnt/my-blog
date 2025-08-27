import { connect } from "@/lib/mongodb";
import Post from "models/post";
import { NextResponse } from "next/server";

export async function GET() {
    await connect();

    const archive = await Post.aggregate([
        { $match: { climbDate: { $ne: null } } },
        {
            $group: {
                _id: {
                    year: { $year: "$climbDate" },
                    month: { $month: "$climbDate" },
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { "_id.year": -1, "_id.month": -1 } },
    ]);

    const result = archive.map(a => ({
        label: `${a._id.year}年${a._id.month}月(${a.count})`,
        year: a._id.year,
        month: a._id.month,
    }));
    return NextResponse.json(result);
}