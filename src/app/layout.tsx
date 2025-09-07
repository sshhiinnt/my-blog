import { Noto_Sans_Display } from "next/font/google"
import { RocknRoll_One } from "next/font/google"
import "./globals.css";
import Header from "components/headerComp";
import Footer from "components/footerComp";
import { Providers } from "./provider";
import CategoryLinkImage from "components/smCategoryLinkForFooter";



const notoSansDisplay = Noto_Sans_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font--notoSansDisplay",
});

const RocknRollOne = RocknRoll_One({
  subsets: ["latin"],
  weight: ["400",],
  variable: "--font--RocknRollOne",
});



export const metadata = {
  title: "YAMAORI",
  description: "このブログは登山用品の紹介や山歩きをはじめとした、トレイルランニングやクライミング、雪山登山、沢登りの私の山行記録を日記的に記録している登山ブログです。",
  applicationName: "山で遊ばせてもらっております",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="ja" className={`${notoSansDisplay.variable} ${RocknRollOne.variable}`}>
      <body className="dark:text-black">
        <Providers>
          <Header />
          <main>
            {children}
          </main>
          <CategoryLinkImage />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
