'use client';

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type Category = {
    _id: string;
    name: string;
    slug: string;
    group: string;
};


export default function newPostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [previewMode, setPreviewMode] = useState(false);

    useEffect(() => {
        const fecthCategories = async () => {
            const res = await fetch("../api/categories");
            const date = await res.json();
            setCategories(date.categories || []);
        };
        fecthCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("titel", title);
        formData.append("content", content);
        formData.append("category", category);
        images.forEach((img) => {
            formData.append("images", img);
        });

        const res = await fetch("../../api/posts/new", {
            method: "POST",
            body: formData,
        });

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
        <div>
            <h1>新規投稿</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required

                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="">カテゴリーを選択</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <input
                    type="file"
                    accept="images/*"
                    multiple
                    onChange={(e) => {
                        if (e.target.files) {
                            setImages(Array.from(e.target.files));
                        }
                    }}
                />
                <textarea
                    placeholder="本文(MarkDown)"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
                    required
                />
                <button
                    type="button"
                    onClick={() => setPreviewMode(!previewMode)}>
                    {previewMode ? "編集に戻る" : "MarkDownプレビューを見る"}
                </button>

                {previewMode&&(
                    <div>
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                )}

                <button
                type="submit">投稿
                </button>
            </form>
        </div>
    );
}

