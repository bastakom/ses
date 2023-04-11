import Image from 'next/image'

export const ImageBlock = ({ url, height, width, alt }) => {
  return (
    <Image
      src={url}
      width={height}
      height={width}
      alt={alt || 'image'}
      className="p-2 md:p-0"
    />
  )
}
