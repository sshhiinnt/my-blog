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
            { socialCaption: { $exists: true } },
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

                                タスク1：SEO記事要約を作成。
    
                                    条件
                                    ・「YAMAORIです。」から開始
                                    ・説明的ではなく、体験ベースで簡潔に書く
                                    ・記事内の山名・山域名は必ず含める
                                    ・検索キーワード（登山ルート名・難易度・地名）を自然に含める
                                    ・最後にブログへの誘導を1文入れる（例：「詳細はプロフィールのリンクから」）
                                    ・SEOハッシュタグ6個（山名+エリア+登山系ワードを混ぜる）
                                    ・全体は120〜180文字程度

                                    タスク2:ブログ本文を英語で2行で要約。
                                    ・検索ユーザー向けに自然な英語
                                    ・山名・ルート名を含める
                                    ・簡潔に
                                    ・タスク2：英語ハッシュタグ3個

                                    生成形式
    
                                    タスク1の要約文

                                    タスク2の要約文

                                    タスク1で生成したハッシュタグ
                                    #タグ1 #タグ2 #タグ3 #タグ4 #タグ5 #タグ6

                                    タスク2で生成したハッシュタグ
                                    #tag1 #tag2 #tag3

                                    
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