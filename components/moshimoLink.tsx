import Image from "next/image";
import Link from "next/link";


type Props = {
    amazon: string,
    rakuten: string,
    yahoo: string,
    imageUrl?: string,
    name?: string,
};

export default function MoshimoLink({ amazon, rakuten, yahoo, imageUrl, name }: Props) {
    return (
        <div>
            {imageUrl && (
                <Image src={imageUrl} alt={name || "商品画像"} />
            )}
            <div>
                {name && <h3>{name}</h3>}
                <div>
                    {amazon && (
                        <Link href={amazon} target="_blank" rel="noopener noreferrer">Amazon</Link>
                    )}
                    {rakuten && (
                        <Link href={amazon} target="_blank" rel="noopener noreferrer">楽天</Link>
                    )}
                    {yahoo && (
                        <Link href={amazon} target="_blank" rel="noopener noreferrer">Yahoo!</Link>
                    )}
                </div>
            </div>
        </div>
    )
}