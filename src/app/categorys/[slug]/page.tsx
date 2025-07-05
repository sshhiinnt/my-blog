import { connect } from "@/lib/mongodb";
import Category from "models/category";
import Post from "models/post";
import { notFound } from "next/navigation";


interface Props {
    params: { slug: string }
}

export default async function CategoryPage({ params }: Props) {
    await connect();

    const category = await Category.find({ slug: params.slug }).lean();
    if (!category) return notFound();

    const posts = await Post.find({ categorySlug: params.slug })
        .sort({ createdAt: -1 })
        .lean();

    return (
        <div>
            <h1>{category.name}</h1>
            <ul>
                {posts.length === 0 ? (
                    <li>記事がありません</li>
                ) : (
                    posts.map(post => (
                        <li key={post._id}>
                            <a href={`/posts/${post.slug}`}>
                                {post.title}
                            </a>
                        </li>
                    ))
                )}
            </ul>

        </div>
    );
}

export async function generateStaticParams() {
    await connect();
    const categories = await Category.find().lean();

    return categories.map(cat => ({
        slug: cat.slug,
    }));
}