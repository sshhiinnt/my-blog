import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

type Post = {
    _id: string;
    title: string;
    content: string;
    slug: string;
    thumbnailUrl: string;
    category: {
        name: string,
        slug: string,
        group: string,
    }
    createdAt: string;
    updatedAt: string;
    climbDate: string | null;
    area: string
};

type Props = {
    page?: number;

};


const NewArticle = async ({ }: Props) => {
    let posts: Post[] = [];

    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URLが設定されていません")

        const res = await fetch(`${baseUrl}/api/posts`);
        console.log("fetch:", res.ok);
        if (!res.ok) {
            console.error("Fetch failed:", res.statusText);
        } else {
            const data = await res.json();
            console.log(data);
            posts = data.posts ?? [];
        }

    } catch (err) {
        console.error("Fetch error:", err);
    }



    if (posts.length === 0) {
        return (
            <p>記事が見つかりませんでした</p>
        )
    }
    return (
        <main className="bg-surface max-w-4xl w-full">
            <h2 className="font-bold text-3xl text-accent text-center my-16">ー　新着記事　ー</h2>
            <ul className="flex flex-col md:grid grid-cols-2 gap-16 mx-16">
                {posts.map((post) => (
                    <li key={post._id} className="flex flex-col bg-white w-full p-4">
                        <div>
                            {post.thumbnailUrl && (
                                <Link href={`/posts/${post.slug}`}>
                                    <div className="w-full aspect-video mx-auto mt-4 relative">
                                        <Image
                                            src={post.thumbnailUrl}
                                            alt={post.title}
                                            fill
                                            className="object-cover rounded "
                                        />
                                    </div></Link>
                            )}
                        </div>
                        <div className="pt-4 p-1">
                            <h3 className="text-xl font-bold hover:opacity-70 "><Link href={`/posts/${post.slug}`}>{post.title}</Link></h3>
                            <div className="gap-4">
                                <p className="text-gray-500 hover:opacity-70"><Link href={`/categories/${post.category.group}/${post.category.slug}`}>・{post.category.name}</Link></p>
                            </div>
                            <p className="text-sm">{post.climbDate ? new Date(post.climbDate).toISOString().split("T")[0] : "未設定"}</p>
                            <div className="text-sm">
                                <ReactMarkdown>
                                    {post.content.slice(0, 50) + "......"}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </li>

                ))}
            </ul>
            <div className="flex m-16 justify-center">
                <Link href={`/article/page/1`} className="bg-accent text-text text-xl font-bold py-1 px-4 border rounded-3xl mb-4 items-center">ー　もっと見る　ー</Link>
            </div>
        </main >
    )
}

export default NewArticle;