'use client'


import Image from "next/image";

const TopImage = () => {
    return (
        <div className="relative">
            <Image
                src={"/images/topImage.jpg"}
                alt="サイトイメージ画像"
                width={4000}
                height={2232}
                className="w-full"
            />
            <div className="absolute top-12 left-16 text-white font-noto">
                <h2 className="text-5xl py-8">山へ出かけよう</h2>
                <p>このブログでは私の日々の山遊びの記録と、</p>
                <p>登山やトレイルランニング、クライミング、沢登りの情報や登山用品の紹介を掲載しています。</p>
            </div>
        </div>

    )
};
export default TopImage;