import { Skeleton } from '@mantine/core'
import { useState, useEffect } from 'react'

export default function LoadingSkeleton({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const waitForContent = async () => {
      setLoading(false)
    }

    waitForContent()
  }, [])

  return (
    <>
      <Skeleton visible={loading}>{children}</Skeleton>
    </>
  )
}
