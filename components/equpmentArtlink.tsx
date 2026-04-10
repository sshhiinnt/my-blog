import Link from "next/link"
import Image from "next/image"





export default function EquipmentArtLink() {
    return (
        <div className="bg-surface">
            <h2 className="block md:hidden text-center text-accent text-xl font-bold pt-4">初心者必見！！</h2>
            <h2 className="block md:hidden text-center text-accent text-xl font-bold pt-4">↓登山三種の神器の選び方↓</h2>
            <ul className="flex overflow-x-auto gap-4 px-4 md:block">
                <li className="hidden md:block">
                    <Link href={`/categories/${encodeURIComponent("道具・装備")}`}>
                        <Image
                            src={"/images/equipmentLink.png"}
                            alt="登山用品の選び方記事サムネイル画像"
                            height={360}
                            width={720}
                            className="animate-tapHint hover:scale-95 transition-transform mt-16 rounded-3xl"
                        />
                    </Link>
                </li>
                <li className="hover:scale-95 transition-transform">
                    <Link href={"https://yamaori.jp/posts/how-to-choose-mountaineering-boots"}
                        className="relative"
                    >
                        <Image
                            src={"/images/tozangutsu.jpg"}
                            alt="登山靴の選び方記事のサムネイル画像"
                            height={360}
                            width={720}
                            className="animate-tapHint hover:scale-95 transition-transform mt-16 rounded-3xl"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="font-bold text-text text-3xl hidden md:block">登山靴</p>
                        </div>
                    </Link>
                    <p className="text-text font-bold text-lg text-center md:hidden">登山靴</p>
                </li>
                <li className="hover:scale-95 transition-transform">
                    <Link href={"https://yamaori.jp/posts/how-to-choose-rainwear"} className="relative">
                        <Image
                            src={"/images/rainwear.jpg"}
                            alt="レインウェアの選び方記事のサムネイル画像"
                            height={360}
                            width={720}
                            className="animate-tapHint mt-16 rounded-3xl"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="font-bold text-text text-3xl hidden md:block">レインウェア</p>
                        </div>
                    </Link>
                    <p className="text-text font-bold text-lg text-center md:hidden">レインウェア</p>
                </li>
                <li className="hover:scale-95 transition-transform mb-16">
                    <Link href={"https://yamaori.jp/posts/how-to-choose-a-backpack-for-mountain-climbing"} className="relative">
                        <Image
                            src={"/images/zac.jpg"}
                            alt="登山用ザック（リュック）の選び方記事のサムネイル画像"
                            height={360}
                            width={720}
                            className="animate-tapHint hover:scale-95 transition-transform mt-16 rounded-3xl"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="font-bold text-text text-3xl hidden md:block">登山ザック</p>
                        </div>
                    </Link>
                    <p className="text-text font-bold text-lg text-center md:hidden">ザック</p>
                </li>

            </ul>
        </div>
    )
}