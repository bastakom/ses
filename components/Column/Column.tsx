import ColumnHalf from './ColumnHalf/ColumnHalf'
import ColumnThird from './ColumnThird/ColumnThird'
import ColumnFull from './Columnfull/ColumnFull'

const Column = ({ columns }) => {
  switch (columns.how_many_column) {
    case '1': {
      return (
        <div>
          <ColumnFull
            props={columns}
            columnChoice={columns.how_many_column}
          />
        </div>
      )
    }
    case '2': {
      return (
        <div>
          <ColumnHalf
            props={columns}
            columnChoice={columns.how_many_column}
          />
        </div>
      )
    }
    case '3': {
      return (
        <div>
          <ColumnThird
            props={columns}
            columnChoice={columns.how_many_column}
          />
        </div>
      )
    }

    default: {
      return null
    }
  }
}

export default Column
