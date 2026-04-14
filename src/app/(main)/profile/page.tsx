import Aside from "components/aside";
import Image from "next/image";
import { ProfilePageSchema } from "components/structuredData";

export async function generateMetadata() {
    return {
        title: "YAMAORI管理人のプロフィール",
        description: "YAMAORI管理人のプロフィールです",
        alternates: {
            canonical: "https://yamaori.jp/profile",
        },
    };
}


export default function Prof() {
    return (
        <>
            <ProfilePageSchema
                url="https://yamaori.jp/profile"
                name="YAMAORI管理人プロフィール"
                description="YAMAORI管理人のプロフィールです"
                lastReviewed="2025-08-26T15:00:00.000Z"
                authorName="都市慎太郎"
            />
            <div className="flex justify-center bg-surface">
                <main className="bg-accent max-w-4xl w-full rounded-3xl my-4 mx-4 ">
                    <h2 className="font-bold text-3xl text-center py-4">Profile</h2>
                    <div className=" flex flex-col items-center">
                        <Image
                            src="/images/plof.JPG"
                            width={2108} height={2107}
                            alt="YAMAORI筆者のプロフィール写真"
                            className="size-96 rounded-3xl" />

                        <div className="pt-4 text-center">
                            <h3 className="text-lg font-bold pb-8">元登山用品店店員</h3>
                            <div className="hidden md:block">
                                <h3 className="text-3xl pb-4">短い人生の中で正気に戻った時機にはもう山遊びしかしてなかった。</h3>
                                <h3 className="text-2xl pb-8">なぜ山に入るのか、楽しい事だけじゃないよ。けれども、気づいたらもう次の計画を立てている。</h3>
                                <h3 className="text-6xl pb-8 text-start pl-16">素敵な出会い<span className="text-3xl pl-16">も、たくさん有った。</span></h3>
                                <h3 className="text-3xl pb-16 text-end">良し悪し問わず……。「人との出会い」という意味だけではなく……。</h3>
                            </div>
                            <div className="block md:hidden justify-items-center">
                                <h3 className="text-3xl pb-4 tracking-wide leading-relaxed font-serif [writing-mode:vertical-rl]">
                                    <span className="inline-block">山遊びしかしてなかった。</span>
                                    <span className="inline-block">なぜ山に入るのか、</span>
                                    <span className="inline-block">「楽しい事だけじゃないよ」</span>
                                    <span className="inline-block">けれども、気づいたら</span>
                                    <span className="inline-block">もう次の山の計画を立てている。</span>
                                    <span className="inline-block">素敵な出会いもたくさん有った。</span>
                                    <span className="inline-block">良し悪し問わず……。</span>
                                    <span className="inline-block">「人との出会い」</span>
                                    <span className="inline-block">という意味だけではなく……。</span>
                                </h3>
                            </div>
                            <p className="text-sm">このブログでは <br />私の登山記録や店員時代の知識を元に山に関する様々な最新情報を発信します。</p>
                            <h3 className="my-8 text-center text-3xl font-bold italic underline pt-32">このサイトでは記事を募集しています</h3>
                            <p className="text-start p-4">山に関する内容であれば詳細は問いません。 情熱あふれるクライマー、おしゃれハイカー、山行記録をぜひお寄せください。<br />
                                ガイドさんならツアーの紹介や集客の場に活用していただいても良いです。<br />
                                トレイルランナーの皆さんは大会レポでも大歓迎！<br />
                                私はこのサイトを老若男女問わず皆様と共に盛り上げたいと考えています。<br />
                                ぜひぜひ、ページ下部のお問合せページよりお気軽にお問い合わせください！！<br />
                                特に金銭等のやり取りは致しません。</p>
                        </div>
                    </div>
                </main>
                <Aside />
            </div>
        </>
    )



}