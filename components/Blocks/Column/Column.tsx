export const Column = ({
  children,
  width,
  verticalAlignment,
}) => {
  const widthStyle = width
    ? { minWidth: width, flexGrow: 1 }
    : { flexGrow: 1, flexBasis: 0 }

  const justify =
    verticalAlignment === 'bottom'
      ? 'justify-end'
      : verticalAlignment === 'top'
      ? 'justify-start'
      : 'justify-center'
  return (
    <div
      style={widthStyle}
      className={`flex ${justify} flex-col`}
    >
      {children}
    </div>
  )
}
