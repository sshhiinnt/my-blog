import Link from "next/link";
import ReactMarkdown from "react-markdown";
import React from "react";
import { error } from "console";

type Post = {
    _id: string;
    title: string;
    content: string;
    category: {
        name: string,
        slug: string,
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
    } catch {
        console.error("Fetch error:", error);
    }


    const totalPages = Math.ceil(total / 8);

    if (page < 1 || (totalPages > 0 && page > totalPages)) {
        return (
            <p>記事が見つかりませんでした</p>
        )
    }

    return (
        <main className="bg-secondary flex-1">
            <h2 className="font-bold text-3xl text-center mt-4">New Blog</h2>
            <ul className="justify-center">
                {(posts ?? []).map((post) => (
                    <li key={post._id} className="bg-accentry flex-wrap">
                        <Link href={`/category/${post.category.slug}`} className="text-lg">{post.category.name}</Link>
                        <span className="text-lg">{new Date(post.createdAt).toLocaleString()}</span>
                        <h3 className="w-full">{post.title}</h3>
                        <div>
                            <ReactMarkdown>
                                {post.content.slice(0, 300) + "......"}
                            </ReactMarkdown>
                        </div>
                    </li>

                ))}

            </ul>

            {showPagination && (
                <div className="flex justify-between mx-auto container">
                    {page > 1 ? (
                        <Link href={`/posts?page=${page - 1}`}>前へ</Link>
                    ) : <div />}

                    {page < totalPages ? (
                        <Link href={`/posts?page=${page + 1}`}>次へ</Link>
                    ) : <div />}

                </div>

            )}

        </main >
    )
}

export default NewArticle;