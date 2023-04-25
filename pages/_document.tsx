import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* link your fonts here */}
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Montserrat:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
        </Head>

        <>
          <Main />
          <NextScript />
        </>
      </Html>
    )
  }
}

export default MyDocument
