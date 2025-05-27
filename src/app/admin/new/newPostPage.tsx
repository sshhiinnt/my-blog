'use client';

import { set } from "mongoose";
import { useState } from "react";



export default function NewPostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState<File[]>([]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        images.forEach((img) => {
            formData.append("images", img);
        });

        const res = await fetch("/api/posts/new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        });

        if (res.ok) {
            alert("投稿が作成されました");
            setTitle("");
            setContent("");
            setContent(null);
        } else {
            alert("エラーが発生しました");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-4">
            <h1 className="">新規投稿</h1>
            <form onSubmit={handleSubmit} encType="mulipart/form-data">
                <input
                    type="text"
                    placeholder="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className=""
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    value={title}
                    onChange={(e) => {
                        if (e.target.files) {
                            const fileArray = Array.from(e.target.files);
                            setImages(fileArray);
                        }
                    }}
                    className=""
                />
                <textarea
                    placeholder="本文(markdown)"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className=""
                    required
                />
            </form>

            <button
                type="submit"
                className=""
            >投稿
            </button>

        </div>

    )
}