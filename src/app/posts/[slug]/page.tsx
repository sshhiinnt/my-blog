import { connect } from "@/lib/mongodb";
import { cache } from "react";
import Post, { IPost } from "models/post";
import Category from "models/category";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown"
import Aside from "components/aside";
import rehypeRaw from "rehype-raw";
import rehypeMoshimo from "@/lib/rehype-moshimo";
import { ArticleSchema } from "components/structuredData";
import Image from "next/image";
import MoshimoLink from "components/moshimoLink";


interface Props {
    params: Promise<{ slug: string }>,
}

interface MoshimoSpanProps extends React.HTMLAttributes<HTMLSpanElement> {
    "data-moshimo"?: string;
}

const getPost = cache(async (slug: string) => {
    await connect();
    return Post.findOne({ slug }).lean<IPost | null>();
});

export async function generateMetadata({ params }: Props) {
    const { slug: slugStr } = await params;
    const slug = decodeURIComponent(slugStr);
    const post = await getPost(slug);

    if (!post) {
        return {}
    }

    return {
        title: `${post.title} | YAMAORI`,
        description: post.description || "記事の説明が表示されます。",
    };
}



export default async function postPage({ params }: Props) {
    const { slug: slugStr } = await params;
    const slug = decodeURIComponent(slugStr);
    const post = await getPost(slug);

    if (!post) {
        return notFound();
    }

    const category = await Category.findOne({ slug: post.category.slug })

    return (
        <>
            <ArticleSchema
                url={`https://yamaori.jp/posts/${post.slug}`}
                description={post.description}
                headline={post.title}
                image={post.thumbnailUrl}
                datePublished={new Date(post.createdAt).toISOString()}
                dateModified={new Date(post.updatedAt || post.createdAt).toISOString()}
            />
            <div className="flex md:flex-row justify-center bg-secondary">
                <div className="max-w-4xl w-full bg-white">
                    <div className="text-right text-gray-500">
                        <p>
                            投稿日：{new Date(post.createdAt).toLocaleString()}{""}
                        </p>
                        <p>
                            更新日：{new Date(post.updatedAt).toLocaleString()}{""}
                        </p>
                        <p>
                            {category && `カテゴリー：${category.name}`}
                        </p>
                    </div>
                    <h1 className="text-3xl font-bold text-center">{post.title}</h1>
                    <article className="prose prose-lg dark:prose-invert mx-auto p-4">
                        <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeMoshimo]}
                            components={{
                                span: ({ ...props }: MoshimoSpanProps) => {
                                    const product = props["data-moshimo"];
                                    if (product) {
                                        return <MoshimoLink product={product} />;
                                    }
                                    return <span {...props} />
                                },
                                img: ({ src, alt }) => {
                                    if (typeof src !== "string") return null;
                                    const url = src?.startsWith("/uploads") ? `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${src.replace(/^\/uploads\//, "")}` : src;
                                    const imgMeta = post.images?.find(img =>
                                        typeof src === "string" && src.includes(img.url.split("/").pop() || ""));
                                    return (<Image src={url} alt={alt || ""} width={imgMeta?.width || 800} height={imgMeta?.height || 600} />);
                                },
                            }}
                        >{post.content}</ReactMarkdown>

                    </article>


                </div>
                <Aside />
            </div >
        </>
    )
}

export async function generateStaticParams() {
    await connect();
    const posts = await Post.find().lean();
    return posts.map((post) => ({
        slug: encodeURIComponent(post.slug)
    }));
}