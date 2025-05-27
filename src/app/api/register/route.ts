import { NextResponse } from "next/server";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connect } from "@/lib/mongodb";

export async function POST(req: Request) {
    await connect();
    const { username, password } = await req.json();
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return NextResponse.json({ error: "ユーザー名は既に使われています" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({
        username,
        password: hashedPassword,
        email:`${username}@examole.com`,
    });

    await newUser.save();
    return NextResponse.json({message:"ユーザー登録完了"});
}