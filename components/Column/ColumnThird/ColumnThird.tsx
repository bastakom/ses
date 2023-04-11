import { Items } from '../Items/Items'

const ColumnThird = ({ props, columnChoice }) => {
  const { columnfull, columnhalf, columnthird } = props

  return (
    <div className="text-white flex flex-wrap gap-10">
      <Items
        data={columnfull || columnhalf || columnthird}
        choiceofColumn={columnChoice}
      />
    </div>
  )
}

export default ColumnThird
