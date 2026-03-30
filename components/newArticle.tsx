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
            <h2 className="font-bold text-3xl text-accent text-center my-4">"新着記事"</h2>
            <ul className="flex flex-col items-center">
                {posts.map((post) => (
                    <li key={post._id} className="flex flex-col md:flex-row bg-white md:w-[750px] w-full px-4 my-4">
                        <div>
                            {post.thumbnailUrl && (
                                <Link href={`/posts/${post.slug}`}>
                                    <div className="w-full md:w-[360px] aspect-video mx-auto mt-4 md:m-4 relative">
                                        <Image
                                            src={post.thumbnailUrl}
                                            alt={post.title}
                                            fill
                                            className="object-cover rounded "
                                        />
                                    </div></Link>
                            )}
                        </div>
                        <div className="flex-wrap p-4">
                            <div className="flex-wrap gap-4">
                                <p className="text-sm text-gray-500 hover:opacity-70"><Link href={`/categories/${post.category.group}/${post.category.slug}`}>{post.category.name}</Link></p>
                            </div>
                            <p className="font-bold">日付:{post.climbDate ? new Date(post.climbDate).toISOString().split("T")[0] : "未設定"}</p>
                            <h3 className="md:text-2xl text-xl font-bold hover:opacity-70 "><Link href={`/posts/${post.slug}`}>{post.title}</Link></h3>
                            <div>
                                <ReactMarkdown>
                                    {post.content.slice(0, 50) + "......"}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </li>

                ))}
                <Link href={`/article/page/1`} className="bg-accent text-text text-xl font-bold py-1 px-4 border rounded-3xl mb-4">"もっと見る"</Link>
            </ul>
        </main >
    )
}

export default NewArticle;