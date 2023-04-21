import dynamic from 'next/dynamic'
import { FC, Suspense } from 'react'
import { BlockRender } from '../BlockRender/BlockRender'
const ACFBlockRender = dynamic(
  () => import('../ACFBlockRender/ACFBlockRender'),
  {
    ssr: false,
    loading: () => <div>Loading...</div>
  }
) as FC<any>

const Page = ({ Builder, blocks, Columns, flexibleContent }) => {
  return (
    <>
      <BlockRender blocks={blocks} />
      <Suspense fallback={<div>Loading...</div>}>
        <ACFBlockRender
          Builder={Builder}
          Columns={Columns}
          flexibleContent={flexibleContent}
        />
      </Suspense>
    </>
  )
}

export default Page
