'use client';


import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import rehypeRaw from "rehype-raw";

type Category = {
    _id: string;
    name: string;
    slug: string;
    group: string;
};

type Post = {
    title: string;
    description: string;
    content: string;
    thumbnail: string;
    category: string;
    climbDate: string | null;
    area: string;
};

type Props = {
    slug: string;
};

export default function EditPostPage ({ slug }: Props) {
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
        description: "",
        thumbnail: "",
        category: "",
        climbDate: null,
        area: "",
    });

    const [categories, setCategories] = useState<Category[]>([]);
    const [isSubmitting, setIsSubmiting] = useState(false);

    useEffect(() => {
        fetch(`/api/posts/${slug}`)
            .then(res => res.json())
            .then(data => {
                setFormData({
                    title: data.title,
                    description: data.description,
                    content: data.content,
                    thumbnail: data.thumbnail || "",
                    category: data.category._id,
                    climbDate: data.climbDate || "",
                    area: data.area || "",
                });
            })
            .catch(err => console.error("記事の取得失敗:", err))
    }, [slug]);


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
            const res = await fetch(`/api/posts/${slug}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push(`/posts/${slug}`);
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
                    <p>記事の概要（必須）</p>
                    <input type="text"
                        placeholder="記事の概要"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        className="w-96 border-solid" />
                    <p>エリア</p>
                    <select
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-96 border-solid">
                        <option value="">エリアを選択</option>
                        <option value="九州">九州</option>
                        <option value="四国">四国</option>
                        <option value="中国地方">中国地方</option>
                        <option value="近畿地方">近畿地方</option>
                        <option value="中部地方">中部地方</option>
                        <option value="北アルプス">北アルプス</option>
                        <option value="中央アルプス">中央アルプス</option>
                        <option value="南アルプス">南アルプス</option>
                        <option value="関東">関東</option>
                        <option value="東北">東北</option>
                        <option value="北海道">北海道</option>
                        <option value="未指定">未指定</option>

                    </select>
                    <p>日付（登った日）</p>
                    <input type="date"
                        value={formData.climbDate || ""}
                        onChange={(e) => setFormData({ ...formData, climbDate: e.target.value })}
                        className="w-96 border-solid" />
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
                        name="thumbnail"
                        placeholder="サムネイル画像"
                        value={formData.thumbnail || ""}
                        onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
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
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{formData.content}</ReactMarkdown>
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

