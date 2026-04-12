'use client'

import Image from "next/image";

const TopImage = () => {
    return (
        <div className="relative">
            <Image
                src={"/images/topImage.png"}
                alt="サイトイメージ画像"
                width={4000}
                height={2232}
                className="w-full"
            />
            <div className="absolute top-4 left-8 md:top-4 md:left-8">

                <img src="/images/titleLogo.svg" alt="YAMAORI" className="h-36 w-auto" />
                <h2 className="sr-only">YAMAORI</h2>
            </div>
            <h3 className="absolute bottom-16 left-24 font-noto font-semibold text-2xl tracking-wider">日常に、YAMAORIという選択肢。</h3>
        </div>

    )
};
export default TopImage;