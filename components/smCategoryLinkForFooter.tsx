import Image from "next/image";
import Link from "next/link";

export default function CategoryLinkImage() {
    return (
        <nav className="flex flex-col md:hidden w-full">
            <Link href={`/categories/${encodeURIComponent("登山記録")}`}>
                <div className="relative w-full h-56">
                    <Image
                        src={"/images/tozankiroku.jpg"}
                        alt="登山記録カテゴリーのイメージ画像"
                        fill
                        className="object-cover"
                    />
                    <p className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded text-3xl text-white font-bold">登山記録</p>
                </div>
            </Link>

            <Link href={`/categories/${encodeURIComponent("トレイルランニング")}`}>
                <div className="relative w-full h-56">
                    <Image
                        src={"/images/trailrun.jpg"}
                        alt="トレイルランニングカテゴリーのイメージ画像"
                        fill
                        className="object-cover"
                    />
                    <p className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded text-3xl text-white font-bold">トレイルランニング</p>
                </div>
            </Link>

            <Link href={`/categories/${encodeURIComponent("クライミング")}`}>
                <div className="relative w-full h-56">
                    <Image
                        src={"/images/climbing.jpg"}
                        alt="クライミングカテゴリーのイメージ画像"
                        fill
                        className="object-cover"
                    />
                    <p className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded text-3xl text-white font-bold">クライミング</p>
                </div>
            </Link>

            <Link href={`/categories/${encodeURIComponent("道具・装備")}`}>
                <div className="relative w-full h-56">
                    <Image
                        src={"/images/gear.JPG"}
                        alt="道具・装備カテゴリーのイメージ画像"
                        fill
                        className="object-cover"
                    />
                    <p className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded text-3xl text-white font-bold">道具・装備</p>
                </div>
            </Link>

            <Link href={`/categories/${encodeURIComponent("ひとりごと")}`}>
                <div className="relative w-full h-56">
                    <Image
                        src={"/images/hitorigoto.jpg"}
                        alt="ひとりごとカテゴリーのイメージ画像"
                        fill
                        className="object-cover"
                    />
                    <p className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded text-3xl text-white font-bold">ひとりごと</p>
                </div>
            </Link>
        </nav >
    )
}