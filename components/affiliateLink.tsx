"use client";

import { useState } from "react";

type RawAffiliateLink = {
    u_url: string;
    u_tx: string;
    a_id: number;
    p_id: number;
    pl_id: number;
    pc_id: number;
    s_n: string;
};

type AffiliateLink = RawAffiliateLink & {
    fullUrl: string;
    images: string[]; // 追加：画像URL配列
};

type MoshimoJSON = {
    b_l?: RawAffiliateLink[];
    d?: string;        // 画像ベースURL
    c_p?: string;      // 画像パスプレフィックス
    p?: string[];      // 画像ファイル名配列
    [key: string]: unknown;
};

export default function AffiliateLinkParser() {
    const [rawHtml, setRawHtml] = useState<string>("");
    const [links, setLinks] = useState<AffiliateLink[]>([]);

    const handleParse = () => {
        try {
            const match = rawHtml.match(/msmaflink\((\{[\s\S]*\})\);/);
            if (!match) throw new Error("Moshimo JSON が見つかりません");

            const json: MoshimoJSON = JSON.parse(match[1]);

            if (!json.b_l || !Array.isArray(json.b_l)) {
                throw new Error("リンク情報がありません");
            }

            const baseUrl = json.d || "";
            const prefix = json.c_p || "";
            const images = Array.isArray(json.p) ? json.p.map((p) => `${baseUrl}${prefix}${p}`) : [];

            const processedLinks: AffiliateLink[] = json.b_l
                .filter(
                    (link): link is RawAffiliateLink =>
                        !!link.u_url &&
                        !!link.u_tx &&
                        typeof link.a_id === "number" &&
                        typeof link.p_id === "number" &&
                        typeof link.pl_id === "number" &&
                        typeof link.pc_id === "number" &&
                        !!link.s_n
                )
                .map((link) => {
                    const url = new URL(link.u_url);
                    url.searchParams.set("a_id", link.a_id.toString());
                    url.searchParams.set("p_id", link.p_id.toString());
                    url.searchParams.set("pl_id", link.pl_id.toString());
                    url.searchParams.set("pc_id", link.pc_id.toString());
                    return { ...link, fullUrl: url.toString(), images };
                });

            setLinks(processedLinks);
        } catch (err) {
            console.error(err);
            alert(err instanceof Error ? err.message : "パースに失敗しました");
            setLinks([]);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Moshimo アフィリエイトリンクパーサー</h1>

            <textarea
                className="w-full h-64 p-2 border rounded mb-4"
                placeholder="ここに Moshimo の HTML を貼り付け"
                value={rawHtml}
                onChange={(e) => setRawHtml(e.target.value)}
            />

            <button className="px-4 py-2 bg-blue-600 text-white rounded mb-4" onClick={handleParse}>
                パースしてリンク生成
            </button>

            {links.length > 0 ? (
                <ul>
                    {links.map((link) => (
                        <li key={link.a_id} className="mb-4">
                            <a href={link.fullUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                {link.fullUrl} ({link.s_n})
                            </a>
                            <div className="flex gap-2 mt-2">
                                {link.images.map((img, i) => (
                                    <img key={i} src={img} alt={link.u_tx} className="h-20 border" />
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>リンクがまだ生成されていません。</p>
            )}
        </div>
    );
}
