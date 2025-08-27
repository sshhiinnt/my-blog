import Aside from "components/aside";
import Image from "next/image";
import { ProfilePageSchema } from "components/structuredData";

export const metadata = {
    title: "筆者について",
    description: "YAMAORI管理人のプロフィールです"
};

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
            <div className="flex justify-center bg-secondary">
                <main className="bg-accentry max-w-4xl w-full rounded-3xl my-4">
                    <h2 className="font-bold text-3xl text-center py-4">Profile</h2>
                    <div className=" flex flex-col items-center">
                        <Image
                            src="/images/plof.JPG"
                            width={2108} height={2107}
                            alt="YAMAORI筆者のプロフィール写真"
                            className="size-96 rounded-3xl" />
                        <Image
                            src="/images/plofActive.png"
                            width={468} height={259}
                            alt="山での活動中の写真"
                            className="rounded-3xl my-4" />
                        <div className="pt-4 text-center">
                            <p className="text-lg">元登山用品店店員</p>
                            <p className="text-lg">四季を通して、山歩きやトレイルランニング、クライミング、沢登り等を楽しんでいます。</p>
                            <p className="text-lg">このブログでは、私の登山記録や店員時代の知識を元に山に関する様々な最新情報を発信します。</p>
                        </div>
                    </div>
                </main>
                <Aside />
            </div>
        </>
    )



}