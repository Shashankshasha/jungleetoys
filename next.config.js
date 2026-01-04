/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'fbcvqdybnwchgvmknocn.supabase.co',
      },
    ],
  },
  // Removed env config - Next.js 14 handles environment variables automatically
};

module.exports = nextConfig;
