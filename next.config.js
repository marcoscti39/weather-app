/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: { API_KEY: "d16de1578fb8478d6e5ca7de3d750256" },
  images :{
    domains: ["openweathermap.org", "http://openweathermap.org", "localhost"],
  }
}

module.exports = nextConfig