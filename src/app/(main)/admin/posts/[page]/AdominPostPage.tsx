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
    updatedAt: string;
    climbDate: string | null;
    area: string
};

type Props = {
    page?: string,
};


export default function AdminPostPage({ page }: Props) {
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

    const currentPage = Number(page) || 1;
    const pageSize = 8;


    const [posts, setPosts] = useState<Post[]>([]);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            try {
                const res = await fetch(`/api/posts?page=${currentPage}&pageSize=${pageSize}`);
                if (!res.ok) throw new Error("記事取得失敗");
                const data = await res.json();
                setPosts(data.posts);
                setTotalPage(Math.ceil(data.total / pageSize));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [currentPage]);

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

    const goPage = (page: number) => router.push(`/admin/posts/${page.toString()}`);

    return (
        <div className="flex flex-col justify-center bg-secondary">
            <h2 className="text-center font-bold mb-4">投稿記事一覧</h2>
            {loading ? (
                <p>loading……</p>
            ) : posts.length === 0 ? (
                <p>記事がありません</p>
            ) : (
                <>
                    <ul>
                        {posts.map((post => (
                            <li key={post._id} className="bg-accentry rounded-3xl m-4 p-4 max-w-4xl mx-auto">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <Link href={`/admin/post-edit/${post.slug}/edit`}>{post.title}</Link>
                                        <div className="flex gap-4">
                                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                            <span>登った日:{(post.climbDate)?.split("T")[0]}</span>
                                            <span>カテゴリー：{post.category.name}</span>
                                        </div>
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
                            onClick={() => goPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-4 border rounded-3xl"
                        >
                            前へ
                        </button>
                        <span>{currentPage}/{totalPage}</span>
                        <button
                            onClick={() => goPage(currentPage + 1)}
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
