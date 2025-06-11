
export const metadate = {
    title: "お問い合わせ",
    description: "YAMAORI筆者へのお問い合わせページです。記事のご不明点や何かご依頼がある場合はこちらのページを利用してください",
};

export default function Contact() {
    return (
        <main className="contactMain">
            <h1 className="contactH1">氏名</h1>
            <form action="" method="post" name="username">
                <input type="text" placeholder="姓 名" className="contactInput" />
            </form>
            <h1 className="contactH1">メールアドレス</h1>
            <form action="" method="post" name="email">
                <input type="text" placeholder="       @          " className="contactInput" />
            </form>
            <h1 className="contactH1">お問い合わせ内容</h1>
            <form action="" method="post" name="contact-form">
                <textarea name="" id="contact-form"></textarea>
            </form>

            <p>返信にお日にちをいただく場合がございますが、</p>
            <p>何卒、ご容赦くださいませ。</p>


        </main>
    )
}