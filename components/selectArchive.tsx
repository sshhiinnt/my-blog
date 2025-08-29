'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


type ArchiveItem = {
    label: string,
    year: number,
    month: number,
};


export default function HeaderArchiveDropDown() {
    const router = useRouter();
    const [archives, setArchives] = useState<ArchiveItem[]>([]);
    const [selectedArchive, setSelectedArchive] = useState<string>("");

    useEffect(() => {
        const fetchArchives = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/archive`);
                if (!res.ok) throw new Error(`APIエラー${res.status}`);
                const data = await res.json();
                setArchives(data);
            } catch (err) {
                console.error("アーカイブ取得失敗", err);
            }
        };
        fetchArchives();
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedArchive = e.target.value;
        setSelectedArchive(selectedArchive);

        if (selectedArchive) {
            const [year, month] = selectedArchive.split("-").map(Number)
            router.push(`/archive/${year}/${month}`);
        }
    };

    return (
        <div>
            <select
                value={selectedArchive}
                onChange={handleChange}
                className="bg-secondary hover:cursor-pointer">
                <option value="">▲年月で記事を検索</option>
                {archives.map((a) => (
                    <option key={`${a.year}-${a.month}`} value={`${a.year}-${a.month}`}>{a.label}</option>
                ))}
            </select>
        </div>
    )
}


