
import { connect } from "@/lib/mongodb";
import Post from "models/post";
import ArticleList from "components/articleList";
import Aside from "components/aside";
import { ObjectId } from "mongoose";

type Post = {
    _id: string;
    title: string;
    content: string;
    slug: string;
    thumbnailUrl: string;
    category: {
        name: string;
        slug: string;
        group: string;
    };
    createdAt: string;
    updatedAt: string;
    climbDate: string | null;
    area: string;
};

type Props = {
    params: { page: string },
};


export default async function ArticlePage({ params }: Props) {
    const currentPage = Number(params.page) || 1;
    const pageSize = 8;

    await connect();

    const totalPosts = await Post.countDocuments();

    const postsFromDb = await Post.find()
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize)
        .lean();

    const posts: Post[] = postsFromDb.map(post => ({
        _id: (post._id as ObjectId).toString(),
        title: post.title,
        content: post.content,
        slug: post.slug,
        thumbnailUrl: post.thumbnailUrl,
        category: {
            name: post.category.name,
            slug: post.category.slug,
            group: post.category.group,
        },
        createdAt: (post.createdAt as Date).toISOString(),
        updatedAt: (post.updatedAt as Date).toISOString(),
        climbDate: post.climbDate ? (post.climbDate as Date).toLocaleString() : null,
        area: post.area || "",
    }));

    const totalPage = Math.ceil(totalPosts / pageSize)
    return (
        <div className="flex justify-center bg-secondary">
            <main className="max-w-4xl w-full">
                <article>
                    <ArticleList posts={posts} currentPage={currentPage} totalPage={totalPage} />
                </article>
            </main>
            <aside>
                <Aside />
            </aside>
        </div>
    )

}