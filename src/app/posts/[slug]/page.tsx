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
        <div className="flex justify-center bg-secondary">
            <div className="max-w-4xl w-full bg-white">
                <div className="text-right text-gray-500">
                    <p>
                        投稿日：{new Date(post.createdAt).toLocaleString()}{""}
                    </p>
                    <p>
                        {category && `カテゴリー：${category.name}`}
                    </p>
                </div>
                <h1 className="text-3xl font-bold text-center">{post.title}</h1>
                <article className="prose prose-lg dark:prose-invert mx-auto p-4">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </article>
            </div>
            <Aside />
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