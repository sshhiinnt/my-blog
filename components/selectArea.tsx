'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { map } from "zod";

type Areas = {
    slug: string;
    name: string;
    count: number;
};


export default function HeaderAreaDropDown() {
    const router = useRouter();
    const [areas, setAreas] = useState<Areas[]>(
        [{ slug: "kyushu", name: "九州", count: 0 },
        { slug: "shikoku", name: "四国",count: 0 },
        { slug: "chugoku", name: "中国地,方",count: 0 },
        { slug: "kinki", name: "近畿地方",count: 0 },
        { slug: "chubu", name: "中部地方",count: 0 },
        { slug: "north_alps", name: "北アルプス",count: 0 },
        { slug: "central_alps", name: "中央アルプス",count: 0 },
        { slug: "south_alps", name: "南アルプス",count: 0 },
        { slug: "kanto", name: "関東" ,count: 0},
        { slug: "tohoku", name: "東北",count: 0 },
        { slug: "hokkaido", name: "北海道",count: 0 },
        ]);
    const [selectedArea, setSelectedArea] = useState<string>("");

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/areas`);
                if (!res.ok) throw new Error(`APIエラー${res.status}`);
                const data: { slug: string; count: number }[] = await res.json();
                setAreas(prev =>
                    prev.map(a => {
                        const found = data.find(d => d.slug === a.slug);
                        return { ...a, count: found?.count ?? 0 };
                    })
                );
            } catch (err) {
                console.error("エリア取得失敗", err);
            }
        };
        fetchCounts();
    }, []);



    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const slug = e.target.value;
        console.log("選択したslug:", slug);
        setSelectedArea(slug);

        if (slug) {
            router.push(`/area/${slug}`);
        }
    };

    return (
        <div>
            <select
                value={selectedArea}
                onChange={handleChange}
                className="bg-secondary">
                <option value="">▲エリアを選択</option>
                {areas.map(a => (
                    <option key={a.slug} value={a.slug}>{a.name}（{a.count}）</option>
                ))}
            </select>
        </div>

    )
}


