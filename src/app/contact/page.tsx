import Aside from "components/aside";
import ContactForm from "components/contactForm";
import { ContactPageSchema } from "components/structuredData";





export async function generateMetadata() {
    return {
        title: "YAMAORI管理人へのお問い合わせ",
        description: "YAMAORI管理人へのお問い合わせフォームです",
        alternates: {
            canonical: "https://yamori.jp/contact",
        },
    };
}

export default function Contact() {
    return (
        <>
            <ContactPageSchema
                url="https://yamaori.jp/contact"
                name="YAMAORI管理人"
                description="YAMAORI管理人へのお問い合わせページです。記事のご不明点やご依頼がある場合はこちらのページを利用してください"
                lastReviewed="2025-08-26T15:00:00.000Z"
                authorName="都市慎太郎"
                contactEmail="rftfaq@gmail.com"
            />
            <div className="flex justify-center bg-secondary p-4">
                <main className="max-w-4xl w-full bg-accentry rounded-3xl p-1">
                    <h1 className="font-bold">お問い合わせ</h1>
                    <ContactForm />
                    <p> 返信にお日にちをいただく場合がございますが、</p>
                    <p> 何卒、ご容赦くださいませ。</p>
                </main>
                <Aside />
            </div>

        </>
    )
}