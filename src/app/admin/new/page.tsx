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

type UploadedImage = {
    url: string;
    width: number;
    height: number;
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
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [previewMode, setPreviewMode] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
    const [area, setArea] = useState("");
    const [climbDate, setClimbDate] = useState<Date | null>(null);


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
        console.log("handleImageUpload called");
        setUploading(true);

        if (images.length === 0) {
            setUploading(false);
            return;
        }

        const newUploadedImages: UploadedImage[] = []

        const uploadPromisees = images.map(file => {
            return new Promise<string | undefined>(async (resolve, reject) => {
                try {
                    const res = await fetch(
                        `/api/s3upload?filename=${encodeURIComponent(file.name)}&filetype=${encodeURIComponent(file.type)}`,
                        { credentials: "include" },
                    );
                    if (!res.ok) {
                        const errorText = await res.text();
                        throw new Error(`署名付きURL取得失敗:${res.status}-${errorText}`);
                    }

                    console.log("Uploading file:", file.name, "type:", file.type);


                    const { url, fields } = await res.json();

                    const formData = new FormData();
                    Object.keys(fields).forEach(key => {
                        formData.append(key, fields[key]);
                    });
                    formData.append("file", file);

                    const uploadRes = await fetch(url, {
                        method: "POST",
                        body: formData,
                    });

                    console.log("FormData entries:");
                    console.log([...formData.entries()]);

                    if (uploadRes.ok) {
                        const publicUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${encodeURIComponent(file.name)}`

                        const imgDimentions = await new Promise<{ width: number, height: number }>((resImg, rejImg) => {
                            const img = new Image();
                            img.src = publicUrl;
                            img.onload = () => resImg({ width: img.width, height: img.height });
                            img.onerror = () => rejImg(new Error("画像読み込み失敗"));
                        });

                        newUploadedImages.push({
                            url: publicUrl,
                            width: imgDimentions.width,
                            height: imgDimentions.height,
                        });

                        resolve(publicUrl);

                    } else {
                        const errorText = await uploadRes.text();
                        throw new Error(`アップロード失敗:${file.name},ステータス${uploadRes.status},レスポンス${errorText}`);
                    }
                } catch (error) {
                    console.error("アップロードエラー:", error);
                    reject(error);
                }
            });
        });
        try {
            await Promise.all(uploadPromisees);
        } catch (error) {
            console.error("一部または全てのファイルのアップロードに失敗しました:", error);
        }

        if (newUploadedImages.length) {

            setUploadedImages(prev => [...prev, ...newUploadedImages]);
            const markdown = newUploadedImages
                .map(img => `![画像](${img.url})<!-- ${img.width}*${img.height} -->`)
                .join("\n\n");
            setContent(prev => prev + "\n\n" + markdown);

            setThumbnailUrl(newUploadedImages[0].url);

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
        formData.append("category", JSON.stringify(parsedCategory));
        formData.append("slug", parsedCategory.slug);
        formData.append("description", description);
        formData.append("images", JSON.stringify(uploadedImages));
        formData.append("climbDate", climbDate ? climbDate.toISOString().split("T")[0] : "");
        formData.append("area", area ?? "");
        if (thumbnailUrl) {
            formData.append("thumbnailUrl", thumbnailUrl);
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, {
            method: "POST",
            body: formData,
        });
        console.log("fetch from:", `${process.env.NEXT_PUBLIC_BASE_URL}/api/post`)

        console.log(uploadedImages)

        if (res.ok) {
            alert("投稿が作成されました");
            setTitle("");
            setDescription("")
            setContent("");
            setCategory("");
            setImages([]);
            setThumbnailUrl(null);
            setUploadedImages([]);
            setArea("");
            setClimbDate(null);
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
                    <p>記事の概要（必須）</p>
                    <input type="text"
                        placeholder="記事の概要"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-96 border-solid" />
                    <p>エリア</p>
                    <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
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
                        value={climbDate ? climbDate.toISOString().split("T")[0] : ""}
                        onChange={(e) => setClimbDate(e.target.value ? new Date(e.target.value) : null)}
                        className="w-96 border-solid" />
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
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
                    </article>
                )}

                <button
                    type="submit">投稿
                </button>
            </form>
        </div >
    );
};
