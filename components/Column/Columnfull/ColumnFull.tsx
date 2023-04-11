import { Items } from '../Items/Items'

const ColumnFull = ({ props, columnChoice }) => {
  const { columnfull } = props
  return (
    <div className="text-white">
      <Items data={columnfull} choiceofColumn={columnChoice} />
    </div>
  )
}

export default ColumnFull
