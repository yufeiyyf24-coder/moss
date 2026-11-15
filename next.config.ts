import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: "cv.mossfield.xyz" }],
          destination: "/career",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mossfield.xyz" }],
        destination: "https://mossfield.xyz/:path*",
        permanent: true,
      },
      {
        source: "/career/:path*",
        has: [{ type: "host", value: "mossfield.xyz" }],
        destination: "https://cv.mossfield.xyz/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
