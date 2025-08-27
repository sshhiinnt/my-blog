'use client';

import Aside from "components/aside";
import { useState } from "react";
import { ContactPageSchema } from "components/structuredData";


export const metadata = {
    title: "お問い合わせ",
    description: "YAMAORI管理人へのお問い合わせページです。記事のご不明点やご依頼がある場合はこちらのページを利用してください",
};


export default function Contact() {
    const [formData, setFormdata] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setFormdata({
                    name: "",
                    email: "",
                    message: "",
                });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };


    return (
        <>
            <ContactPageSchema
                url="https://yamaori.jp/contact"
                name="YAMAORI管理人"
                description="YAMAORI管理人へのお問い合わせページです。記事のご不明点やご依頼がある場合はこちらのページを利用してください"
                lastReviewed="2025-08-26T15:00:00.000Z"
                authorName="都市慎太郎"
                contactEmail="rftfaq@gmail.com"
            />
            <div className="flex justify-center bg-secondary p-4">
                <main className="max-w-4xl w-full bg-accentry rounded-3xl p-1">
                    <h1 className="font-bold">お問い合わせ</h1>
                    <form onSubmit={handleSubmit} className="">
                        <h2 className=""> 氏名 </h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="お名前"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="" />
                        <h2 className="" > メールアドレス </h2>
                        <input
                            type="email"
                            name="email"
                            placeholder="メールアドレス"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="" />
                        <h2 className="" > お問い合わせ内容 </h2>
                        <textarea
                            name="message"
                            placeholder="お問い合わせ内容"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="p-1 w-full h-40 md:h-60 lg:h-80"
                        />
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="bg-secondary rounded-3xl font-bold text-xl px-2 border border-black"
                        >
                            {status === "loading" ? "送信中……" : "送信"}
                        </button>
                        {status === 'success' && <p className="font-bold">送信が完了しました！</p>}
                        {status === 'error' && <p className="font-bold">送信中にエラーが発生しました。</p>}
                    </form>

                    <p> 返信にお日にちをいただく場合がございますが、</p>
                    <p> 何卒、ご容赦くださいませ。</p>
                </main>
                <Aside />
            </div>
        </>
    )
}