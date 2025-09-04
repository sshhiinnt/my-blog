'use client'

import rawproducts from "../src/data/moshimoProducts.json";
import { MoshimoProducts } from "types/moshimo";
import Image from "next/image";

const products = rawproducts as unknown as MoshimoProducts;

type Props = {
    product: string;
};

export default function MoshimoLink({ product }: Props) {
    const data = products[product];
    if (!data) {
        return <div>商品情報が見つかりません:{product}</div>
    }

    return (
        <div className="border rounded-2xl p-4 shadow-md my-6 bg-white not-prose">
            <h3 className="font-bold text-2xl">{product}</h3>
            <div className="flex gap-4">
                <Image
                    src={data.imageUrl}
                    alt={product}
                    width={288}
                    height={288}
                    style={{ height: "auto" }}
                    className="object-cover rounded-lg"
                />
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col mx-auto gap-4 mt-4">
                        {data.amazon && (
                            <a href={data.amazon} target="_blank" className="text-xl font-bold text-center px-3 py-1 bg-yellow-400 rounded-lg">
                                Amazonで見る
                            </a>
                        )}
                        {data.rakuten && (
                            <a href={data.rakuten} target="_blank" className="text-xl font-bold text-center px-3 py-1 bg-red-500 text-white rounded-lg">
                                楽天市場で見る
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