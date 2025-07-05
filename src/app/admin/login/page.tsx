'use client';

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        if (res?.error) {
            alert("ログインに失敗しました");
        } else {
            router.push("/admin/new");
        }
    };

    return (
        <div>
            <h1>ログイン</h1>
            <form onSubmit={handleLogin} className="">
                <input
                    type="text"
                    placeholder="ユーザー名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className=""
                    required
                />

                <input
                    type="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=""
                    required
                />

                <button
                    type="submit"
                    className=""
                >ログイン
                </button>
            </form>
        </div>
    )



}