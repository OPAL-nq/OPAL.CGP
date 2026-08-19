/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CALENDLY_URL:
      process.env.NEXT_PUBLIC_CALENDLY_URL ||
      "https://calendly.com/maxym-nelaupe/diagnostic-opal",
  },
};

export default nextConfig;
