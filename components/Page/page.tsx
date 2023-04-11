import dynamic from 'next/dynamic'
import { FC, Suspense } from 'react'
import { BlockRender } from '../BlockRender/BlockRender'
const ACFBlockRender = dynamic(
  () => import('../ACFBlockRender/ACFBlockRender'),
  {
    ssr: false,
    loading: () => <div>Loading...</div>
  }
)

interface Props {
  Builder
  blocks
  Columns
}

const Page: FC<Props> = ({ Builder, blocks, Columns }) => {
  return (
    <>
      <BlockRender blocks={blocks} />
      <Suspense fallback={<div>Loading...</div>}>
        <ACFBlockRender Builder={Builder} Columns={Columns} />
      </Suspense>
    </>
  )
}

export default Page
