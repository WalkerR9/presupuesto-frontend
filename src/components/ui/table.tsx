type Column<T> = {
  header: string
  accessor: keyof T | ((row: T) => React.ReactNode)
}

type TableProps<T> = {
  columns: Column<T>[]
  data: T[]
}

export default function Table<T>({ columns, data }: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-[10px] overflow-hidden">
      <table className="min-w-full border-primary ">
        <thead className="bg-primary">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-2  text-left text-sm font-semibold font"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className=" bg-table-row hover:bg-table-hover border-primary">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-2 text-sm text-primary">
                  {typeof col.accessor === 'function'
                    ? col.accessor(row)
                    : String(row[col.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
