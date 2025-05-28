import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/lib/mongodb";
import Category from "models/category";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connect();
        const categories = Category.find().sort({ name: 1 });
        res.status(200).json(categories);
    }catch(error){
        res.status(500).json({error:"Failed to fetch categories"});
    }
}

