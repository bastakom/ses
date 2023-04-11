import Image from 'next/image'

export const ImageBlock = ({ url, height, width, alt }) => {
  return <Image src={url} width={height} height={width} alt={alt} className="p-2 md:p-0" />
}
