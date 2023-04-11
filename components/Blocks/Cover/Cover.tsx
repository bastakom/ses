import Image from 'next/image'
import { useState } from 'react'
import styles from './cover.module.scss'

export const Cover = ({ children, background, backgroundType, frame }) => {
  const [mute, unMute] = useState(true)
  const defineFrame =
    typeof frame !== 'undefined' && frame.includes('px') ? frame : ''
  const replaceFrame = defineFrame.replace('px', '')

  const handleClick = () => {
    unMute((prevValue) => !prevValue)
  }

  const toggle = mute ? 'muted' : null

  return (
    <>
      <div className="h-screen flex aboslute justify-center flex-col mx-auto mb-10">
        {backgroundType === 'image' ? (
          <Image
            src={background}
            alt=""
            fill
            loading="lazy"
            className={`mix-blend-soft-lighten ${styles.image}`}
          />
        ) : (
          <>
            <video
              autoPlay
              muted={mute}
              loop
              className={`${styles.video} p-${replaceFrame}`}
            >
              <source src={background} type="video/mp4" />
            </video>
            <button
              onClick={handleClick}
              className="z-40 absolute right-5 bottom-5 text-white text-4xl"
            >
              {/* {mute ? <BiVolumeMute /> : <VscUnmute />} */}
            </button>
          </>
        )}
        <div className={`p-12 absolute min-w-full`}>{children}</div>
      </div>
    </>
  )
}
