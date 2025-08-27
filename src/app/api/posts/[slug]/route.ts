import { connect } from "@/lib/mongodb";
import Post from "models/post";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        await connect();
        const post = await Post.findOne({ slug: params.slug }).lean();
        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }
        return NextResponse.json(post);
    } catch (error) {
        console.error("GET post Error:", error);
        return NextResponse.json({ message: "Internal server Error:", error }, { status: 500 });
    }
}
export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        await connect();
        const body = await req.json();

        let { category } = body;
        if (typeof category === "string") {
            try {
                category = JSON.parse(category)
            } catch (e) {
                return NextResponse.json({ message: "Invalid category format" }, { status: 400 })
            }
        }

        const updatedPost = await Post.findOneAndUpdate(
            { slug: params.slug },
            {
                title: body.title,
                content: body.content,
                thumbnailUrl: body.thumbnailUrl,
                category: category,
                climbDate: body.climbDate || null,
                area: body.area || "",
                updatedAt: new Date(),
            },
            { new: true }
        );

        if (!updatedPost) {
            return NextResponse.json({ message: "post not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Post updated", post: updatedPost });
    } catch (error) {
        console.error("PUT post error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        await connect();
        console.log("Deleting post with slug:", params.slug);
        const result = await Post.findOneAndDelete({ slug: params.slug });

        if (!result) {
            return NextResponse.json({ message: "result not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Post deleted", success: true });
    } catch (error) {
        console.error("PUT post error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
