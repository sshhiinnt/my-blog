const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });
const fs = require("fs");
const csv = require("csv-parser");
const { MongoClient } = require("mongodb");


const csvPath = path.join(__dirname, "/data/products.csv");
const joinPath = path.join(__dirname, "/data/moshimoProducts.json");


const products = {};


async function loadCSV() {
    return new Promise((resolve, reject) => {

        fs.createReadStream(csvPath)
            .pipe(csv())
            .on("data", (row) => {
                console.log("DEBUG row keys:", Object.keys(row));
                const name = row["商品名"].trim();
                products[name] = {
                    amazon: row["Amazon"]?.trim() || null,
                    rakuten: row["Rakuten"]?.trim() || null,
                    yahoo: row["Yahoo"]?.trim() || null,
                    imageUrl: row["画像URL"]?.trim() || null,
                };
            })
            .on("end", () => {
                fs.writeFileSync(joinPath, JSON.stringify(products, null, 2));
                console.log("CSVからJSONに変換完了:", Object.keys(products).length, "商品");
                resolve();
            })
            .on("error", reject);
    });
}

async function updateMarkdown() {
    const client = new MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("myBlog");
    const articles = await db.collection("posts").find({}).toArray();

    for (const article of articles) {
        const productInPost = [];

        const updateContent = article.content.replace(/TODO:\s*([^\n]+)/g, (match, productName) => {
            const name = productName.trim();
            const product = products[name];
            if (!product) return match;

            if (!productInPost.includes(name)) {
                productInPost.push(name);
            }
            return `<span data-moshimo="${name}"></span>`;
        });

        await db.collection("posts").updateOne(
            { _id: article._id },
            {
                $set: {
                    content: updateContent,
                    moshimoProducts: productInPost,
                }
            }
        );
    }
    await client.close();
    console.log("Markdown内TODOをリンクに置換完了")
}

async function main() {
    await loadCSV();
    await updateMarkdown();
}

main().catch(console.error);


