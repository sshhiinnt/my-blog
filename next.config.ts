
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/categories/:groupName/page/1",
        destination: "/categories/:groupName",
        permanent: true,
      },
      {
        source: "/article/page/1",
        destination: "/article",
        permanent: true,
      },
      {
        source: "/categories/:groupName/:categorySlug/page/1",
        destination: "/categories/:groupName/:categorySlug",
        permanent: true,
      },
      {
        source: "/archive/:year/:month/page/1",
        destination: "/archive/:year/:month",
        permanent: true,
      },
      {
        source: "/area/:slug/page/1",
        destination: "/area/:slug",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "yamaori-media-bucket.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "thumbnail.image.rakuten.co.jp",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.rakuten.co.jp",
        pathname: "/**",
      }
    ],

  },
};

export default nextConfig;
