import { connect } from "@/lib/mongodb";
import ArticleList from "components/articleList";
import Aside from "components/aside";
import Post from "models/post";
import { ObjectId } from "mongoose";
import { WebPageSchema } from "components/structuredData";
import Category from "models/category";
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
        groupName: string,
        categorySlug: string,
        page: string,
        basePath: string,
    }>,
};

export async function generateMetadata({ params }: Props) {
    const { groupName: groupNameStr, categorySlug: categorySlugStr, page } = await params;
    const groupName = decodeURIComponent(groupNameStr);
    const categorySlug = decodeURIComponent(categorySlugStr);
    const currentPage = Number(page) || 1;
    const pageSize = 8;
    const totalPosts = await Post.countDocuments({ "category.slug": categorySlug });
    const totalPage = Math.ceil(totalPosts / pageSize);



    const category = (await Category.findOne({ slug: categorySlug }).lean()) as
        | {
            name: string;
            slug: string;
            group: string;
        } | null;

    if (!category) {
        return notFound();
    }



    return {
        title: `YAMAORIブログの${category.name}カテゴリ記事一覧`,
        description: `YAMAORIブログの${category.name}に属する記事一覧${currentPage > 1 ? `の${currentPage}ページ` : ""}目です`,
        alternates: {
            canonical: `https://yamaori.jp/categories/${groupName}/${categorySlug}${currentPage > 1 ? `/page/${currentPage}` : ""}`,
        },
    };
}


export default async function CategoryPage({ params }: Props) {
    const { groupName: groupNameStr, categorySlug: categorySlugStr, page } = await params;

    const groupName = decodeURIComponent(groupNameStr);
    const categorySlug = decodeURIComponent(categorySlugStr);
    const currentPage = Number(page) || 1;
    const pageSize = 8;

    await connect();

    const category = (await Category.findOne({ slug: categorySlug }).lean()) as
        | {
            name: string;
            slug: string;
            group: string;
        } | null;

    if (!category) {
        return notFound();
    }


    const totalPosts = await Post.countDocuments({ "category.slug": categorySlug });


    const postsFromDb = await Post.find({
        "category.slug": categorySlug
    })
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize)
        .lean();


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
                url={`https://yamaori.jp/categories/${groupName}/${categorySlug}${currentPage > 1 ? `/page/${currentPage}` : ""}`}
                name={`YAMAORIブログの${category.name}カテゴリ記事一覧`}
                description={`YAMAORIブログの${category.name}に属する記事一覧${currentPage > 1 ? `の${currentPage}ページ` : ""}目です`}
                lastReviewed="2025-08-27T11:00:00Z"
                authorName="都市慎太郎"
            />
            <div className="flex justify-center bg-secondary">
                <main className="max-w-4xl w-full">
                    <article>
                        <h2 className="text-2xl font-bold text-center mt-4">{category!.name}</h2>
                        <ArticleList posts={posts} currentPage={currentPage} totalPage={totalPage} basePath={`/categories/${groupName}/${categorySlug}`} />
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
    const categories = await Category.find().lean();

    const params: { groupName: string, categorySlug: string, page?: string }[] = [];

    for (const cat of categories) {
        const totalPosts = await Post.countDocuments({ "category.slug": cat.slug });
        const pageSize = 8;
        const totalPage = Math.ceil(totalPosts / pageSize);

        for (let page = 2; page <= totalPage; page++) {
            params.push({
                groupName: encodeURIComponent(cat.group),
                categorySlug: encodeURIComponent(cat.slug),
                page: String(page),
            });
        }
    }
    return params;
}


