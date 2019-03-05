import React from 'react'

function ResourceHeaderView({ resourceColumns, tableHeaderHeight }) {
  return (
    <table className="resource-table">
      <thead>
        <tr style={{ height: tableHeaderHeight }}>
          <React.Fragment>
            {resourceColumns.map(col => {
              const { width, title, key } = col
              return (
                <th key={key} className="header3-text" style={{ width }}>
                  {title}
                </th>
              )
            })}
          </React.Fragment>
        </tr>
      </thead>
    </table>
  )
}

export default ResourceHeaderView
