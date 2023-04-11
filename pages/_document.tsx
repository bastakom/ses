import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add any necessary meta tags, stylesheets, or scripts here */}
        </Head>
        <>
          <Main />
          <NextScript />
        </>
      </Html>
    );
  }
}

export default MyDocument;
