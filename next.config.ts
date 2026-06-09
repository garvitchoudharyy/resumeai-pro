/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This allows production builds to successfully complete 
    // even if your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // This blocks ESLint errors from stopping your build as well
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
