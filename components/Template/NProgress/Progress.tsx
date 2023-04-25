import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'
import router from 'next/router'

export const Progress = () => {
  useEffect(() => {
    router.events.on('routeChangeStart', NProgress.start)
    router.events.on('routeChangeComplete', NProgress.done)
    router.events.on('routeChangeError', NProgress.done)
    return () => {
      router.events.off('routeChangeStart', NProgress.start)
      router.events.off('routeChangeComplete', NProgress.done)
      router.events.off('routeChangeError', NProgress.done)
    }
  }, [])
}
