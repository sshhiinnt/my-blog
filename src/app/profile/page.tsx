import Image from "next/image";

export const metadata = {
    title: "筆者について",
    description: "YAMAORI筆者のプロフィールです"
};

export default function Plof() {
    return (
        <main className="plof-container">
            <h2><Image
             src="/images/plof.jpg" width={2108} height={2107} alt="プロフィール写真" className="plofimg"/></h2>
            <h3 className="plofH3">元登山用品店店員</h3>
            <p>四季を通して、山歩きやトレイルランニング、クライミング、沢登り等を楽しんでいます。</p>
            <p>このサイトでは私個人の登山記録や、長年の店員時代の知識を元に山に関する様々な最新情報を発信します。</p>
        </main>

    )



}