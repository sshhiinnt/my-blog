'use client';

import React from "react";
import Link from "next/link";
import SnsLinkForFooter from "./snsLinkForFooter";

const Footer = () => {
    return (
        <footer className="bg-bg text-white w-full">
            <div className="flex flex-col md:grid grid-cols-3 gap-16 mx-16 md:justify-items-center">
                <div className="">
                    <img src="/images/logo.svg" alt="YAMAORIロゴ" className="pt-8 h-32 w-auto" />
                </div>
                <nav className="justify-items-end">
                    <SnsLinkForFooter />
                </nav>
                <nav className="flex flex-col font-bold hover:opacity-70">
                    <Link href={"/contact"} className="py-4">-お問い合わせはこちら</Link>
                    <Link href={"/profile"} className="py-4">-管理者とこのサイトのこと</Link>
                    <Link href={"/site-policy"} className="py-4">-サイトポリシー・免責事項</Link>
                </nav>
            </div>
            <p className="text-center py-4">©　2025　YAMAORI　山で遊ばせてもらっております</p>
        </footer>

    )
}

export default Footer;