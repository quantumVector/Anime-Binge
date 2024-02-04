/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    babel: {
      plugins: [
        [
          "effector/babel-plugin",
          {
            factories: [
              "effector-forms"
            ]
          }
        ]
      ]
    }
  }
  
  module.exports = nextConfig