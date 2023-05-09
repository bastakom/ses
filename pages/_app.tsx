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
import { useEffect, useState } from 'react'
import Script from 'next/script'

import '@/styles/global.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [show, setShow] = useState(false)
  const router = useRouter()
  const matches = useMediaQuery('(min-width: 920px)')

  useEffect(() => {
    setTimeout(() => {
      if (router.pathname === '/login') {
        window.location.replace('https://ses.admin-login.se/')
      }
    }, 2000)
  }, [router.pathname])

  const routeChange = () => {
    const tempFix = () => {
      const allStyleElems = document.querySelectorAll('style[media="x"]')
      allStyleElems.forEach((elem) => {
        elem.removeAttribute('media')
      })
    }
    tempFix()
  }

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 1000)
  })

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
            {matches && show ? (
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
      </MantineProvider>
      {show && pageProps?.options ? (
        <Footer options={pageProps?.options} />
      ) : null}
    </>
  )
}
