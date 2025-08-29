import Head from "next/head";


interface ArticleSchemaProps {
    url: string,
    description?: string,
    headline?: string,
    image?: string,
    datePublished?: string,
    dateModified?: string,
    authorName?: string,
}


interface WebPageSchemaProps {
    url: string;
    name: string;
    description?: string;
    lastReviewed: string;
    authorName?: string;
}

interface ContactPageSchemaProps {
    url: string;
    name: string;
    description?: string;
    lastReviewed: string;
    authorName?: string;
    contactEmail?: string;
}

interface ProfilePageSchemaProps {
    url: string;
    name: string;
    image?: string;
    description?: string;
    lastReviewed: string;
    authorName?: string;
    sameAs?: string[];
}

export function ArticleSchema({
    url,
    description,
    headline,
    image,
    datePublished,
    dateModified,
    authorName = "都市慎太郎",
}: ArticleSchemaProps) {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Article",
        "mainEntityOfPage": url,
        "publisher": {
            "@type": "BlogPosting",
            "name": "YAMAORIブログ",
            "logo": { "@type": "ImageObject", "url": "https://yamaori.jp/images/yamaori_logo.png" },
        },
        "author": { "@type": "Person", "name": authorName }
    };
    if (headline) schema.headline = headline;
    if (description) schema.description = description;
    if (image) schema.image = image;
    if (datePublished) schema.datePublished = datePublished;
    if (dateModified) schema.dateModified = dateModified;

    return (
        <Head>
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </Head>
    );
}

export function WebPageSchema({
    url,
    name,
    description,
    lastReviewed,
    authorName = "都市慎太郎",
}: WebPageSchemaProps) {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": url,
        "name": name,
        "author": {
            "@type": "Person",
            "name": authorName,
        },
        "publisher": {
            "@type": "Organization",
            "name": "YAMAORI",
            "logo": {
                "@type": "ImageObject",
                "url": "https://yamaori.jp/images/yamaori_logo.png",
            }
        },
        "lastReviewed": lastReviewed,

    };
    if (description) schema.description = description;

    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </Head>
    );
};

export function ContactPageSchema({
    url,
    name,
    description,
    lastReviewed,
    authorName = "都市慎太郎",
    contactEmail,
}: ContactPageSchemaProps) {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "url": url,
        "name": name,
        "author": {
            "@type": "Person",
            "name": authorName,
        },
        "publisher": {
            "@type": "Organization",
            "name": "YAMAORI",
            "logo": {
                "@type": "ImageObject",
                "url": "https://yamaori.jp/images/yamaori_logo.png",
            }
        },
        "lastReviewed": lastReviewed,
    };
    if (description) schema.description = description;
    if (contactEmail) schema.contactPoint = {
        "@type": "ContactPoint",
        email: contactEmail,
        contactType: "customer support",
    }

    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </Head>
    );
};

export function ProfilePageSchema({
    url,
    name,
    description,
    lastReviewed,
    authorName = "都市慎太郎",
    sameAs,
}: ProfilePageSchemaProps) {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "url": url,
        "name": name,
        "lastReviewed": lastReviewed,
        "description": "YAMAORIは登山やアウトドアに関する情報を発信するブログブランドです。",
        "mainEntity": {
            "@type": "Organization",
            "name": "YAMAORI",
            "url": "https://yamaori.jp",
            "logo": {
                "@type": "ImageObject",
                "url": "https://yamaori.jp/images/yamaori_logo_png"
            },
            "founder": {
                "@type": "Person",
                "name": "都市慎太郎",
            },
        },
        "publisher": {
            "@type": "Organization",
            "name": "YAMAORI",
            "logo": {
                "@type": "ImageObject",
                "url": "https://yamaori.jp/images/yamaori_logo.png",
            }
        },
    };
    if (description?.length) schema.description = description;
    if (authorName?.length) schema.author = { "@type": "Person", "name": authorName };
    if (sameAs?.length) schema.sameAs = sameAs;


    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </Head>
    );
};

