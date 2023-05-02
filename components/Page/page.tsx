import { revalidate } from '@/pages/nyheter'
import { Skeleton } from '@mantine/core'
import dynamic from 'next/dynamic'
import { FC, Suspense } from 'react'
import { motion } from 'framer-motion'
import { AnimationSettings } from '../Template/AnimationSettings'

const ACFBlockRender = dynamic(
  () => import('../ACFBlockRender/ACFBlockRender'),
  {
    ssr: false
  }
) as FC<any>

revalidate

const Page = ({ flexibleContent, locale }) => {
  return (
    <motion.div {...AnimationSettings}>
      <Suspense fallback={<Skeleton height={800} mt={6} width="100%" />}>
        <ACFBlockRender flexibleContent={flexibleContent} locale={locale} />
      </Suspense>
    </motion.div>
  )
}

export default Page
