import Footer from '@/components/Template/Footer/Footer'
import Header from '@/components/Template/Header/Header'
import PageTransition from '@/components/Template/PageTransition/PageTransition'
import { AppProps } from 'next/app'
import '@/styles/global.scss'
import { useRouter } from 'next/router'
import { revalidate } from './nyheter'

revalidate

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <>
      {pageProps?.menuItems ? (
        <Header
          ThemeSettings={pageProps.ThemeSettings}
          newMenu={pageProps?.menuItems}
        />
      ) : null}
      <PageTransition />
      <Component {...pageProps} key={router.pathname} />
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
