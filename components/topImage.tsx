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
            <div className="absolute top-8 left-8 md:top-10 md:left-32">

                <img src="/images/titleLogo.svg" alt="YAMAORI" className="h-8 md:h-24 w-auto" />
                <h1 className="sr-only">YAMAORI</h1>
            </div>
            <h3 className="absolute bottom-4 left-4 md:bottom-16 md:left-24 font-noto font-semibold text-xs md:text-2xl tracking-wider">日常に、YAMAORIという選択肢。</h3>
            <h3 className="hidden md:block absolute right-40 top-4 font-serif text-6xl text-text tracking-widest leading-normal [writing-mode:vertical-rl]">生きるには、<br />山や自然との<br />関りから得られる<br />心にくべる薪が<br />必要なんです。</h3>
            <h3 className="block md:hidden absolute right-16 top-8 font-serif text-sm text-text tracking-widest leading-relaxed [writing-mode:vertical-rl]">生きるには、<br />山や自然との<br />関りから得られる<br />心にくべる薪が<br />必要なんです。</h3>
        </div>

    )
};
export default TopImage;