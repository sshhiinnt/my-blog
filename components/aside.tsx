'use client';

import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import Image from "next/image";


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
                return NextResponse.json({ error: "カテゴリー取得失敗" }, { status: 500 });
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const categoryOder: Record<string, string[]> = {
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
            const CategoriesList = categoryOder[group] || [];

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
        <aside className="hidden md:block bg-secondary w-64 p-4">
            <div className="bg-accentry mt-4 rounded-3xl">
                <h3 className="font-noto font-bold text-3xl text-center">Category</h3>
                {loading ? (
                    <p>読み込み中……</p>
                ) : (
                    <div className="p-4">
                        {Object.entries(grouped).map(([group, cats]) => (
                            <div key={group}>
                                <div className="text-lg font-bold">
                                    {group}
                                </div>
                                <ul>
                                    {cats.map((cat) => (
                                        <li key={cat._id}>
                                            <a
                                                href={`/categories/${cat.slug}`}>
                                                {cat.name}
                                            </a>
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
                <h3 className="font-noto font-bold text-3xl text-center">Profiel</h3>
                <Image
                    src={"/images/plof.jpg"}
                    alt="プロフィール写真"
                    width={2108} height={2107}
                    className="size-20 rounded-full justify-self-center"
                />
                <p className="text-center font-bold text-lg">といち</p>
                <p>山歩き、トレイルランニング、クライミングと、とにかく山遊びが大好きです。</p>
                <p>このサイトでは山遊びの記録を日記的に発信します。</p>
            </div>
        </aside >
    )

}
export default Aside;
