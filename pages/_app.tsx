import Footer from '@/components/Template/Footer/Footer'
import Header from '@/components/Template/Header/Header'
import PageTransition from '@/components/Template/PageTransition/PageTransition'
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
      {/* <PageTransition /> */}
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.pathname} />
      </AnimatePresence>
      {pageProps?.options ? <Footer options={pageProps?.options} /> : null}
    </MantineProvider>
  )
}
