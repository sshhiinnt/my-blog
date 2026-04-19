'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
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
    posts: Post[],
    currentPage: number,
    totalPage: number,
    basePath: string,
};


export default function ArticleList({ posts, currentPage, totalPage, basePath }: Props) {
    const router = useRouter();

    const GoToPage = (page: number) => {
        if (page < 1 || page > totalPage) return;
        router.push(`${basePath}/page/${page}`);
    }

    return (
        <main className="bg-surface max-w-4xl w-full">
            <ul className="flex flex-col items-center m-4">
                {(posts ?? []).map((post) => (
                    <li key={post._id} className="flex flex-col md:flex-row bg-white md:max-w-[750px] w-full mx-auto px-4 mb-16 rounded-md">
                        <div>
                            {post.thumbnailUrl && (
                                <div className="w-full md:w-[360px] aspect-video mx-auto mt-4 md:m-4 relative">
                                    <Link href={`/posts/${post.slug}`}>
                                        <Image src={post.thumbnailUrl}
                                            alt={post.title}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 p-4">
                            <div>
                                <p className="text-sm text-gray-500 hover:opacity-70"><Link href={`/categories/${post.category.group}/${post.category.slug}`}>{post.category.name}</Link></p>
                            </div>
                            <p className="font-bold">{post.climbDate ? new Date(post.climbDate).toISOString().split("T")[0] : "未設定"}</p>
                            <h3 className="font-bold hover:opacity-70"><Link href={`/posts/${post.slug}`}>{post.title}</Link></h3>
                            <div>
                                <ReactMarkdown>
                                    {post.content.slice(0, 50) + "......"}
                                </ReactMarkdown>
                            </div>
                            <div className="flex">
                                <p className="text-sm text-gray-500 mr-4">投稿日:{post.createdAt.split("T")[0]}</p>
                                <p className="text-sm text-gray-500">更新日:{post.updatedAt.split("T")[0]}</p>
                            </div>
                        </div>
                    </li>

                ))}
            </ul>
            <div className="flex justify-center gap-16">
                <button
                    disabled={currentPage === 1}
                    onClick={() => GoToPage(currentPage - 1)}
                    className="bg-accent text-xl font-bold py-1 px-4 border rounded-3xl"
                >前へ</button>
                <span className="text-text">{currentPage}/{totalPage}ページ</span>
                <button
                    disabled={currentPage === totalPage}
                    onClick={() => GoToPage(currentPage + 1)}
                    className="bg-accent text-xl font-bold py-1 px-4 border rounded-3xl"
                >次へ</button>
            </div>

        </main >
    )
}
