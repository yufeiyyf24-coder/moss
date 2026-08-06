import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mossfield.xyz" }],
        destination: "https://mossfield.xyz/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
