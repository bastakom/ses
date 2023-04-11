export const Video = ({ src, autoplay, controls, loop }) => {
  return (
    <div className="container mx-auto">
      <video controls muted>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}
