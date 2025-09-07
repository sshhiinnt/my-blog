'use client'

import { MoshimoProducts } from "types/moshimo";
import Image from "next/image";
import { useEffect, useState } from "react";


type Props = {
    product: string;
};

export default function MoshimoLink({ product }: Props) {
    const [products, setProducts] = useState<MoshimoProducts | null>(null);

    useEffect(() => {
        fetch("/data/moshimoProducts.json")
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    if (!products) return <div>読み込み中…</div>;

    const data = products[product];
    if (!data) {
        return <div>商品情報が見つかりません:{product}</div>
    }

    return (
        <div className="border rounded-2xl p-4 shadow-md my-6 bg-white not-prose">
            <h3 className="font-bold text-2xl">{product}</h3>
            <div className="flex gap-4">
                <div className="relative w-full h-64 md:h-72 lg:h-80">
                    <Image
                        src={data.imageUrl}
                        alt={product}
                        fill
                        className="object-contain rounded-lg"
                    />

                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col mx-auto gap-4 mt-4">
                        {data.amazon && (
                            <a href={data.amazon} target="_blank" className="text-xl font-bold text-center px-3 py-1 bg-yellow-400 rounded-lg">
                                Amazon
                            </a>
                        )}
                        {data.rakuten && (
                            <a href={data.rakuten} target="_blank" className="text-xl font-bold text-center px-3 py-1 bg-red-500 text-white rounded-lg">
                                楽天市場
                            </a>
                        )}
                        {data.yahoo && (
                            <a href={data.yahoo} target="_blank" className="text-xl font-bold text-center px-3 py-1 bg-purple-600 text-white rounded-lg">
                                Yahoo
                            </a>
                        )}
                        <p className="text-sm mt-4">こちらのリンクからご購入いただけます<br />（アフィリエイトリンク）</p>
                    </div>
                </div>
            </div>
        </div>
    )
}