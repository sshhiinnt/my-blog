
import Link from "next/link";
import Image from "next/image";
import NewArt from "components/newArticlecomp";



export const metadata = {
    title: "山で遊んでおります",
    description: "このブログは登山用品の紹介や山歩きをはじめとした、トレイルランニングやクライミング、雪山登山、沢登りの私の山行記録を日記的に記録している登山ブログです。"
}

export default function Home() {
    
    return (
        <>
            <header>
                <h1><Link href="/">山で遊んでおります</Link></h1><span
                    className="subtitle">登山・トレイルランニング・クライミング・等々のブログを発信しています</span>
            </header>

            <nav className="img-container">
                <Link href="">
                    <Image
                        src="/images/tozan.jpg"
                        alt="登山"
                        width={4000}
                        height={3000}
                        className="imglink"
                    /><span>山登り</span>
                </Link>
                <Link href="">
                    <Image
                        src="/images/tran.jpg"
                        alt="トレイルランニング"
                        width={1200}
                        height={800}
                        className="imglink"
                    /><span>トレイルランニング</span>
                </Link>
                <Link href="">
                    <Image
                        src="/images/climb.jpg"
                        alt="クライミング"
                        width={4000}
                        height={3000}
                        className="imglink"
                    /><span>クライミング</span>
                </Link>
                <Link href="">
                    <Image
                        src="/images/gear.jpg"
                        alt="装備について"
                        width={4000}
                        height={3000}
                        className="imglink"
                    /><span>装備</span>
                </Link>
                <Link href="">
                    <Image
                        src="/images/twee.jpg"
                        alt="つぶやき"
                        width={4000}
                        height={3000}
                        className="imglink"
                    /><span>つぶやき</span>
                </Link>
            </nav>

            <main>

                <NewArt />

                <aside>
                    <h3>カテゴリー</h3>
                    <ul>
                        <li>
                            山登り
                            <ul>
                                <li>山登り</li>
                                <li>沢登り</li>
                                <li>雪山登山</li>
                            </ul>
                        </li>
                        <li>
                            トレイルランニング
                            <ul>
                                <li>トレイルランニング</li>
                                <li>大会レポート</li>
                            </ul>
                        </li>
                        <li>
                            クライミング
                            <ul>
                                <li>リード</li>
                                <li>ボルダー</li>
                                <li>アルパイン</li>
                            </ul>
                        </li>
                        <li>
                            装備
                            <ul>
                                <li>登山靴・バックパック</li>
                                <li>テント伯装備</li>
                                <li>その他登山用品</li>
                                <li>トレイルランニング用品</li>
                                <li>クライミングシューズ・ギア</li>
                            </ul>
                        </li>
                        <li>
                            筆者のつぶやき
                        </li>
                    </ul>
                </aside>
            </main>
            <footer>
                <nav className="profiel">
                    <a href="C:\Users\Administrator\Desktop\yamaori\text.html\plof.html">-筆者について</a>
                    <a href="C:\Users\Administrator\Desktop\yamaori\text.html\contact.html">-お問い合わせはこちら</a>
                </nav>


                <p>-山で遊んでおります-</p>

            </footer>
        </>
    );
}
