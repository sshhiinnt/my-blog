'use client';
import { useState } from "react";
import Image from "next/image";


interface Props {
    src: string,
    alt?: string,
}

export default function MarkdownImage({ src, alt }: Props) {
    const [size, setSize] = useState<{ width: number; height: number } | null>(null);

    return (
        <span
            className="inline-block align-middle relative"
            style={{
                width: size?.width ?? "auto",
                height: size?.height ?? "auto",
            }}
        >
            <Image
                src={src}
                alt={alt || ""}
                fill
                className="object-contain"
                onLoad={(e) => {
                    const img = e.currentTarget;
                    setSize({ width: img.naturalWidth, height: img.naturalHeight });
                }}
            />
        </span>
    );
}