import { connect } from "@/lib/mongodb";
import Aside from "components/aside";
import Category from "models/category";
import Post from "models/post";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
    params: { groupName: string }
}


export default async function CategoryPage({ params }: Props) {
    const groupName = decodeURIComponent(params.groupName);

    await connect();


    const categories = await Category.find({ group: groupName }).lean();
    if (categories.length === 0) {
        return notFound();
    }

    const groupedPosts: { [key: string]: any[] } = {};

    for (const category of categories) {
        const posts = await Post.find({ categorySlug: category.slug })
            .sort({ createAt: -1 })
            .lean();
        groupedPosts[category.name] = posts;
    }

    return (
        <div className="flex justify-center bg-secondary">
            <main className="max-w-4xl w-full my-4">
                <h1 className="bg-accentry font-bold rounded-3xl">{groupName}</h1>
                {categories.map(category => (
                    <div key={String(category._id)}>
                        <h2>{category.name}</h2>
                        <ul>
                            {groupedPosts[category.name].length === 0 ? (
                                <li>記事がありません。</li>
                            ) : (
                                groupedPosts[category.name].map(post => (
                                    <li key={post._id} className="bg-accentry rounded-3xl">
                                        <Link href={`/posts/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                ))}
            </main>
            <Aside />
        </div>
    );
}

export async function generateStaticParams() {
    await connect();
    const categories = await Category.find().lean();
    const uniqueGroups = Array.from(new Set(categories.map(cat => cat.group)));

    return uniqueGroups.map(groupName => ({
        groupName: encodeURIComponent(groupName),
    }));


}


