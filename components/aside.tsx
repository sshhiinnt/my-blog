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
        <aside className="hidden md:block bg-secondary w-72 p-4 ml-16">
            <div className="bg-accentry mt-4 rounded-3xl">
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
                <p>山歩き、トレイルランニング、クライミングと、とにかく山遊びが大好きです。</p>
                <p>このサイトでは山遊びの記録を日記的に発信します。</p>
            </div>
        </aside >
    )

}
export default Aside;
