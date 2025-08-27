import Aside from "components/aside";
import { WebPageSchema } from "components/structuredData";

export const metadata = {
    title: "サイトポリシー",
    description: "当サイトYAMAORIのサイトポリシー・プライバシーポリシー・免責事項です"
};

export default function Policy() {
    return (
        <>
            <WebPageSchema
                url="https://yamaori.com/site-policy"
                name="サイトポリシー"
                description="YAMAORIのサイトポリシー（免責事項・プライバシーポリシー等）"
                lastReviewed="2025-08-19T09:00:00.000Z"
                authorName="都市慎太郎"
            />

            <div className="flex justify-center bg-secondary">
                <main className="max-w-4xl w-full bg-accentry my-4 p-4 rounded-3xl">
                    <h2 className="text-3xl font-bold text-center">サイトポリシー</h2>
                    <div className="my-4">
                        <h3 className="text-xl font-bold m-1">免責事項</h3>
                        <p>・当サイトに掲載する情報については正確性や最新性の確保に努めておりますが、その内容の正確性・安全性を保証するものではありません。<br />
                            当サイトの情報を利用することで生じたいかなる損害についても、当サイト運営者は一切の責任を負いかねます。<br />
                            商品やサービスの購入・利用に関する最終的な判断は、必ずご自身の責任で行ってください。</p>
                        <p className="mt-4">・当サイトに掲載する登山・アウトドア活動および装備・ギアに関する情報は参考提供に過ぎず、
                            登山は自己責任を原則とする活動であることをご理解ください。<br />
                            装備の使用や山行に伴い発生した事故・傷害・損害について当サイトおよび運営者は一切の責任を負いません。</p>
                    </div>
                    <div className="my-4">
                        <h3 className="text-xl font-bold m-1">アフィリエイト広告について</h3>
                        <p>当サイトでは、アフィリエイト広告を利用しております。<br />
                            記事内のリンクから商品を購入された場合、当サイトに報酬が発生することがあります。<br />
                            ただし、当サイトが紹介している商品・サービスは、できる限り信頼性の高いものを選んでおります。</p>
                    </div>
                    <div className="my-4">
                        <h3 className="text-xl font-bold m-1">プライバシーポリシー</h3>
                        <p>当サイトでは、アクセス解析ツールを利用しており、Cookieを使用して匿名のトラフィックデータを収集しています。<br />
                            このデータは個人を特定するものではなく、サイトの改善にのみ利用されます。<br />
                            Cookieの利用を望まない場合は、ブラウザの設定により拒否することが可能です。</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold m-1">運営者情報</h3>
                        <p>運営者：YAMAORI管理人</p>
                        <p>お問い合わせ:<a href="http://localhost:3000/contact" className="text-blue-700 hover:opacity-70">http://localhost:3000/contact</a></p>
                    </div>
                </main>
                <Aside />
            </div>
        </>
    )
}
