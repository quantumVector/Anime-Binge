import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

const MyDocument = (props: { nonce: string }) => {
  const { nonce } = props;

  return (
    <Html lang="ru">
      <Head nonce={nonce} />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);

  const { req } = ctx;

  //console.log('req', req?.headers)

  const nonce = req?.headers['x-nonce'] || '';

  return { ...initialProps, nonce };
};

export default MyDocument;
