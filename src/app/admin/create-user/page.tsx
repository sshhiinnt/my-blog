'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateUserPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [authorized, setAuthorized] = useState(false);


    useEffect(() => {
        if (status === "loading") return;

        if (!session || session.user?.name !== "admin") {
            router.push("/login");
        } else {
            setAuthorized(true);
        }
    }, [session, status]);

    if (!authorized) {
        return <p>アクセスを確認中です……</p>
    }

    return (
        <div>
            <h1>ユーザー登録</h1>
            <form onSubmit={async (e) => {
                e.preventDefault();
                const username = e.currentTarget.username.value;
                const password = e.currentTarget.password.value;

                const res = await fetch("/api/register", {
                    method: "POST",
                    headers: { "content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });

                const data = await res.json();

                if (!res.ok) {
                    alert(data.error || "エラーが発生しました");
                } else {
                    alert("ユーザー登録に成功しました");
                }

            }} className="">
                <input
                    type="text"
                    placeholder="ユーザー名"
                    className=""
                />
                <input
                    type="password"
                    placeholder="パスワード"
                    className=""
                />
                <button
                    type="submit"
                    className=""
                >登録
                </button>
            </form>
        </div>
    );



}