'use client';


import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Category = {
    _id: string;
    name: string;
    slug: string;
    group: string;
};

type Post = {
    title: string;
    content: string;
    thumnailUrl: string;
    category: string;
}

const EditPostPage = ({ params }: { params: { slug: string } }) => {
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

    const [formData, setFormData] = useState<Post>({
        title: "",
        content: "",
        thumnailUrl: "",
        category: "",
    });

    const [categories, setCategories] = useState<Category[]>([]);
    const [isSubmitting, setIsSubmiting] = useState(false);

    useEffect(() => {
        fetch(`/api/posts/${params.slug}`)
            .then(res => res.json())
            .then(data => {
                setFormData({
                    title: data.title,
                    content: data.content,
                    thumnailUrl: data.thumnailUrl || "",
                    category: data.category._id,
                });
            })
            .catch(err => console.error("記事の取得失敗:", err))
    }, [params.slug]);


    useEffect(() => {
        fetch(`/api/categories`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("カテゴリーの取得失敗:", err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmiting(true);

        try {
            const res = await fetch(`/api/posts/${params.slug}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push(`/posts/${params.slug}`);
            } else {
                console.error("記事更新失敗:", await res.text());
            }
        } catch (err) {
            console.error("送信失敗:", err);
        } finally {
            setIsSubmiting(false);
        }
    };

    if (status === "loading") {
        return <p>loading......</p>
    }


    return (
        <div className="flex flex-col mx-auto container items-center">
            <h2 className="font-bold py-1">記事を編集</h2>
            <form onSubmit={handleSubmit}>

                <div className="py-1">
                    <p>タイトル</p>
                    <input
                        type="text"
                        placeholder="タイトル"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-60 border-solid"
                    />
                </div>

                <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="border-solid"
                >
                    <option value="">カテゴリーを選択</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={JSON.stringify({
                            name: cat.name,
                            slug: cat.slug,
                            group: cat.group,
                        })}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <div>
                    <input
                        type="text"
                        name="thumnailUrl"
                        placeholder="サムネイル画像"
                        value={formData.thumnailUrl || ""}
                        onChange={(e) => setFormData({ ...formData, thumnailUrl: e.target.value })}
                        className=""
                    />
                </div>

                <textarea
                    placeholder="本文(MarkDown)"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    className="w-full container p-4 "
                />

                <p>プレビュー</p>
                <article className="prose lg:prose-xl dark:prose-invert mx-auto p-4 border">
                    <ReactMarkdown>{formData.content}</ReactMarkdown>
                </article>


                <button
                    type="submit"
                    disabled={isSubmitting}
                    className=""
                >
                    {isSubmitting ? "更新中……" : "記事を更新"}
                </button>
            </form>
        </div >
    );
};

export default EditPostPage;
