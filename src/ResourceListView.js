import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ResourceListView extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    renderData: PropTypes.array.isRequired,
    contentScrollbarHeight: PropTypes.number.isRequired,
    slotClickedFunc: PropTypes.func,
    slotItemTemplateResolver: PropTypes.func,
    resourceColumns: PropTypes.array
  }

  render() {
    const { renderData, contentScrollbarHeight, resourceColumns } = this.props
    // let width = schedulerData.getResourceTableWidth() - 2
    let paddingBottom = contentScrollbarHeight
    let resourceList = renderData.map(item => {
      // let a =
      //   slotClickedFunc != undefined ? (
      //     <a
      //       onClick={() => {
      //         slotClickedFunc(schedulerData, item)
      //       }}
      //     >
      //       <span className="expander-space" />
      //       {item.slotName}
      //     </a>
      //   ) : (
      //     <span>
      //       <span className="expander-space" />
      //       <span>{item.slotName}</span>
      //     </span>
      //   )
      const { resource, rowHeight } = item
      let slotItems = resourceColumns.map(col => {
        const { key, width } = col
        const resValue = resource[key] || ''
        return (
          <td
            key={key}
            data-resource-id={resource.id}
            style={{ height: rowHeight, width: width }}
          >
            <div
              title={resValue}
              className="overflow-text header2-text"
              style={{ textAlign: 'center' }}
            >
              {resValue}
            </div>
          </td>
        )
      })
      // if (slotItemTemplateResolver) {
      //   let temp = slotItemTemplateResolver(
      //     schedulerData,
      //     item,
      //     slotClickedFunc,
      //     width,
      //     'overflow-text header2-text'
      //   )
      //   if (temp) slotItem = temp
      // }
      return <tr key={resource.id}>{slotItems}</tr>
    })

    return (
      <div style={{ paddingBottom: paddingBottom }}>
        <table className="resource-table">
          <tbody>{resourceList}</tbody>
        </table>
      </div>
    )
  }
}

export default ResourceListView
