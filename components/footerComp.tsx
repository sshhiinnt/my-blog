'use client';

import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer>
            <nav className="profiel">
                <Link href={"/profile"}>-筆者について</Link>
                <Link href={"/contact"}>-お問い合わせはこちら</Link>
                <Link href={"/contact"}>プライバシーポリシー</Link>
            </nav>


            <p>-山で遊んでおります-</p>
        </footer>

    )
}

export default Footer;