import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import Post from "models/post";
import Category from "models/category";


export async function GET() {
    await connect();

    const posts = await Post.find({}, { slug: 1, updatedAt: 1 }).lean();
    const categories = await Category.find({}, { slug: 1 }).lean();

    const baseUrl = "https://yamaori.jp";

    const postUrls = posts.map(post => `
        <url>
            <loc>${baseUrl}/posts/${encodeURIComponent(post.slug)}</loc>
            <lastmod>${new Date(post.updatedAt || new Date()).toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
    `).join("");

    const categoryUrl = categories.map(cat => `
        <url>
            <loc>${baseUrl}/categories/${encodeURIComponent(cat.slug)}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
        </url>
    `).join("");


    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${baseUrl}</loc>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>
        ${postUrls}
        ${categoryUrl}
    </urlset>`;

    return new NextResponse(xml, {
        headers: { "Content-Type": "application/xml" }
    });
}