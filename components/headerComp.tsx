'use client';

import Link from "next/link";

const Header = () => {
    return (
        <>
            <header className="bg-brand text-white">
                <h1 className="py-4 mx-auto container items-center">
                    <Link className="text-4xl font-Rockn" href="/">山で遊んでおります</Link>
                </h1>
            </header>
            <nav className="bg-secondary border-b-4 border-b-accentry flex justify-end space-x-4  pr-4 md:pr-8 lg:pr-16 w-full">
                <Link href="/slug">▲登山記録</Link>
                <Link href="/slug">▲トレイルランニング</Link>
                <Link href="/slug">▲クライミング</Link>
                <Link href="/slug">▲道具・装備</Link>
                <Link href="/slug">▲つぶやき</Link>
            </nav>
        </>
    )
};

export default Header;