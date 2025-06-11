'use client';

import { useEffect, useState } from "react";



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
            } catch (err) {
                console.error("カテゴリー取得失敗:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const categoryOder: Record<string, string[]> = {
        "登山記録": ["登山記録", "山登り", "沢登り", "雪山登山"],
        "トレイルランニング": ["大会レポート", "トレイルランナーの日常"],
        "クライミング": ["フリークライミング", "ボルダー", "アイスクライミング"],
        "装備": ["登山靴・バックパック・テント泊装備", "その他登山用品", "トレイルランニング用品", "クライミングシューズ・ギア"],
        "monologue": ["monologue"],
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
        <aside>
            <h3>カテゴリー</h3>
            {loading ? (
                <p>読み込み中……</p>
            ) : (
                <div>
                    {Object.entries(grouped).map(([group, cats]) => (
                        <div key={group}>
                            <div>
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


        </aside >
    )

}
export default Aside;
