import { connect } from "@/lib/mongodb";
import Post from "../../../../../models/post";
import mongoose from "mongoose";

interface Params {
    params: { id: string };
}

export const revalidate = 10;

export default async function PostDetailPage({ params }: Params) {
    try {
        await connect();
        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return <p>無効な記事IDです</p>;
        }




        const post = await Post.findById(params.id).lean();



        if (!post) {
            return <p>記事が見つかりませんでした</p>;
        }

        return (
            <main>
                <h1>{post.title}</h1>
                <article>{post.content}</article>
            </main>
        );
    } catch (error) {
        console.log("データ取得エラー:", error);
        return <p>申し訳ございません。サーバーエラーが発生しました</p>
    }


}