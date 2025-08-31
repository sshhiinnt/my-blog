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
};


export default function ArticleList({ posts, currentPage, totalPage }: Props) {
    const router = useRouter();

    return (
        <main className="bg-secondary max-w-4xl w-full">
            <h2 className="font-bold text-3xl text-center my-4">記事一覧</h2>
            <ul className="flex flex-col items-center">
                {(posts ?? []).map((post) => (
                    <li key={post._id} className="flex bg-accentry rounded-3xl max-w-[750px] md:w-[750px] mx-4 my-4">
                        <div>
                            {post.thumbnailUrl && (
                                <div className="w-[144px] h-[96px] m-4 relative">
                                    <Image src={post.thumbnailUrl}
                                        alt={post.title}
                                        fill
                                        className="object-cover rounded"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex-wrap p-4">
                            <div className="flex-wrap gap-4">
                                <p className="text-sm text-gray-500 hover:opacity-70"><Link href={`/categories/${post.category.slug}`}>{post.category.name}</Link></p>
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
            </ul>
            <div className="flex justify-center gap-4 mb-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => router.push(`/article/page/${currentPage - 1}`)}
                    className="bg-accentry text-xl font-bold py-1 px-4 border rounded-3xl"
                >前へ</button>
                <span>{currentPage}/{totalPage}ページ</span>
                <button
                    disabled={currentPage === totalPage}
                    onClick={() => router.push(`/article/page/${currentPage + 1}`)}
                    className="bg-accentry text-xl font-bold py-1 px-4 border rounded-3xl"
                >次へ</button>
            </div>

        </main >
    )
}
