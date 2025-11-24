
import TopImage from "components/topImage";
import NewArticle from "components/newArticle";
import Aside from "components/aside";
import { WebPageSchema } from "components/structuredData";


export async function generateMetadata() {
    return {
        title: "YAMAORI-山で遊ばせてもらっております",
        description:"このブログは登山用品の紹介や山歩きをはじめとした、トレイルランニングやクライミング、雪山登山、沢登りの私の山行記録を日記的に記録している登山ブログです。",
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
                <main className="flex justify-center bg-secondary">
                    <article className="max-w-4xl w-full">
                        <NewArticle page={1} />
                    </article>
                    <aside>
                        <Aside />
                    </aside>
                </main>
            </div>
        </>

    )
}
