import Image from "next/image";
import Link from "next/link";

export default function CategoryLinkImage() {
    return (
        <div className="bg-surface w-full pb-16">
            <h4 className="font-noto font-semibold text-xl text-text text-center py-16">カテゴリー</h4>
            <nav>
                <div className="flex flex-col md:grid grid-cols-2 gap-16 mx-4 md:mx-48">
                    <Link href={`/categories/${encodeURIComponent("登山記録")}`}>
                        <div className="relative min-w-[300px] h-56">
                            <Image
                                src={"/images/tozankiroku.jpg"}
                                alt="登山記録カテゴリーのイメージ画像"
                                fill
                                className="object-cover rounded-md"
                            />
                            <h5 className="absolute bottom-4 left-4 px-2 py-1 rounded text-2xl text-white font-noto font-semibold">登山記録</h5>
                        </div>
                    </Link>

                    <Link href={`/categories/${encodeURIComponent("トレイルランニング")}`}>
                        <div className="relative min-w-[300px] h-56">
                            <Image
                                src={"/images/trailrun.jpg"}
                                alt="トレイルランニングカテゴリーのイメージ画像"
                                fill
                                className="object-cover rounded-md"
                            />
                            <h5 className="absolute bottom-4 left-4 px-2 py-1 rounded text-2xl text-white font-noto font-semibold">トレイルランニング</h5>
                        </div>
                    </Link>

                    <Link href={`/categories/${encodeURIComponent("クライミング")}`}>
                        <div className="relative min-w-[300px] h-56">
                            <Image
                                src={"/images/climbing.jpg"}
                                alt="クライミングカテゴリーのイメージ画像"
                                fill
                                className="object-cover rounded-md"
                            />
                            <h5 className="absolute bottom-4 left-4 px-2 py-1 rounded text-2xl text-white font-noto font-semibold">クライミング</h5>
                        </div>
                    </Link>

                    <Link href={`/categories/${encodeURIComponent("道具・装備")}`}>
                        <div className="relative min-w-[300px] h-56">
                            <Image
                                src={"/images/gear.JPG"}
                                alt="道具・装備カテゴリーのイメージ画像"
                                fill
                                className="object-cover rounded-md"
                            />
                            <h5 className="absolute bottom-4 left-4 px-2 py-1 rounded text-2xl text-white font-noto font-semibold">道具・装備</h5>
                        </div>
                    </Link>

                    <Link href={`/categories/${encodeURIComponent("ひとりごと")}`}>
                        <div className="relative min-w-[300px] h-56">
                            <Image
                                src={"/images/hitorigoto.jpg"}
                                alt="ひとりごとカテゴリーのイメージ画像"
                                fill
                                className="object-cover rounded-md"
                            />
                            <h5 className="absolute bottom-4 left-4 px-2 py-1 rounded text-2xl text-white font-noto font-semibold">ひとりごと</h5>
                        </div>
                    </Link>
                </div>


            </nav >
        </div>
    )
}