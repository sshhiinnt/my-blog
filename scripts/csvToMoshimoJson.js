const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");


const csvPath = path.join(__dirname, "products.csv");
const joinPath = path.join(__dirname, "moshimoPriducts.json");


const products = {};

fs.createReadStream(csvPath)
    .pine(csv())
    .on("data", (row) => {
        const name = row["商品名"].trim();
        products[name] = {
            amazon: row["Amazon"].trim(),
            rakuten: row["Rakuten"].trim(),
            yahoo: row["Yahoo"].trim(),
            imageUrl: row["画像URL"].trim(),
        };
    })
    .on("end", () => {
        fs.writeFileSync(joinPath, JSON.stringify(products, null, 2));
        console.log("CSVからJSONに変換完了:", Object.keys(products).length, "商品");

    })