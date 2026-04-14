
import TopImage from "components/topImage";
import NewArticle from "components/newArticle";
import { WebPageSchema } from "components/structuredData";
import EquipmentArtLink from "components/equpmentArtlink";
import Link from "next/link";
import HeaderArchiveDropDown from "components/selectArchive";
import HeaderAreaDropDown from "components/selectArea";


export async function generateMetadata() {
    return {
        title: "YAMAORI-山で遊ばせてもらっております",
        description: "このブログは登山用品の紹介や山歩きをはじめとした、トレイルランニングやクライミング、雪山登山、沢登りの私の山行記録を日記的に記録している登山ブログです。",
        alternates: {
            canonical: "https://yamaori.jp"
        },
    }
}


export default function Home() {
    return (
        <>
            <WebPageSchema
                url="https://yamaori.jp"
                name="YAMAORI"
                description="このブログは登山用品の紹介や山歩きをはじめとした、トレイルランニングやクライミング、雪山登山、沢登りの私の山行記録を日記的に記録している登山ブログです。"
                lastReviewed="2025-08-27T10:00:00.000Z"
                authorName="都市慎太郎"
            />
            <div>
                <TopImage />
                <nav className="flex bg-accent text-text font-noto font-semibold gap-1 md:gap-16 p-2 md:pl-24 w-full">
                    <Link href={`/categories/${encodeURIComponent("道具・装備")}`} className="hover:opacity-70"><span className="hidden md:block">▲登山用品・道具について</span><span className="block md:hidden">▲登山用品</span></Link>
                    <HeaderArchiveDropDown />
                    <HeaderAreaDropDown />
                </nav>
                <main className="flex justify-center bg-surface">
                    <article className="max-w-4xl w-full">
                        <NewArticle page={1} />
                    </article>
                </main>
                <EquipmentArtLink />
            </div>
        </>

    )
}
