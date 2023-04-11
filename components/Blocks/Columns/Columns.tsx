export const Columns = ({
  isStackedOnMobile,
  children,
  verticalAlignment,
}) => {
  return (
    <div className="max-10">
      <div
        className={`max-w-8xl mx-auto gap-10 ${
          isStackedOnMobile ? 'block md:flex' : 'flex'
        } content-${verticalAlignment}`}
      >
        {children}
      </div>
    </div>
  )
}
