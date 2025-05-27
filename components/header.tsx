import Link from "next/link";

const Header = () => {
    return (
        <header>
            <h1><Link href="/">山で遊んでおります</Link></h1><span
                className="subtitle">登山・トレイルランニング・クライミング・等々のブログを発信しています</span>
        </header>
    )
};

export default Header;