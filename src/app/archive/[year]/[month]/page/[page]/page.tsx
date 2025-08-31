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
    params: Promise<{
        year: string,
        month: string,
        page?: string,
        basePath: string,
    }>,
};
export default async function ArchivePage({ params }: Props) {
    const { year: yearStr, month: monthStr, page } = await params;

    const year = Number(yearStr);
    const month = Number(monthStr);
    const currentPage = Number(page) || 1;
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
                url={`https://yamaori.jp/archive/${year}/${String(month).padStart(2, "0")}${currentPage > 1 ? `/page/${currentPage}` : ""}`}
                name="YAMAORIブログのアーカイブページ"
                description={`${year}年${month}月に投稿されたYAMAORIブログの記事一覧${currentPage > 1 ? `の${currentPage}ページ` : ""}目です。(全${totalPosts}件)。`}
                lastReviewed="2025-08-27T11:00:00Z"
                authorName="都市慎太郎"
            />
            <div className="flex justify-center bg-secondary">
                <main className="max-w-4xl w-full">
                    <article>
                        <h2 className="text-2xl font-bold text-center mt-4">{year}年/{month}月</h2>
                        <ArticleList posts={posts} currentPage={currentPage} totalPage={totalPage} basePath={`/archive/${year}/${month}`} />
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

    const posts = await Post.find({ climbDate: { $ne: null } }).lean();

    const archiveSet = new Set<string>();
    posts.forEach((p) => {
        if (p.climbDate) {
            const date = new Date(p.climbDate);
            const year = date.getUTCFullYear();
            const month = date.getUTCMonth() + 1;
            archiveSet.add(`${year}-${month}`);
        }
    });

    const params = Array.from(archiveSet).map((ym) => {
        const [year, month] = ym.split("-");
        return { year, month };
    });
    return params;
}
