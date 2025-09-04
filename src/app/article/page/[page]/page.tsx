
import { connect } from "@/lib/mongodb";
import Post from "models/post";
import ArticleList from "components/articleList";
import Aside from "components/aside";
import { ObjectId } from "mongoose";
import { WebPageSchema } from "components/structuredData";


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
    params: Promise<{ page: string, basePath: string }>,
};


export async function generateMetadata({ params }: Props) {
    const { page } = await params;
    const currentPage = Number(page) || 1;
    const pageSize = 8;


    return {
        title: "登山・山行・登山用品についての記事一覧 | YAMAORI",
        description: `YAMAORIブログの登山・山行・登山用品についての記事一覧${currentPage > 1 ? `の${currentPage}ページ` : ""}ページ目です`,
        alternates: {
            canonical: currentPage === 1
                ? "https://yamaori.jp/article"
                : `https://yamaori.jp/article/page/${page}`,
        },
    };
}


export default async function ArticlePage({ params }: Props) {
    const { page } = await params;
    const currentPage = Number(page) || 1;
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
        climbDate: post.climbDate ? (post.climbDate as Date).toISOString() : null,
        area: post.area || "",
    }));

    const totalPage = Math.ceil(totalPosts / pageSize)
    return (
        <>
            <WebPageSchema
                url={`https://yamaori.jp/article/page/${page}`}
                name="登山・山行・登山用品についての記事一覧 | YAMAORI"
                description={`YAMAORIブログの登山・山行・登山用品についての記事一覧${currentPage > 1 ? `の${currentPage}ページ` : ""}ページ目です`}
                lastReviewed="2025-08-27T11:00:00Z"
                authorName="都市慎太郎"
            />
            <div className="flex justify-center bg-secondary">
                <main className="max-w-4xl w-full">
                    <article>
                        <ArticleList posts={posts} currentPage={currentPage} totalPage={totalPage} basePath="/article" />
                    </article>
                </main>
                <aside>
                    <Aside />
                </aside>
            </div>
        </>
    )

}

export async function generateStaticParams() {
    await connect();
    const totalPosts = await Post.countDocuments();
    const pageSize = 8;
    const totalPage = Math.ceil(totalPosts / pageSize);

    const params = [];
    for (let page = 2; page <= totalPage; page++) {
        params.push({ page: String(page) });
    }
    return params;
}