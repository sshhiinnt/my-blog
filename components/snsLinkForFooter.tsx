import Link from "next/link";
import Image from "next/image";

export default function SnsLinkForFooter() {
    return (
        <div className="bg-brand p-4 block md:hidden">
            <div className="flex justify-center gap-12">
                <Link
                    href="https://x.com/YAMAORI0831"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p>ｘ<br />（旧Twitter）-</p>
                    <Image
                        src="/icons/x_w.svg"
                        alt="x（旧Twitter）"
                        width={24}
                        height={24}
                        className="hover:scale-110 transition-transform"
                    />
                </Link>
                <Link
                    href="https://www.instagram.com/mt.yamaori/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p>Instagram</p>
                    <Image
                        src="/icons/instagram_w.svg"
                        alt="instagram"
                        width={24}
                        height={24}
                        className="hover:scale-110 transition-transform"
                    />
                </Link>
            </div>
        </div>
    )
}