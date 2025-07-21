
import TopImage from "components/topImage";
import NewArticle from "components/newArticle";
import Aside from "components/aside";



export const metadata = {
    title: "山で遊んでおります",
    description: "このブログは登山用品の紹介や山歩きをはじめとした、トレイルランニングやクライミング、雪山登山、沢登りの私の山行記録を日記的に記録している登山ブログです。"
}

export default function Home() {

    return (
        <div>
            <TopImage />
            <main className="flex bg-secondary">
                <article className="flex-1">
                    <NewArticle page={1} showPagination={false} />
                </article>
                <aside>
                <Aside />
                </aside>
            </main>
        </div>

    )
}
