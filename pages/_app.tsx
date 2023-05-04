import Footer from '@/components/Template/Footer/Footer'
import Header from '@/components/Template/Header/Header'
import PageTransition from '@/components/Template/PageTransition/PageTransition'
import Router from 'next/router'
import { Progress } from '@/components/Template/NProgress/Progress'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { useMediaQuery } from '@mantine/hooks'
import DrawerHeader from '@/components/Template/Header/Drawer'
import GoogleAnalytics from '@bradgarropy/next-google-analytics/dist/types/components/GoogleAnalytics/GoogleAnalytics'

import '@/styles/global.scss'
import Script from 'next/script'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const matches = useMediaQuery('(min-width: 920px)')

  const routeChange = () => {
    const tempFix = () => {
      const allStyleElems = document.querySelectorAll('style[media="x"]')
      allStyleElems.forEach((elem) => {
        elem.removeAttribute('media')
      })
    }
    tempFix()
  }

  Router.events.on('routeChangeComplete', routeChange)
  Router.events.on('routeChangeStart', routeChange)

  const handleEvent = () => {
    const header = document.getElementById('header')
    header.style.top = '0px'
  }

  Router.events.on('routeChangeComplete', handleEvent)

  Progress()

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-ET09GB0K4F"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-ET09GB0K4F');
    `}
      </Script>
      <MantineProvider>
        <Notifications />
        {pageProps?.options ? (
          <>
            {matches ? (
              <Header
                options={pageProps?.options}
                newMenu={pageProps?.options}
              />
            ) : null}
            {!matches ? (
              <DrawerHeader
                options={pageProps?.options}
                newMenu={pageProps?.options}
              />
            ) : null}
          </>
        ) : null}
        <PageTransition />
        <Component {...pageProps} key={router.pathname} />
        {pageProps?.options ? <Footer options={pageProps?.options} /> : null}
      </MantineProvider>
    </>
  )
}
