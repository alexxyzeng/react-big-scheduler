import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { ViewTypes } from './index'

import BlankBodyView from './BlankBodyView'
import CurrentTimeView from './CurrentTimeView'

class BodyView extends Component {
  constructor(props) {
    super(props)
    const { schedulerData } = this.props
    this.cellHeight = schedulerData.getContentCellHeight()
    this.headerHeight = schedulerData.getTableHeaderHeight()
  }

  static propTypes = {
    schedulerData: PropTypes.object.isRequired,
    schedulerWidth: PropTypes.number.isRequired,
    extraBlankCount: PropTypes.number,
    cellHeight: PropTypes.number,
    viewType: PropTypes.number
  }

  render() {
    const {
      schedulerData,
      schedulerWidth,
      extraBlankCount,
      cellHeight,
      viewType
    } = this.props
    const { renderData, headers, config, behaviors } = schedulerData

    let cellWidth = schedulerData.getContentCellWidth()
    //  TODO: 这里需要做优化
    //  FIXME: 月视图有宽度bug
    let tableRows = renderData.map(item => {
      const { rowHeight } = item
      const {
        resource: { id: slotId }
      } = item
      let rowCells = headers.map((header, index) => {
        let key = slotId + '_' + header.time
        let style = index === headers.length - 1 ? {} : { width: cellWidth }
        if (header.nonWorkingTime)
          style = {
            ...style,
            backgroundColor: config.nonWorkingTimeBodyBgColor
          }
        if (behaviors.getNonAgendaViewBodyCellBgColorFunc) {
          let cellBgColor = behaviors.getNonAgendaViewBodyCellBgColorFunc(
            schedulerData,
            item.slotId,
            header
          )
          if (cellBgColor) style = { ...style, backgroundColor: cellBgColor }
        }
        if (viewType !== ViewTypes.Day) {
          style['borderRight'] = '1px solid #e3f0fb'
        }
        return (
          <td key={key} style={style}>
            <div />
          </td>
        )
      })

      return (
        <tr key={item.slotId} style={{ height: rowHeight }}>
          {rowCells}
        </tr>
      )
    })

    const renderDataLength = renderData.length
    const blankCellWidth = cellWidth * 4
    return (
      <div className="scheduler-bg">
        <table
          className="scheduler-bg-table"
          style={{ width: schedulerWidth }}

          // ref={this.schedulerContentBgTableRef}
        >
          <tbody>{tableRows}</tbody>
        </table>
        {/* TODO: 计算所需的Col数量 */}
        <BlankBodyView
          startDate={schedulerData.startDate}
          rowCount={extraBlankCount}
          colCount={23}
          cellWidth={blankCellWidth}
          cellHeight={cellHeight}
          renderDataLength={renderDataLength}
          containerWidth={schedulerWidth}
        />
      </div>
    )
  }
}

export default BodyView
