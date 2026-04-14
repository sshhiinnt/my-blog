'use client';

import Link from "next/link";
import HeaderAreaDropDown from "./selectArea";
import HeaderArchiveDropDown from "./selectArchive";



const Header = () => {
    return (
        <>
            <header>
                <div className="flex bg-accent text-white relative mdh-16">
                    <h1 className="sr-only">YAMAORI</h1>
                    <Link href="/" ><img src="/images/titleLogo.svg" alt="YAMAORI" className="h-12 w-auto pl-4 md:pl-8 pt-1" /></Link>
                    <nav className="hidden md:flex bg-accent text-text font-noto font-semibold gap-16 py-4 pl-16 md:pr-8 lg:pr-16 w-full">
                        <Link href={`/categories/${encodeURIComponent("道具・装備")}`} className="hover:opacity-70"><span className="hidden md:block">▲登山用品・道具について</span><span className="block md:hidden">▲登山用品</span></Link>
                        <HeaderArchiveDropDown />
                        <HeaderAreaDropDown />
                    </nav>
                </div>
                <div>
                    <nav className="flex md:hidden justify-center bg-accent text-text font-noto font-semibold gap-2 md:gap-16 p-2 md:pl-24 w-full">
                        <Link href={`/categories/${encodeURIComponent("道具・装備")}`} className="hover:opacity-70"><span className="hidden md:block">▲登山用品・道具について</span><span className="block md:hidden">▲登山用品</span></Link>
                        <HeaderArchiveDropDown />
                        <HeaderAreaDropDown />
                    </nav>

                </div>
            </header>

        </>
    )
};

export default Header;