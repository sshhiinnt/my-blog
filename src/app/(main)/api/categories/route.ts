import { connect } from "@/lib/mongodb";
import Category from "models/category";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connect();
        const categories = await Category.find({}).sort({ name: 1 });
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

