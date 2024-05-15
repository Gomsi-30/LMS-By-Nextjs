/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          { hostname: 'utfs.io' },
          {hostname : 'lh3.googleusercontent.com'}  // Assumes HTTP and HTTPS by default
        ]
      }
};

export default nextConfig;
