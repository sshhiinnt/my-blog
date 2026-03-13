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
        while (true) {
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
                                content: `以下の記事からInstagram用キャプションを作ってください。
    
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
                                    
                                    記事
                                    
                                    ${post.content.slice(0, 150)}
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

            const text = await res.text();
            console.log("API error:", text);

            if (text.includes("rate_limit")) {
                console.log("wating 6s...")
                await new Promise(r => setTimeout(r, 6000))
                continue
            }
            console.log("unknown error retrying...")
            await new Promise(r => setTimeout(r, 3000))
        }
    }
    for (const post of posts) {
        const caption = await generaterCaption(post);
        post.socialCaption = caption;
        await post.save();
        console.log("saved:", post.slug);
        await new Promise(r => setTimeout(r, 1000))
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