import dynamic from 'next/dynamic'
import { FC, Suspense } from 'react'

const ACFBlockRender = dynamic(
  () => import('../ACFBlockRender/ACFBlockRender'),
  {
    ssr: false,
    loading: () => <div>Loading...</div>
  }
) as FC<any>

const Page = ({ flexibleContent }) => {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ACFBlockRender flexibleContent={flexibleContent} />
      </Suspense>
    </>
  )
}

export default Page
