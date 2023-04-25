import { FC } from 'react'

interface Props {
  children
  full?: string
}

const Layout: FC<Props> = ({ children, full }) => {
  const fullWith = full === '1' ? 'w-full' : 'max-w-7xl'
  return (
    <div className={`justify-center my-5 mx-auto ${fullWith}`}>
      {children}
    </div>
  )
}

export default Layout
