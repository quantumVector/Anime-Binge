/** @type {import('next').NextConfig} */

// const cspHeader = `
//     style-src 'self' 'none';
//     script-src 'self' 'none';
// `

// const cspHeader = `
//     default-src 'none';
//     style-src 'none';
// `

// console.log('server nonce', nonce);

// const cspHeader = `
//     script-src 'self' 'nonce-NWVhZTA0YTktMjI2Ni00OGJiLThkNjktNjY3NGEyZWZmNGJl';
//     style-src 'self' 'unsafe-inline';
//     img-src 'self' https://sun9-48.userapi.com https://sun9-55.userapi.com;
// `
const cspHeader = ``;

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'x-nonce',
            value: nonce,
          },
          {
            key: 'Another-Custom-Header',
            value: 'my other custom header value',
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
      {
        source: '/csp-examples-2',
        headers: [
          {
            key: 'x-custom-header',
            value: 'my custom header value',
          },
        ],
      },
    ]
  },
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