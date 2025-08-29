import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [`${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com`, "img.example"]
  }
};

export default nextConfig;
