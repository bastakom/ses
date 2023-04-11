import React, { FC } from 'react'
import { ThemeSettings } from 'interfaces/themeSettings'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Socials from './Socials'
import styles from './footer.module.scss'

interface Props {
  ThemeSettings?: ThemeSettings
  data?: any
  socials?: any
  logo: string
}

const Footer: FC<Props> = ({ socials, logo }) => {
  return (
    <footer className={styles.footer}>
      <div className={`h-72 w-full flex flex-col justify-center`}>
        <div className="flex flex-wrap text-white w-full p-10">
          <div className="w-2/5">
            {logo ? (
              <motion.div
                initial={{ rotateZ: 0 }}
                animate={{ rotateZ: 360 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{ width: '145px' }}
              >
                <Image
                  src={logo}
                  width="150"
                  quality={100}
                  height="100"
                  alt="alt"
                />
              </motion.div>
            ) : null}
          </div>
          <div className="w-1/5"> Menu </div>
          <div className="w-1/5"> Menu </div>
          <div className="w-1/5"> Menu </div>
        </div>
      </div>
      <div
        className={`pr-20 flex justify-between items-center p-3 ${styles.socials}`}
      >
        <div>Copy right All rights reserved</div>
        {socials && <Socials icons={socials} />}
      </div>
    </footer>
  )
}

export default Footer
