import { connect } from "@/lib/mongodb";
import Post from "models/post";
import { NextRequest, NextResponse } from "next/server";


type Props = {
    params: Promise<{
        slug: string;
    }>
};

export async function GET(req: NextRequest, { params }: Props) {
    const { slug } = await params;
    try {
        await connect();
        const post = await Post.findOne({ slug: slug }).lean();
        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }
        return NextResponse.json(post);
    } catch (error) {
        console.error("GET post Error:", error);
        return NextResponse.json({ message: "Internal server Error:", error }, { status: 500 });
    }
}
export async function PUT(req: NextRequest, { params }: Props) {
    const { slug } = await params
    try {
        await connect();
        const body = await req.json();

        let { category } = body;
        if (typeof category === "string") {
            try {
                category = JSON.parse(category)
            } catch (e) {
                console.error("GET put Error:", e);
                return NextResponse.json({ message: "Invalid category format" }, { status: 400 })
            }
        }

        const updatedPost = await Post.findOneAndUpdate(
            { slug: slug },
            {
                title: body.title,
                content: body.content,
                thumbnailUrl: body.thumbnailUrl,
                category: category,
                climbDate: body.climbDate || null,
                area: body.area || "",
                updatedAt: new Date(),
                description: body.description,
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


export async function DELETE(req: NextRequest, { params }: Props) {
    const { slug } = await params;
    try {
        await connect();
        console.log("Deleting post with slug:", slug);
        const result = await Post.findOneAndDelete({ slug: slug });

        if (!result) {
            return NextResponse.json({ message: "result not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Post deleted", success: true });
    } catch (error) {
        console.error("PUT post error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
