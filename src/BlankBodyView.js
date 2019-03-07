import React from 'react'
import PropTypes from 'prop-types'

import { borderColor, disabldColor, disableDarkColor } from './utils/const'

function BlankBodyView({
  rowCount,
  colCount,
  cellWidth,
  cellHeight,
  renderDataLength,
  containerWidth
}) {
  // if (rowCount <= 1) return null
  //  FIXME: rowCount为1的时候滚动不同步
  if (rowCount === 1) {
    return (
      <div style={{ position: 'relative', height: cellHeight }}>{blanks}</div>
    )
  }
  let blanks = []
  for (let i = 0; i < rowCount; i++) {
    //  TODO: 待调整背景色
    const backgroundColor =
      (renderDataLength + i) % 2 === 0 ? disableDarkColor : disabldColor
    blanks.push(
      <div
        key={i}
        style={{
          width: containerWidth,
          height: `${cellHeight}px`,
          // backgroundColor: 'grey',
          backgroundColor: backgroundColor,
          borderBottom: `1px solid ${borderColor}`
        }}
      />
    )
  }
  for (let j = 1; j <= colCount; j++) {
    blanks.push(
      <div
        key={`col-${j}`}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${cellWidth * j}px`,
          width: '1px',
          backgroundColor: borderColor
        }}
      />
    )
  }

  return <div style={{ position: 'relative' }}>{blanks}</div>
}

export default React.memo(BlankBodyView)

BlankBodyView.propTypes = {
  rowCount: PropTypes.number.isRequired,
  colCount: PropTypes.number.isRequired,
  viewType: PropTypes.number,
  cellWidth: PropTypes.number.isRequired,
  cellHeight: PropTypes.number.isRequired,
  renderDataLength: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired
}
