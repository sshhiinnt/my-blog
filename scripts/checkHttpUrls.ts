import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { connect } from "../src/lib/mongodb";
import Post from "../models/post";

async function main() {
    await connect();

    const posts = await Post.find({}, { title: 1, content: 1 });

    const report: Record<string, string[]> = {};

    for (const post of posts) {
        const { title, content } = post;

        const matches = content.match(/http:\/\/[^\s)"]+/g);
        if (matches && matches.length > 0) {
            report[title] = matches;
        }
    }

    if (Object.keys(report).length > 0) {
        console.log("HTTP URL が見つかりました:");
        console.table(report);
    } else {
        console.log("HTTP URL は見つかりませんでした");
    }

    process.exit(0);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
