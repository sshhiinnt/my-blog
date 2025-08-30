'use client';

import Link from "next/link";
import HeaderAreaDropDown from "./selectArea";
import HeaderArchiveDropDown from "./selectArchive";



const Header = () => {
    return (
        <>
            <header className="bg-brand text-white relative h-20 flex items-center justify-center md:justify-start">
                <h1 className="text-4xl font-Rockn md:ml-16">
                    <Link href="/">YAMAORI</Link>
                </h1>
            </header>
            <nav className="bg-secondary border-b-4 border-b-accentry flex justify-end space-x-4 md:pr-8 lg:pr-16 w-full">
                <Link href={`/categories/${encodeURIComponent("道具・装備")}`} className="hover:opacity-70"><span className="hidden md:block">▲登山用品・道具について</span><span className="block md:hidden">▲登山用品</span></Link>
                <HeaderArchiveDropDown />
                <HeaderAreaDropDown />
            </nav>
        </>
    )
};

export default Header;