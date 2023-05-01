import { FC, Suspense } from 'react'
import { revalidate } from '@/pages/nyheter'
import { Skeleton } from '@mantine/core'
import dynamic from 'next/dynamic'

const ACFBlockRender = dynamic(
  () => import('../ACFBlockRender/ACFBlockRender'),
  {
    ssr: false
  }
) as FC<any>

revalidate

const Page = ({ flexibleContent, locale }) => {
  return (
    <div>
      <Suspense fallback={<Skeleton height={500} mt={6} width="100%" />}>
        <ACFBlockRender flexibleContent={flexibleContent} locale={locale} />
      </Suspense>
    </div>
  )
}

export default Page
