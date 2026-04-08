'use client';

import Link from "next/link";
import Image from "next/image";
import HeaderAreaDropDown from "./selectArea";
import HeaderArchiveDropDown from "./selectArchive";



const Header = () => {
    return (
        <>
            <header className="bg-accent text-white relative h-20 flex items-center justify-center md:justify-start">
                <h1 className="text-4xl font-Rockn md:ml-16">
                    <Link href="/">YAMAORI</Link>
                </h1>
                <nav>
                    <div className="flex gap-8 md:hidden">
                        <Link
                            href="https://www.youtube.com/@%E5%B1%B1%E3%81%A7%E9%81%8A%E3%81%B0%E3%81%9B%E3%81%A6%E3%82%82%E3%82%89%E3%81%A3%E3%81%A6%E3%81%8A%E3%82%8A%E3%81%BE%E3%81%99"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src="/icons/youtube_w.svg"
                                alt="youtubeへのリンク"
                                width={32}
                                height={32}
                                className="absolute right-8 top-8 hover:scale-110 transition-transform"
                            />
                        </Link>
                        <Link
                            href="https://www.instagram.com/mt.yamaori/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src="/icons/instagram_w.svg"
                                alt="instagramへのリンク"
                                width={32}
                                height={32}
                                className="absolute left-8 top-8 hover:scale-110 transition-transform"
                            />
                        </Link>
                    </div>
                </nav>
            </header>
            <nav className="bg-bg border-b-4 border-b-border text-text flex justify-end space-x-4 md:pr-8 lg:pr-16 w-full">
                <Link href={`/categories/${encodeURIComponent("道具・装備")}`} className="hover:opacity-70"><span className="hidden md:block">▲登山用品・道具について</span><span className="block md:hidden">▲登山用品</span></Link>
                <HeaderArchiveDropDown />
                <HeaderAreaDropDown />
            </nav>

        </>
    )
};

export default Header;