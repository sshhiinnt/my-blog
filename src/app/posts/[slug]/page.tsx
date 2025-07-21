import { connect } from "@/lib/mongodb";
import Post, { IPost } from "models/post";
import Category from "models/category";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown"
import Aside from "components/aside";

interface Props {
    params: { slug: string }
}

export default async function postPage({ params }: Props) {
    const slug = decodeURIComponent(params.slug);

    await connect();

    const post = await Post.findOne({ slug }).lean<IPost | null>();

    if (!post) {
        return notFound();
    }

    const category = await Category.findOne({ slug: post.category.slug })

    return (
        <div className="flex bg-secondary">
            <div className="max-w-3xl w-full">
                <h1>{post.title}</h1>
                <p>
                    投稿日：{new Date(post.createdAt).toLocaleString()}{""}
                    {category && `カテゴリー：${category.name}`}
                </p>
                <article>
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </article>
                <Aside />
            </div>

        </div>
    )
}

export async function generateStaticParams() {
    await connect();
    const posts = await Post.find().lean();
    return posts.map((post) => ({
        slug: encodeURIComponent(post.slug)
    }));
}