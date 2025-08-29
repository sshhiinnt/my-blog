import Link from "next/link";
import ReactMarkdown from "react-markdown";
import React from "react";
import Image from "next/image";

type Post = {
    _id: string;
    title: string;
    content: string;
    slug: string;
    thumbnailUrl: string;
    category: {
        name: string,
        slug: string,
        group: string,
    }
    createdAt: string;
    updatedAt: string;
    climbDate: string | null;
    area: string
};


type Props = {
    page?: number;
}

const currentPage = 1;


const NewArticle = async ({ page = 1 }: Props) => {

    let posts: Post[] = [];
    let totalPages = 0;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?page=${page}`);
        console.log("fetch:", res.ok);
        if (!res.ok) {
            console.error("Fetch failed:", res.statusText);
        } else {
            const data = await res.json();
            console.log(data);
            posts = data.posts || [];
            totalPages = Number(data.totalPages || 0);
        }
        console.log("page:", page, "totalPages:", totalPages);

    } catch (err) {
        console.error("Fetch error:", err);
    }



    if (page < 1 || (totalPages > 0 && page > totalPages)) {
        return (
            <p>記事が見つかりませんでした</p>
        )
    }
    return (
        <main className="bg-secondary max-w-4xl w-full">
            <h2 className="font-bold text-3xl text-center my-4">新着記事</h2>
            <ul className="flex flex-col items-center">
                {(posts ?? []).map((post) => (
                    <li key={post._id} className="flex bg-accentry rounded-3xl w-[750px] my-4">
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
                            <div className="flex-wrap gap-4">
                                <p className="text-sm text-gray-500 hover:opacity-70">カテゴリー:<Link href={`/categories/${post.category.slug}`}>{post.category.name}</Link></p>
                                <div className="flex">
                                    <p className="text-sm text-gray-500 mr-4">投稿日:{new Date(post.createdAt).toLocaleString()}</p>
                                    <p className="text-sm text-gray-500">更新日:{new Date(post.updatedAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <p className="font-bold">日付:{post.climbDate ? new Date(post.climbDate).toISOString().split("T")[0] : "未設定"}</p>
                            <h3 className="text-2xl font-bold hover:opacity-70"><Link href={`/posts/${post.slug}`}>{post.title}</Link></h3>
                            <div>
                                <ReactMarkdown>
                                    {post.content.slice(0, 50) + "......"}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </li>

                ))}
                <Link href={`/article/page/${currentPage}`} className="bg-accentry text-xl font-bold py-1 px-4 border rounded-3xl mb-4">記事一覧ページへ</Link>
            </ul>
        </main >
    )
}

export default NewArticle;