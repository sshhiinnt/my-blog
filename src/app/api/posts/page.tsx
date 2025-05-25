import { connect } from "@/lib/mongodb";
import Post from "../../../../models/post";

export const revalidate = 10;

export default async function PostPage() {
    await connect();
    const posts = await Post.find().sort({ createdAt: -1 }).lean();

    return (
        <main>
            <h1>記事一覧</h1>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <a href="{`/posts/${post._id}`}">{post.title}</a>
                    </li>
                ))}
            </ul>
        </main>
    )
}