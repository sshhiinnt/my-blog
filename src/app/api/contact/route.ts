import { Resend } from "resend";
import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import Message from "models/contactMessage";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const { name, email, message, token } = await req.json();

        // reCAPTCHA検証
        const secret = process.env.RECAPTCHA_SECRET_KEY!;
        const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
        });
        const recapthaData = await res.json();
        if (!recapthaData.success) {
            return NextResponse.json({ error: "reCAPTCHA failed" }, { status: 400 });
        }


        await connect();
        await Message.create({ name, email, message, createdAt: new Date() });

        const data = await resend.emails.send({
            from: "Contact Form<onbording@resend.dev>",
            to: `${process.env.MY_EMAIL}`,
            subject: `お問い合わせ:${name}`,
            replyTo: email,
            text: `名前:${name}\nメール:${email}\n${message}`,
        });
        console.log("Resend send result:", data);

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ?
            error.message : typeof error === "string" ?
                error : "不明なエラーです";
        return NextResponse.json({ success: false, errorMessage }, { status: 500 });
    }
}