import { connect } from "@/lib/mongodb";
import ArticleList from "components/articleList";
import Aside from "components/aside";
import Post from "models/post";
import { ObjectId } from "mongoose";
import { WebPageSchema } from "components/structuredData";


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
    params: {
        year: string,
        month: string,
        page?: string,
    },
};
export default async function ArchivePage({ params }: Props) {
    const year = Number(params.year);
    const month = Number(params.month);
    const currentPage = Number(params.page) || 1;
    const pageSize = 8;

    await connect();

    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 1));

    const filter = {
        climbDate: { $gte: startDate, $lt: endDate }
    };

    const totalPosts = await Post.countDocuments(filter);

    const postsFromDb = await Post.find(filter)
        .sort({ climbDate: -1 })
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize)
        .lean();

    console.log("postsFromDb sample:", postsFromDb[0]);

    const posts: Post[] = postsFromDb.map((p) => ({
        _id: (p._id as ObjectId).toString(),
        title: p.title,
        content: p.content,
        slug: p.slug,
        thumbnailUrl: p.thumbnailUrl,
        category: {
            name: p.category.name,
            slug: p.category.slug,
            group: p.category.group,
        },
        createdAt: (p.createdAt as Date).toISOString(),
        updatedAt: (p.updatedAt as Date).toISOString(),
        climbDate: p.climbDate ? (p.climbDate as Date).toISOString().split("T")[0] : null,
        area: p.area || "",
    }));


    const totalPage = Math.ceil(totalPosts / pageSize);

    return (
        <>
            <WebPageSchema
                url={`https://yamaori.jp/archive/${year}/${String(month).padStart(2, "0")}`}
                name="YAMAORIブログのアーカイブページ"
                description={`${year}年${month}月に投稿されたYAMAORIブログの記事一覧です(全${totalPosts}件)。`}
                lastReviewed="2025-08-27T11:00:00Z"
                authorName="都市慎太郎"
            />
            <div className="flex justify-center bg-secondary">
                <main className="max-w-4xl w-full">
                    <article>
                        <h2 className="text-2xl font-bold text-center mt-4">{year}年/{month}月</h2>
                        <ArticleList posts={posts} currentPage={currentPage} totalPage={totalPage} />
                    </article>
                </main>
                <aside>
                    <Aside />
                </aside>
            </div>
        </>
    )

}
