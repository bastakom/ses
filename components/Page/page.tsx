import { revalidate } from '@/pages/nyheter'
import { Skeleton } from '@mantine/core'
import dynamic from 'next/dynamic'
import { FC, Suspense } from 'react'
import { motion } from 'framer-motion'
import { AnimationSettings } from '../Template/AnimationSettings'
import Head from 'next/head'
import { useRouter } from 'next/router'

const ACFBlockRender = dynamic(
  () => import('../ACFBlockRender/ACFBlockRender'),
  {
    ssr: false
  }
) as FC<any>

revalidate

const Page = ({ flexibleContent, locale }) => {
  const router = useRouter()
  const Yoast =
    router.pathname === '/'
      ? 'SES PROTECTION'
      : flexibleContent[0]?.title?.rendered

  return (
    <motion.div {...AnimationSettings}>
      <Head>
        <title>{Yoast}</title>
        <meta
          name="description"
          content={flexibleContent[0].yoast_head_json.og_description}
        />
      </Head>
      <Suspense fallback={<Skeleton height={800} mt={6} width="100%" />}>
        <ACFBlockRender flexibleContent={flexibleContent} locale={locale} />
      </Suspense>
    </motion.div>
  )
}

export default Page
