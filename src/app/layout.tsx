import { RocknRoll_One , Shippori_Mincho_B1 } from "next/font/google"
import type { Metadata } from "next";
import "./globals.css";
import "./styles/style.css";
import Header from "components/header";


export const metadata: Metadata = {
  title: "山で遊んでおります",
  description: "このブログは登山用品の紹介や山歩きをはじめとした、トレイルランニングやクライミング、雪山登山、沢登りの私の山行記録を日記的に記録している登山ブログです。",
  applicationName: "YAMAORI"
};

const RocknRoll = RocknRoll_One({
  weight: ["400"],
  display: "swap",
  subsets: ["latin",],
});

const Shippori = Shippori_Mincho_B1({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${RocknRoll.className} ${Shippori.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
