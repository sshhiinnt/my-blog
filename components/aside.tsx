'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";


type Category = {
    _id: string;
    slug: string;
    name: string;
    group: string
};

const Aside = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories");
                const data = await res.json();

                console.log("categories fetched:", data);

                setCategories(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const categoryOrder: Record<string, string[]> = {
        "登山記録": ["登山記録", "山登り", "沢登り", "雪山登山"],
        "トレイルランニング": ["トレイルランニング", "大会レポート", "トレイルランニング用品"],
        "クライミング": ["フリークライミング", "ボルダー", "アイスクライミング"],
        "道具・装備": ["靴・ザック", "その他登山用品", "クライミングシューズ・ギア"],
        "ひとりごと": ["ひとりごと"],
    }

    const groupAndSortCategories = (categories: Category[]) => {
        if (!Array.isArray(categories)) {
            console.log("カテゴリーデータが配列ではありません:", categories);
            return {};
        }

        const grouped = categories.reduce<Record<string, Category[]>>((acc, cat) => {
            acc[cat.group] = acc[cat.group] || [];
            acc[cat.group].push(cat);
            return acc;
        }, {});

        for (const group in grouped) {
            const CategoriesList = categoryOrder[group] || [];

            grouped[group].sort((a, b) => {
                const aIndex = CategoriesList.indexOf(a.name);
                const bIndex = CategoriesList.indexOf(b.name);

                const aRank = aIndex === -1 ? Infinity : aIndex;
                const bRank = bIndex === -1 ? Infinity : bIndex;

                return aRank - bRank;
            });
        }

        return grouped;
    };

    const grouped = groupAndSortCategories(categories);

    return (
        <aside className="hidden md:block bg-acce w-72 p-4 ml-16">
<div className="bg-surface rounded-md">
            <h2 className="text-center text-accent text-xl font-bold pt-32">初心者必見！！</h2>
            <h2 className="text-center text-accent text-xl font-bold pt-4">↓登山三種の神器の選び方↓</h2>
            <ul className="flex flex-col px-4">
                <li className="">
                    <Link href={`/categories/${encodeURIComponent("道具・装備")}`}>
                        <Image
                            src={"/images/equipmentLink.png"}
                            alt="登山用品の選び方記事サムネイル画像"
                            height={360}
                            width={720}
                            className="hover:scale-95 transition-transform mt-16 rounded-3xl"
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
                            className="hover:scale-95 transition-transform mt-16 rounded-3xl"
                        />
                        <div className="absolute bottom-16 left-8">
                            <p className="font-noto font-semibold text-text text-2xl hidden md:block">登山靴</p>
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
                            className="mt-16 rounded-3xl"
                        />
                        <div className="absolute bottom-16 left-8">
                            <p className="font-noto font-semibold text-text text-2xl hidden md:block">レインウェア</p>
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
                            className="hover:scale-95 transition-transform mt-16 rounded-3xl"
                        />
                        <div className="absolute bottom-16 left-8">
                            <p className="font-noto font-semibold text-text text-2xl hidden md:block">登山ザック</p>
                        </div>
                    </Link>
                    <p className="text-text font-bold text-lg text-center md:hidden">ザック</p>
                </li>

            </ul>
        </div>            <div className="bg-accent mt-4 rounded-3xl border-">
                <h3 className="font-noto text-2xl text-center font-bold pt-4">Category</h3>
                {loading ? (
                    <p>読み込み中……</p>
                ) : (
                    <div className="px-8 py-4">
                        {Object.entries(grouped).map(([group, cats]) => (
                            <div key={group}>
                                <div className="text-lg font-bold">
                                    {group}
                                </div>
                                <ul>
                                    {cats.map((cat) => (
                                        <li key={cat._id} className="hover:opacity-70">
                                            <Link
                                                href={`/categories/${encodeURIComponent(cat.group)}/${encodeURIComponent(cat.slug)}`}>
                                                ・{cat.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )
                }
            </div>
            <div className="bg-white rounded-3xl my-12 p-4">
                <h3 className="font-noto text-2xl text-center font-bold">Profile</h3>
                <Image
                    src={"/images/plof.JPG"}
                    alt="プロフィール写真"
                    width={2108} height={2107}
                    className="size-20 rounded-full justify-self-center mb-1"
                />
                <p className="font-bold text-2xl text-center mb-1">YAMAORI管理人</p>
                <p>なぜ、山に行くのか、気付いたら山にいる理由は何か……。</p>
            </div>
        </aside >
    )

}
export default Aside;
