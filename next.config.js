/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // outras configurações aqui

  webpack: (config, _) => {
    config.module.rules.push({
      test: /\.lottie$/,
      type: 'asset/resource',
    });

    return config;
  },
};

module.exports = nextConfig;
