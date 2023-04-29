import { FC } from 'react'
import { motion } from 'framer-motion'
import { AnimationSettings } from '../AnimationSettings'

interface Props {
  children
  full?: string
}

const Layout: FC<Props> = ({ children, full }) => {
  const fullWith = full === '1' ? 'w-full' : 'max-w-7xl'
  return (
    <motion.div
      className={`justify-center my-5 mx-auto ${fullWith}`}
      {...AnimationSettings}
    >
      {children}
    </motion.div>
  )
}

export default Layout
