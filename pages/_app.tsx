import Footer from '@/components/Template/Footer/Footer'
import Header from '@/components/Template/Header/Header'
import PageTransition from '@/components/Template/PageTransition/PageTransition'
import { Progress } from '@/components/Template/NProgress/Progress'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import '@/styles/global.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  Progress()

  return (
    <>
      {pageProps?.options ? (
        <Header
          options={pageProps?.options}
          newMenu={pageProps?.options}
        />
      ) : null}
      <PageTransition />
      <Component {...pageProps} key={router.pathname} />
      {pageProps?.options ? (
        <Footer options={pageProps?.options} />
      ) : null}
    </>
  )
}
