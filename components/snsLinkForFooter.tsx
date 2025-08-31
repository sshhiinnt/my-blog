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
                    <Image
                        src="/icons/x.svg"
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
                    <Image
                        src="/icons/instagram.svg"
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