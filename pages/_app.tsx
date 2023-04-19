import Footer from '@/components/Template/Footer/Footer'
import Header from '@/components/Template/Header/Header'
import PageTransition from '@/components/Template/PageTransition/PageTransition'
import { AppProps } from 'next/app'
import '@/styles/global.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  console.log(pageProps)
  return (
    <>
      <Header
        data={pageProps.mainMenu}
        ThemeSettings={pageProps.ThemeSettings}
      />
      <PageTransition />
      <Component {...pageProps} />
      <Footer
        data={pageProps}
        logo={pageProps.ThemeSettings?.logo}
        socials={
          pageProps.ThemeSettings?.socials ||
          pageProps.ThemeSettings?.contactInfo?.socials
        }
      />
    </>
  )
}
