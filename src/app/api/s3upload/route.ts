import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@/lib/auth";

const s3 = new S3Client({
    region: "ap-northeast-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});


export async function GET(req: Request) {
    const session = await auth();

    if (!session || session.user?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const filename = searchParams.get("filename");
    const filetype = searchParams.get("filetype");

    if (!filename || !filetype) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: filename,
        ContentType: filetype,
    });

    const signedUri = await getSignedUrl(s3, command, { expiresIn: 60 });
    return NextResponse.json({ url: signedUri });
}