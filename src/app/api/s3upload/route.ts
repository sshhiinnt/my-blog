import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";


console.log("Loading api/s3upload.ts - Version:2 20250802_kusottaremeV2");


const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID!,
};


const region = "ap-northeast-1";
const bucketName = process.env.AWS_S3_BUCKET_NAME!;


console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID);
console.log("AWS_SECRET_ACCESS_KEY_ID:", process.env.AWS_SECRET_ACCESS_KEY_ID ? "*****" : "undefined");
console.log("AWS_S3_BUCKET_NAME:", process.env.AWS_S3_BUCKET_NAME);
console.log('Region:', region);

const s3Client = new S3Client({
    region,
    credentials,
});


export async function GET(req: NextRequest) {
    console.log("api/s3uplad called)");

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log("token:", token);

    if (!token || token.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const filename = searchParams.get("filename");
    const filetype = searchParams.get("filetype");
    console.log("Requested filetype:", filetype);


    if (!filename || !filetype) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const key = filename;


    try {
        const { url, fields } = await createPresignedPost(s3Client, {
            Bucket: bucketName,
            Key: key,
            Expires: 300,
            Conditions: [
                { acl: "public-read" },
                ["starts-with", "key", ""],

            ],
            Fields: {
                acl: "public-read",
            },
        });





        console.log("Generated signed URI successfully.");
        return NextResponse.json({ url, fields });
    } catch (error) {
        console.error("Error generation signed URI:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}
