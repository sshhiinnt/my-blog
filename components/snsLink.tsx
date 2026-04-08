import Link from "next/link";
import Image from "next/image";

export default function SnsLink() {
    return (
        <div className="bg-white rounded-3xl p-4">
            <div className="flex justify-center gap-12">
                <Link
                    href="https://www.youtube.com/@%E5%B1%B1%E3%81%A7%E9%81%8A%E3%81%B0%E3%81%9B%E3%81%A6%E3%82%82%E3%82%89%E3%81%A3%E3%81%A6%E3%81%8A%E3%82%8A%E3%81%BE%E3%81%99"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/icons/youtube.svg"
                        alt="x（旧Twitter）"
                        width={36}
                        height={36}
                        className="hover:scale-110 transition-transform"
                    />
                </Link>
                <Link
                    href="https://www.instagram.com/mt.yamaori/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/icons/instagram.svg"
                        alt="instagram"
                        width={36}
                        height={36}
                        className="hover:scale-110 transition-transform"
                    />
                </Link>
            </div>
        </div>
    )
}