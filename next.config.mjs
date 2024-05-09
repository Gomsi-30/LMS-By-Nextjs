/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          { hostname: 'utfs.io' }  // Assumes HTTP and HTTPS by default
        ]
      }
};

export default nextConfig;
