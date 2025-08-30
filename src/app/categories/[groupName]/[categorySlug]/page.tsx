import { connect } from "@/lib/mongodb";
import Post from "models/post";
import Category from "models/category";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryType } from "types/category";
import Aside from "components/aside";
import ReactMarkdown from "react-markdown";
import { WebPageSchema } from "components/structuredData";
import Image from "next/image";


interface PageProps {
    params: { groupName: string, categorySlug: string },
}


export default async function categorySlugPage({ params }: PageProps) {
    const { groupName, categorySlug } = params;

    await connect();



    const category = await Category.findOne({ group: groupName, slug: categorySlug })
        .lean() as CategoryType | null;
    console.log("取得結果：", category);

    if (!category) {
        return notFound();
    }

    const posts = await Post.find({
        "category.slug": categorySlug,
    })
        .sort({ createdAt: -1 }).lean();

    return (
        <>
            <WebPageSchema
                url={`https://yamaori.jp/categories/${groupName}/${categorySlug}`}
                name={`YAMAORIブログの${category.name}カテゴリ記事一覧`}
                description={`YAMAORIブログの${category.name}に属する記事一覧ページです`}
                lastReviewed="2025-08-27T11:00:00Z"
                authorName="都市慎太郎"
            />
            <div className="flex justify-center bg-secondary">
                <main className="max-w-4xl w-full">
                    <h1 className="text-center font-bold text-3xl my-4">{category.name}</h1>
                    {posts.length === 0 ? (
                        <p>このカテゴリーは現在、記事がありません。（近日投稿予定）</p>
                    ) : (
                        <ul>
                            {posts.map((post) => (
                                <li key={String(post._id)} className="flex bg-accentry rounded-3xl m-4 y-4">
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
                                    <div className="flex-wrap">
                                        <p className="text-sm text-gray-500">カテゴリー:{post.category.name}</p>
                                        <span className="text-sm text-gray-500">投稿:{new Date(post.createdAt).toLocaleString()}</span>
                                        <h3 className="text-lg font-bold"><Link href={`/posts/${post.slug}`}>{post.title}</Link></h3>
                                        <div>
                                            <ReactMarkdown>
                                                {post.content.slice(0, 50) + "......"}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </main>
                <Aside />
            </div>
        </>
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