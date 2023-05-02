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
import { AnimatePresence } from 'framer-motion'
import '@/styles/global.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const matches = useMediaQuery('(min-width: 56.25em)')

  // Add that code to _app.tsx / _app.jsx

  const routeChange = () => {
    // Temporary fix to avoid flash of unstyled content
    // during route transitions. Keep an eye on this
    // issue and remove this code when resolved:
    // https://github.com/vercel/next.js/issues/17464

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

  Progress()

  return (
    <MantineProvider>
      <Notifications />
      {pageProps?.options ? (
        <>
          {matches ? (
            <Header options={pageProps?.options} newMenu={pageProps?.options} />
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
      {/* FiX ANIMATE PRESENCE ON TOP  */}
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} key={router.pathname} />
      </AnimatePresence>
      {pageProps?.options ? <Footer options={pageProps?.options} /> : null}
    </MantineProvider>
  )
}
