'use client'

import Image from "next/image";
import Link from "next/link";

const TopImage = () => {
    return (
        <div className="relative">
            <Image
                src={"/images/topImage.JPG"}
                alt="サイトイメージ画像"
                width={4000}
                height={2232}
                className="w-full"
            />
            <div className="absolute top-4 left-8 md:top-24 md:left-1/2 md:-translate-x-1/2 text-white font-noto">
                <div>
                    <h2 className="text-center text-5xl md:text-6xl py-8 font-Rockn">山へ</h2>
                    <p className="pt-4 md:text-center">このブログでは私の日々の山遊びの記録と、</p>
                    <p className="md:text-center">登山やトレイルランニング、クライミング、沢登りの記録や登山用品の紹介をしています。</p>
                </div>
                <div className="hidden md:flex gap-36 mt-36 justify-center">
                    <Link
                        href="https://www.youtube.com/@%E5%B1%B1%E3%81%A7%E9%81%8A%E3%81%B0%E3%81%9B%E3%81%A6%E3%82%82%E3%82%89%E3%81%A3%E3%81%A6%E3%81%8A%E3%82%8A%E3%81%BE%E3%81%99"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p>YOUTUBE</p>
                        <Image
                            src="/icons/youtube_w.svg"
                            alt="x（旧Twitter）"
                            width={72}
                            height={72}
                            className="hover:scale-110 transition-transform"
                        />
                    </Link>
                    <Link
                        href="https://www.instagram.com/mt.yamaori/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p>Instagram</p>
                        <Image
                            src="/icons/instagram_w.svg"
                            alt="instagram"
                            width={72}
                            height={72}
                            className="hover:scale-110 transition-transform"
                        />
                    </Link>
                </div>
            </div>
        </div>

    )
};
export default TopImage;