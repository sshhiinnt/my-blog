'use client';

import React from "react";
import Link from "next/link";
import SnsLinkForFooter from "./snsLinkForFooter";

const Footer = () => {
    return (
        <footer className="bg-brand text-white">
            <div className=" flex px-4 justify-between md:mx-auto container">
                <div className="self-center hidden md:block">
                    <div className="font-bold text-3xl text-center font-Rockn">YAMAORI</div>
                    <div className="font-Rockn font-bold">山で遊ばせてもらっております</div>
                </div>
                <nav>
                    <ul className="list-none py-4 hidden md:block">
                        <p className="font-bold">カテゴリー</p>
                        <li><Link href={`/categories/${encodeURIComponent("登山記録")}`}>-登山記録</Link></li>
                        <li><Link href={`/categories/${encodeURIComponent("トレイルランニング")}`}>-トレイルランニング</Link></li>
                        <li><Link href={`/categories/${encodeURIComponent("クライミング")}`}>-クライミング</Link></li>
                        <li><Link href={`/categories/${encodeURIComponent("道具・装備")}`}>-道具・装備</Link></li>
                        <li><Link href={`/categories/${encodeURIComponent("ひとりごと")}`}>-ひとりごと</Link></li>
                    </ul>
                </nav>
                <nav className="flex flex-col font-bold py-4 ">
                    <Link href={"/contact"}>-お問い合わせはこちら</Link>
                    <Link href={"/profile"}>-管理者とこのサイトのこと</Link>
                    <Link href={"/site-policy"}>-サイトポリシー・免責事項</Link>
                    <SnsLinkForFooter />
                </nav>
            </div>
            <p className="text-center py-4">©　2025　YAMAORI　山で遊ばせてもらっております</p>
        </footer>

    )
}

export default Footer;