import { Skeleton } from '@mantine/core'
import { useState, useEffect } from 'react'

export default function LoadingSkeleton({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const waitForContent = async () => {
      // perform any async operations to load the content here
      // for example, you can fetch data from an API or load a component dynamically

      // once the content is loaded, set the loading state to false
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }

    waitForContent()
  }, [])

  return (
    <>
      <Skeleton visible={loading}>{children}</Skeleton>
    </>
  )
}
