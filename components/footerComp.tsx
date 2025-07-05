'use client';

import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-brand text-white">
            <div className=" flex justify-between mx-auto container">
                <div className="self-center">
                    <div className="font-bold text-3xl text-center">YAMAORI</div>
                    <div className="font-Rockn font-bold">山で遊んでおります</div>
                </div>
                <nav>
                    <ul className="list-none py-4">
                        <p className="font-bold">カテゴリー</p>
                        <li><Link href="/slug">登山記録</Link></li>
                        <li><Link href="/slug">トレイルランニング</Link></li>
                        <li><Link href="/slug">クライミング</Link></li>
                        <li><Link href="/slug">道具・装備</Link></li>
                        <li><Link href="/slug">つぶやき</Link></li>
                    </ul>
                </nav>
                <nav className="flex flex-col font-bold py-4">
                    <Link href={"/contact"}>-お問い合わせはこちら</Link>
                    <Link href={"/profile"}>-筆者について</Link>
                    <Link href={"/contact"}>-サイト運営について</Link>
                </nav>
            </div>
            <p className="text-center py-4">©　2025　山で遊んでおります　YAMAORI</p>
        </footer>

    )
}

export default Footer;