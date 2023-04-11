import ColumnHalf from './ColumnHalf/ColumnHalf'
import ColumnThird from './ColumnThird/ColumnThird'
import ColumnFull from './Columnfull/ColumnFull'

const Column = ({ columns }) => {
  switch (columns.howManyColumn) {
    case '1': {
      return (
        <div>
          <ColumnFull
            props={columns}
            columnChoice={columns.howManyColumn}
          />
        </div>
      )
    }
    case '2': {
      return (
        <div>
          <ColumnHalf
            props={columns}
            columnChoice={columns.howManyColumn}
          />
        </div>
      )
    }
    case '3': {
      return (
        <div>
          <ColumnThird
            props={columns}
            columnChoice={columns.howManyColumn}
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
