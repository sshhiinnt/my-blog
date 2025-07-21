import { connect } from "@/lib/mongodb";
import Post from "models/post";
import Category from "models/category";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryType } from "types/category";
import Aside from "components/aside";

interface Props {
    params: { groupName: string, categorySlug: string }
}


export default async function categorySlugPage({ params }: Props) {
    const groupName = decodeURIComponent(params.groupName);
    const categorySlug = decodeURIComponent(params.categorySlug);

    await connect();


    const category = await Category.findOne({ group: groupName, slug: categorySlug })
        .lean() as CategoryType | null;
    console.log("取得結果：", category);

    if (!category) {
        return notFound();
    }

    const posts = await Post.find({
        categorySlug: categorySlug,
    })
        .sort({ createdAt: -1 }).lean();

    return (
        <div className="flex bg-secondary">
            <main className="max-w-3xl w-full md:">
                <h1>{category.name}</h1>
                {posts.length === 0 ? (
                    <p>記事がありません</p>
                ) : (
                    <ul>
                        {posts.map((post) => (
                            <li key={String(post._id)}>
                                <Link href={`posts/${post.slug}`}>{post.title}</Link>
                                <span>{new Date(post.createdAt).toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
            <Aside />
        </div>
    )


}

export async function generateStaticParams() {
    await connect();

    const categories = await Category.find().lean();

    return categories.map((cat) => ({
        groupName: encodeURIComponent(cat.group),
        categorySlug: encodeURIComponent(cat.slug),
    }));
}