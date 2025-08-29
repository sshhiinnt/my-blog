'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";




export default function HeaderAreaDropDown() {
    const router = useRouter();
    const [areas, setAreas] = useState<string[]>([]);
    const [selectedArea, setSelectedArea] = useState<string>("");

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/areas`);
                if (!res.ok) throw new Error(`APIエラー${res.status}`);
                const data: string[] = await res.json();
                setAreas(data);
            } catch (err) {
                console.error("エリア取得失敗", err);
            }
        };
        fetchAreas();
    }, []);

    const areaList = [
        { slug: "kyushu", name: "九州" },
        { slug: "shikoku", name: "四国" },
        { slug: "chugoku", name: "中国地方" },
        { slug: "kinki", name: "近畿地方" },
        { slug: "chubu", name: "中部地方" },
        { slug: "north_alps", name: "北アルプス" },
        { slug: "central_alps", name: "中央アルプス" },
        { slug: "south_alps", name: "南アルプス" },
        { slug: "kanto", name: "関東" },
        { slug: "tohoku", name: "東北" },
        { slug: "hokkaido", name: "北海道" },
    ];


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
                {areaList.map(a => (
                    <option key={a.slug} value={a.slug}>{a.name}</option>
                ))}
            </select>
        </div>
        
    )
}


