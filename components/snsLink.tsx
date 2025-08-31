import Link from "next/link";
import Image from "next/image";

export default function SnsLink() {
    return (
        <div className="bg-white rounded-3xl p-4">
            <div className="flex justify-center gap-12">
                <Link
                    href="https://x.com/YAMAORI0831"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/icons/x.svg"
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