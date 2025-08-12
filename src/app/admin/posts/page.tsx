'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

const POST_PER_PAGE = 16;

export default function AdminPostPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (status === "unauthenticated") {
            router.push("/admin/login");
        } else if (session?.user?.role !== "admin") {
            router.push("/unauthorized");
        }
    }, [status, session, router]);



    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function fetchPost() {
            const res = await fetch("/api/posts");
            if (!res.ok) {
                console.log("記事の取得に失敗しました");
                setLoading(false);
                return;
            }
            const data = await res.json();
            setPosts(data.posts);
            setLoading(false);
        }
        fetchPost()
    }, [])

    const handleDelete = async (slug: string) => {
        const confirmed = window.confirm("本当に削除しますか？");
        if (!confirmed) return;
        try {
            const res = await fetch(`/api/posts/${slug}`, {
                method: "DELETE",
            });
            const result = await res.json();
            if (result.success) {
                setPosts(posts.filter(post => post.slug !== slug));
            } else {
                alert("削除に失敗しました");
            }
        } catch (error) {
            console.error("削除エラー", error);
            alert("エラーが発生しました");
        }
    }

    if (status === "loading") {
        return <p>Loading......</p>;
    }

    const totalPage = Math.ceil(posts.length / POST_PER_PAGE);
    const currentPosts = posts.slice(
        (currentPage - 1) * POST_PER_PAGE,
        currentPage * POST_PER_PAGE,
    );

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPage));
    };

    return (
        <div className="flex flex-col justify-center bg-secondary">
            <h2 className="text-center font-bold mb-4">投稿記事一覧</h2>
            {posts.length === 0 ? (
                <p>記事がありません</p>
            ) : (
                <>
                    <ul>
                        {currentPosts.map((post => (
                            <li key={post._id} className="bg-accentry rounded-3xl m-4 p-4 max-w-4xl mx-auto">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <Link href={`/admin/posts/${post.slug}/edit`}>{post.title}</Link>
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(post.slug)}
                                        className="font-bold text-end text-white border border-black bg-red-700 rounded-3xl"
                                    >
                                        削除
                                    </button>
                                </div>
                            </li>
                        )))}
                    </ul>

                    <div className="flex justify-center items-center gap-4 mt-4">
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className="p-4 border rounded-3xl"
                        >
                            前へ
                        </button>
                        <span>
                            {currentPage}/{totalPage}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPage}
                            className="p-4 border rounded-3xl"
                        >
                            次へ
                        </button>

                    </div>
                </>

            )}
        </div>
    )

}
