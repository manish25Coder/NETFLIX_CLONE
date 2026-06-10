import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"commondatastorage.googleapis.com"
      },
      {
        protocol:"https",
        hostname:"picsum.photos"
      },
      {
        protocol:"https",
        hostname:"peach.blender.org"
      }
    ]
  }
};

export default nextConfig;
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**.googleapis.com",
//       },
//       {
//         protocol: "https",
//         hostname: "**.googleusercontent.com",
//       },
//     ],
//   },
// };

// export default nextConfig;
