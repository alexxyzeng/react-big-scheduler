import React from 'react'
import PropTypes from 'prop-types'

import { CellUnits } from './index'
import { millSecondsInMinute } from './utils/const'

class HeaderView extends React.Component {
  constructor(props) {
    super(props)
    this.timer = null
    this.state = { left: 0 }
  }

  // componentDidMount() {
  //   this.timer = setInterval(() => {}, millSecondsInMinute)
  // }

  componentDidUpdate() {
    const { showCurrentTime } = this.props
    if (showCurrentTime && !this.timer) {
      const left = this.getTimeViewLeft()
      this.setState({ left })
      this.timer = setInterval(() => {
        const left = this.getTimeViewLeft()
        this.setState({ left })
      }, millSecondsInMinute)
      return
    }
    if (!showCurrentTime && this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null
  }

  getTimeViewLeft() {
    const currentDate = new Date()
    const hours = currentDate.getHours()
    const mins = currentDate.getMinutes()
    let left = (hours * 4 + mins / 15) * 15
    //  TODO: 更新计算规则
    if (hours < 23) {
      left = left - 20
    } else if (hours >= 23) {
      left = left - 40
    }
    return left
  }

  render() {
    // eslint-disable-next-line no-console
    const {
      schedulerData,
      nonAgendaCellHeaderTemplateResolver,
      showCurrentTime
    } = this.props
    console.log(showCurrentTime)
    const { headers, cellUnit, config, localeMoment } = schedulerData
    let headerHeight = schedulerData.getTableHeaderHeight()
    let cellWidth = schedulerData.getContentCellWidth()
    let minuteStepsInHour = schedulerData.getMinuteStepsInHour()
    const currentTime = new Date()
    const currentMoment = localeMoment(currentTime)
    let headerList = []
    let style = { visibility: 'hidden' }
    const currentHour = currentTime.getHours()
    const currentMin = currentTime.getMinutes()
    if (cellUnit === CellUnits.Hour) {
      headers.forEach((item, index) => {
        if (index % minuteStepsInHour === 0) {
          let datetime = localeMoment(item.time)
          style = item.nonWorkingTime
            ? {
              width: cellWidth * minuteStepsInHour,
              // color: config.nonWorkingTimeHeadColor,
              backgroundColor: config.nonWorkingTimeHeadBgColor
            }
            : { width: cellWidth * minuteStepsInHour }

          if (index === headers.length - minuteStepsInHour)
            style = item.nonWorkingTime
              ? {
                // color: config.nonWorkingTimeHeadColor,
                backgroundColor: config.nonWorkingTimeHeadBgColor
              }
              : {}

          let pFormattedList = config.nonAgendaDayCellHeaderFormat
            .split('|')
            .map(item => datetime.format(item))
          let element

          if (typeof nonAgendaCellHeaderTemplateResolver === 'function') {
            element = nonAgendaCellHeaderTemplateResolver(
              schedulerData,
              item,
              pFormattedList,
              style
            )
          } else {
            let pList = pFormattedList.map((item, index) => {
              return <div key={index}>{item}</div>
            })
            if (showCurrentTime) {
              if (index === currentHour * 4) {
                style['visibility'] = 'hidden'
              } else if (
                (currentMin < 15 && index === (currentHour - 1) * 4) ||
                (currentMin > 45 && index === (currentHour + 1) * 4)
              ) {
                style['visibility'] = 'hidden'
              }
            }

            element = (
              <th key={item.time} className="header3-text" style={style}>
                <div>{pList}</div>
              </th>
            )
          }

          headerList.push(element)
        }
      })
    } else {
      headerList = headers.map((item, index) => {
        let datetime = localeMoment(item.time)
        style = item.nonWorkingTime
          ? {
            width: cellWidth,
            color: config.nonWorkingTimeHeadColor,
            backgroundColor: config.nonWorkingTimeHeadBgColor
          }
          : { width: cellWidth }
        if (index === headers.length - 1)
          style = item.nonWorkingTime
            ? {
              color: config.nonWorkingTimeHeadColor,
              backgroundColor: config.nonWorkingTimeHeadBgColor
            }
            : {}

        let pFormattedList = config.nonAgendaOtherCellHeaderFormat
          .split('|')
          .map(item => datetime.format(item))

        if (typeof nonAgendaCellHeaderTemplateResolver === 'function') {
          return nonAgendaCellHeaderTemplateResolver(
            schedulerData,
            item,
            pFormattedList,
            style
          )
        }

        const pList = pFormattedList.map((item, index) => (
          <div key={index}>{item}</div>
        ))

        return (
          <th key={item.time} className="header3-text" style={style}>
            <div>{pList}</div>
          </th>
        )
      })
    }
    const { left } = this.state

    return (
      <div style={{ position: 'relative' }}>
        <table className="scheduler-bg-table">
          <thead>
            <tr style={{ height: headerHeight }}>{headerList}</tr>
          </thead>
        </table>
        {showCurrentTime && (
          <div
            className="header3-text"
            style={{
              position: 'absolute',
              top: 0,
              lineHeight: '40px',
              left: left,
              color: 'red'
            }}
          >
            {currentMoment.format('HH:mm')}
          </div>
        )}
      </div>
    )
  }
}

export default HeaderView

HeaderView.propTypes = {
  schedulerData: PropTypes.object.isRequired,
  nonAgendaCellHeaderTemplateResolver: PropTypes.func,
  showCurrentTime: PropTypes.bool
}

// function TimeLineView({ schedulerData }) {
//   const { headers, cellUnit, config, localeMoment } = schedulerData;
//   const headerHeight = schedulerData.getTableHeaderHeight();
//   const cellWidth = schedulerData.getContentCellWidth();
//   const minuteStepsInHour = schedulerData.getMinuteStepsInHour();

//   let headerList = [];
//   let style = {};
// }

// function getHeaderAndStyle(schedulerData) {
//   const { headers, cellUnit, config, localeMoment } = schedulerData;
//   let headerHeight = schedulerData.getTableHeaderHeight();
//   let cellWidth = schedulerData.getContentCellWidth();
//   let minuteStepsInHour = schedulerData.getMinuteStepsInHour();
//   headers.forEach((item, index) => {
//     const { time, nonWorkingTime } = item;
//     if (index % minuteStepsInHour === 0) {
//       let dateTime = localeMoment(time);
//       style = { width: cellWidth * minuteStepsInHour };
//       if (nonWorkingTime) {
//         const { nonWorkingTimeHeadBgColor } = config;
//         style['color'] = nonWorkingTimeHeadBgColor;
//         style['backgroundColor'] = nonWorkingTimeHeadBgColor;
//       }
//     }
//   });
// }
