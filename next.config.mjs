/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          { hostname: 'utfs.io' },
          {hostname : 'lh3.googleusercontent.com'},
          {hostname : 'img.freepik.com'},
          {hostname: 'miro.medium.com'},
          // Assumes HTTP and HTTPS by default
        ]
      }
};

export default nextConfig;
