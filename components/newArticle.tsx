import Link from "next/link";
import ReactMarkdown from "react-markdown";
import React from "react";

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
};


type Props = {
    page?: number;
    showPagination?: boolean;
}



const NewArticle = async ({ page = 1, showPagination = true }: Props) => {

    let posts: Post[] = [];
    let total = 0;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?page=${page}`, { cache: "no-store" });
        console.log("fetch:", res.ok);
        if (!res.ok) {
            console.error("Fetch failed:", res.statusText);
        } else {
            const data = await res.json();
            posts = data.posts || [];
            total = data.total || 0;
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }


    const totalPages = Math.ceil(total / 8);

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
                    <li key={post._id} className="flex bg-accentry rounded-3xl w-64 my-4">
                        <div>
                            {post.thumbnailUrl && (
                                <img src={post.thumbnailUrl}
                                    alt={post.title}
                                    className="w-36 h-24 object-cover rounded m-4"
                                />
                            )}
                        </div>
                        <div className="flex-wrap p-4">
                            <p className="text-sm text-gray-500">カテゴリー:<Link href={`/categories/${post.category.slug}`}>{post.category.name}</Link></p>
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

            {
                showPagination && (
                    <div className="flex justify-between mx-auto container">
                        {page > 1 ? (
                            <Link href={`/posts?page=${page - 1}`}>前へ</Link>
                        ) : <div />}

                        {page < totalPages ? (
                            <Link href={`/posts?page=${page + 1}`}>次へ</Link>
                        ) : <div />}

                    </div>

                )
            }

        </main >
    )
}

export default NewArticle;