import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
console.log("ENV", process.env.MONGODB_URI);

type Post = {
    title: string;
    description: string;
    content: string;
    thumbnail: string;
    category: string;
    climbDate: string | null;
    area: string;
    socialCaption: string;
};

async function main() {

    const { connect } = await import("../src/lib/mongodb");
    const Post = (await import("../models/post")).default;

    await connect();

    const posts = await Post.find({
        $or: [
            { socialCaption: { $exists: false } },
            { socialCaption: "" },
            { socialCaption: null },


        ]
    });

    async function generaterCaption(post: Post) {
        let retry = 0;
        while (retry < 5) {
            const res = await fetch(
                "https://api.groq.com/openai/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: "llama-3.1-8b-instant",
                        messages: [
                            {
                                role: "system",
                                content: "あなたはブログ記事のSNSキャプションを作る編集者です"
                            },
                            {
                                role: "user",
                                content:
                                    `以下の記事からInstagram用キャプションを作ってください。

                                記事内容
                                ${post.content.slice(0, 120)}

                                タスク1:Instagram向けの一行詩的キャプションを作成。
    
                                    条件
                                    ・詩的一行
                                    ・英語訳
                                    ・40文字以内
                                    ・説明禁止
                                    ・その下にSEOハッシュタグを日本語と英語6個ずつ
    
                                    形式
    
                                    キャプション
                                    キャプション英語訳
    
                                    #タグ1 #タグ2 #タグ3 #タグ4 #タグ5 #タグ6
                                    #tag1 #tag2 #tag3 #tag4 #tag5 #tag6

                                    タスク2:SEO説明文を作成
                                    ・50~120文字
                                    ・記事内容を自然に説明
                                    ・重要キーワード（山名、場所、花、季節、登山ルート）を必ず含む
                                    ・検索ユーザー向けの文章

                                    形式

                                    タスク1の生成文章

                                    タスク2のSEO説明文

                                    
                                    `
                            }
                        ],
                        temperature: 0.7
                    })
                });
            if (res.ok) {
                const data = await res.json();
                return data?.choices?.[0]?.message?.content ?? "";
            }

            if (!res.ok) {
                const text = await res.text();
                console.log("API error:", text);
                const match = text.match(/try again in\s*([0-9.]+)s/i);

                if (match) {
                    const wait = Math.ceil(parseFloat(match[1]) * 1000);
                    console.log(`waiting ${wait} ms...`);
                    await new Promise(r => setTimeout(r, wait));
                    continue;
                }
                continue;
            }

            console.log("unknown error retrying...")
            await new Promise(r => setTimeout(r, 15000))
            retry++;
        }
        return "";
    }
    for (const post of posts) {
        const caption = await generaterCaption(post);
        post.socialCaption = caption;
        await post.save();
        console.log("saved:", post.slug);
        await new Promise(r => setTimeout(r, 10000))
    }
}

main()
    .then(() => {
        console.log("done");
        process.exit(0);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });