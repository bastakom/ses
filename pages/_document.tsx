import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="favicon" href="favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Montserrat:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
          <script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid="54a96287-0a8e-4874-9434-a6d52758b612"
            type="text/javascript"
          ></script>
          <script
            id="CookieDeclaration"
            src="https://consent.cookiebot.com/54a96287-0a8e-4874-9434-a6d52758b612/cd.js"
            type="text/javascript"
            async
          ></script>
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
