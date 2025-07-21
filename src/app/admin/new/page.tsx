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


export default function NewPostPage() {
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





    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [previewMode, setPreviewMode] = useState(false);
    const [uploading, setUploading] = useState(false);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
                console.log("fetch from:", `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
                const data = await res.json();
                console.log("fetched data:", data);
                setCategories(Array.isArray(data) ? data : []);

            }
            catch (error) {
                console.error("Failed fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    if (status === "loading") {
        return <p>Loading......</p>;
    }


    const handleImageUpload = async () => {
        setUploading(true);
        const uploadedUrls: string[] = [];

        for (const file of images) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/s3upload?filename=${encodeURIComponent(file.name)}&filetypes=${encodeURIComponent(file.type)}`, {
                    credentials: "include",
                });
                if (!res.ok) {
                    console.error("署名付きUrl取得失敗");
                    continue;
                }

                const { url } = await res.json();

                const uploadRes = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": file.type,
                    },
                    body: file,
                });

                if (uploadRes.ok) {
                    const publicUrl = `https://${process.env.NEXT_PUBLIC_BASE_URL_AWS_BUCKET_NAME}.s3.amazonaws.com/${encodeURIComponent(file.name)}`;
                    uploadedUrls.push(publicUrl);
                } else {
                    console.error("アップロード失敗", file.name);
                }

            } catch (error) {
                console.error("アップロードエラー:", error);
            }
        }
        if (uploadedUrls.length) {
            const markdown = uploadedUrls.map(url => `[画像](${url})`).join("\n\n");
            setContent(prev => prev + "\n\n" + markdown);
        }

        setUploading(false);
        setImages([]);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const parsedCategory = JSON.parse(category);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("category", parsedCategory.name);
        formData.append("categorySlug", parsedCategory.slug);
        formData.append("group", parsedCategory.group);
        images.forEach((img) => {
            formData.append("images", img);
        });

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
            method: "POST",
            body: formData,
        });
        console.log("fetch from:", `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`)

        if (res.ok) {
            alert("投稿が作成されました");
            setTitle("");
            setContent("");
            setCategory("");
            setImages([]);
        } else {
            alert("エラーが発生しました");
        }
    };



    return (
        <div className="flex flex-col mx-auto container items-center">
            <p className="font-bold py-1">新規投稿</p>
            <form onSubmit={handleSubmit}>

                <div className="py-1">
                    <p>タイトル</p>
                    <input
                        type="text"
                        placeholder="タイトル"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-60 border-solid"
                    />
                </div>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                            if (e.target.files) {
                                setImages(Array.from(e.target.files));
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={handleImageUpload}
                        disabled={uploading || images.length === 0}
                        className="border-solid"
                    >
                        {uploading ? "uploading......" : "画像を挿入"}
                    </button>

                </div>

                <textarea
                    placeholder="本文(MarkDown)"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
                    required
                    className="w-full container p-4 "
                />
                <button
                    type="button"
                    onClick={() => setPreviewMode(!previewMode)}
                    className="border-solid"
                >
                    {previewMode ? "編集に戻る" : "MarkDownプレビューを見る"}
                </button>

                {previewMode && (
                    <article className="prose lg:prose-xl dark:prose-invert mx-auto p-4 border">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </article>
                )}

                <button
                    type="submit">投稿
                </button>
            </form>
        </div >
    );
}

