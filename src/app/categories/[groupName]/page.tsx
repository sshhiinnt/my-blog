import { connect } from "@/lib/mongodb";
import Aside from "components/aside";
import Category from "models/category";
import Post from "models/post";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { WebPageSchema } from "components/structuredData";
import Image from "next/image";

interface Post {
    _id: string,
    title: string,
    content: string,
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    description?: string;
    area?: string;
    climbDate?: Date;
    images?: Array<{
        url: string;
        width: number;
        height: number;
    }>,
    thumbnailUrl: string;
    category: {
        group: string;
        name: string;
        slug: string;
    },
    moshimoProducts?: string[];
}


interface Props {
    params: Promise<{ groupName: string }>,
}


export default async function CategoryPage({ params }: Props) {
    const { groupName: groupNameStr } = await params;

    const groupName = decodeURIComponent(groupNameStr);

    await connect();


    const categories = await Category.find({ group: groupName }).lean();
    if (categories.length === 0) {
        return notFound();
    }

    const groupedPosts: Record<string, Post[]> = {};

    for (const category of categories) {
        const posts = await Post.find({ "category.slug": category.slug })
            .sort({ createdAt: -1 })
            .lean() as unknown as Post[];
        groupedPosts[category.name] = posts;
    }

    return (
        <>
            <WebPageSchema
                url={`https://yamaori.jp/categories/${groupNameStr}`}
                name={`YAMAORIブログの${groupName}カテゴリ記事一覧`}
                description={`YAMAORIブログの${groupName}に属する記事一覧ページです`}
                lastReviewed="2025-08-27T11:00:00Z"
                authorName="都市慎太郎"
            />
            <div className="flex justify-center bg-secondary">
                <main className="max-w-4xl w-full my-4">
                    <h1 className="text-center text-3xl font-bold rounded-3xl">{groupName}</h1>
                    {categories.map(category => (
                        <div key={String(category._id)}>
                            <ul>
                                {groupedPosts[category.name].length === 0 ? (
                                    <li>「{category.name}」カテゴリーに記事はまだありません（近日投稿予定）</li>
                                ) : (
                                    groupedPosts[category.name].map(post => (
                                        <li key={post._id} className="flex bg-accentry rounded-3xl my-4">
                                            <div>
                                                {post.thumbnailUrl && (
                                                    <Image
                                                        src={post.thumbnailUrl}
                                                        alt={post.title}
                                                        width={144}
                                                        height={96}
                                                        className="object-cover rounded m-4"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-wrap p-4">
                                                <p className="text-sm text-gray-500">カテゴリー:<Link href={`/categories/${post.category.name}`}>{post.category.name}</Link></p>
                                                <span className="text-sm text-gray-500">投稿:{new Date(post.createdAt).toLocaleString()}</span>
                                                <h3 className="text-lg font-bold"><Link href={`/posts/${post.slug}`}>{post.title}</Link></h3>
                                                <div>
                                                    <ReactMarkdown>
                                                        {post.content.slice(0, 50) + "......"}
                                                    </ReactMarkdown>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    ))}
                </main>
                <Aside />
            </div>
        </>
    )
}

export async function generateStaticParams() {
    await connect();
    const categories = await Category.find().lean();
    const uniqueGroups = Array.from(new Set(categories.map(cat => cat.group)));

    return uniqueGroups.map(groupName => ({
        groupName: groupName,
    }));


}


