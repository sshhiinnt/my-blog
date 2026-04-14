import { Noto_Sans_Display } from "next/font/google"
import { RocknRoll_One } from "next/font/google"
import "./globals.css";
import Header from "components/headerComp";
import Footer from "components/footerComp";
import { Providers } from "./provider";
import CategoryLinkImage from "components/categoryLinkImage";
import Script from "next/script";



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
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-YZH9KCX97E"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YZH9KCX97E');
          `}
        </Script>
        <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3008954899847844"
          strategy="afterInteractive"
          crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-3008954899847844"></meta>
      </head>
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
