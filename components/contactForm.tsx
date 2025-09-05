'use client';

import { useState } from "react";
import ReCAPTCHAForm from "components/recaptcha";



export default function ContactForm() {
    const [formData, setFormdata] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

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
                body: JSON.stringify({ ...formData, token: recaptchaToken }),
            });

            if (res.ok) {
                setStatus("success");
                setFormdata({
                    name: "",
                    email: "",
                    message: "",
                });
                setRecaptchaToken(null);
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
                <ReCAPTCHAForm onVerify={setRecaptchaToken} />
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
        </>
    )
}