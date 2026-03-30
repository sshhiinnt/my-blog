import Link from "next/link"
import Image from "next/image"





export default function EquipmentArtLink() {
    return (
        <div>

            <Link href={`/categories/${encodeURIComponent("道具・装備")}`}>
                <Image
                    src={"/images/equipmentLink.png"}
                    alt="登山用品の選び方記事サムネイル画像"
                    height={360}
                    width={720}
                    className="hover:scale-95 transition-transform mt-16 rounded-3xl"
                />
            </Link>
            <ul>
                <li className="hover:scale-95 transition-transform">
                    <Link href={"https://yamaori.jp/posts/how-to-choose-mountaineering-boots"}
                        className="relative"
                    >
                        <Image
                            src={"/images/tozangutsu.jpg"}
                            alt="登山靴の選び方記事のサムネイル画像"
                            height={360}
                            width={720}
                            className="hover:scale-95 transition-transform mt-16 rounded-3xl"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="font-bold text-text text-3xl">登山靴の選び方</p>
                        </div>
                    </Link>
                </li>
                <li className="hover:scale-95 transition-transform">
                    <Link href={"https://yamaori.jp/posts/how-to-choose-rainwear"} className="relative">
                        <Image
                            src={"/images/rainwear.jpg"}
                            alt="レインウェアの選び方記事のサムネイル画像"
                            height={360}
                            width={720}
                            className="mt-16 rounded-3xl"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="font-bold text-text text-3xl">レインウェアの選び方</p>
                        </div>
                    </Link>
                </li>
                <li className="hover:scale-95 transition-transform mb-16">
                    <Link href={"https://yamaori.jp/posts/how-to-choose-a-backpack-for-mountain-climbing"} className="relative">
                        <Image
                            src={"/images/zac.jpg"}
                            alt="登山用ザック（リュック）の選び方記事のサムネイル画像"
                            height={360}
                            width={720}
                            className="hover:scale-95 transition-transform mt-16 rounded-3xl"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="font-bold text-text text-3xl">登山ザックの選び方</p>
                        </div>
                    </Link>
                </li>

            </ul>
        </div>
    )
}