import { connect } from "@/lib/mongodb";
import ArticleList from "components/articleList";
import Aside from "components/aside";
import Post from "models/post";
import { ObjectId } from "mongoose";
import { FilterQuery } from "mongoose";
import { WebPageSchema } from "components/structuredData";
import { notFound } from "next/navigation";



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
        slug: string,
        page?: string,
        basePath: string,
    }>,
};

const areaMap: Record<string, string> = {
    kyushu: "九州",
    shikoku: "四国",
    chugoku: "中国地方",
    kinki: "近畿地方",
    chubu: "中部地方",
    north_alps: "北アルプス",
    central_alps: "中央アルプス",
    south_alps: "南アルプス",
    kanto: "関東",
    tohoku: "東北",
    hokkaido: "北海道",
}

export async function generateMetadata({ params }: Props) {
    const { slug: slugStr, page } = await params;

    const slug = slugStr;
    const area = areaMap[slug];

    if (!area) {
        return notFound();
    }

    const currentPage = Number(page) || 1;



    await connect();


    const filter: FilterQuery<Post> = { area };


    const totalPosts = await Post.countDocuments(filter);




    return {
        title: `${area}エリアの活動記事一覧 | YAMAORI`,
        description: `${area}エリアでの登山・山行・登山用品についての記事一覧${currentPage > 1 ? `の${currentPage}ページ` : ""}目です。(全${totalPosts}件)。`,
        alternates: {
            canonical: `https://yamaori.jp/area/${slug}${currentPage > 1 ? `/page/${currentPage}` : ""}`,
        },
    };
}



export default async function AreaPage({ params }: Props) {
    const { slug: slugStr, page } = await params;

    const slug = slugStr;
    const area = areaMap[slug];

    if (!area) {
        return notFound();
    }

    const currentPage = Number(page) || 1;
    const pageSize = 8;



    await connect();


    const filter: FilterQuery<Post> = { area };


    const totalPosts = await Post.countDocuments(filter);

    const postsFromDb = await Post.find(filter)
        .sort({ climbDate: -1 })
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize)
        .lean();
    console.log(postsFromDb);


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

    console.log("slug:", slug);
    console.log("mapped area:", area);
    const sample = await Post.findOne({ area }).lean();
    console.log("サンプル記事:", sample);

    return (
        <>
            <WebPageSchema
                url={`https://yamaori.jp/area/${slug}${currentPage > 1 ? `/page/${currentPage}` : ""}`}
                name={`${area}エリアの登山・山行・登山用品についての記事一覧 | YAMAORI`}
                description={`${area}エリアでの登山・山行・登山用品についての記事一覧${currentPage > 1 ? `の${currentPage}ページ` : ""}目です。(全${totalPosts}件)。`}
                lastReviewed="2025-08-27T11:00:00Z"
                authorName="都市慎太郎"
            />
            <div className="flex justify-center bg-secondary">
                <main className="max-w-4xl w-full">
                    <article>
                        <h2 className="text-2xl font-bold text-center mt-4">{area}の記事</h2>
                        <ArticleList posts={posts} currentPage={currentPage} totalPage={totalPage} basePath={`/area/${slug}`} />
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

    const areas = Object.keys(areaMap);
    const params: { slug: string, page?: string }[] = []

    for (const slug of areas) {
        const area = areaMap[slug];

        const totalPosts = await Post.countDocuments({ area });
        const pageSize = 8;
        const totalPages = Math.ceil(totalPosts / pageSize);

        for (let page = 2; page <= totalPages; page++) {
            params.push({
                slug,
                page: String(page),
            });
        }
    }
    return params;

}

