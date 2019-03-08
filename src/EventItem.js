import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import Popover from 'antd/lib/popover'
import 'antd/lib/popover/style/index.css'
import EventItemPopover from './EventItemPopover'
import { CellUnits, DATETIME_FORMAT } from './index'
import { DnDTypes } from './DnDTypes'

/**
 *
 * 结束会议：可弹窗，不可移动，不可拖拽
 * 与我无关会议：可弹窗，不可移动，不可拖拽
 * 进行中会议（与我无关）： 可弹窗，不可移动，可拖拽修改结束时间（不低于当前时间）
 * 未进行会议（我是参与人）：可弹窗，不可移动，不可拖拽，可修改会议参与状态（未响应，已同意、已拒绝）
 * 未进行会议（我是发起人）：可弹窗，可移动，可拖拽修改开始和结束时间（不低于当前时间，修改后最低为15分钟）
 * 冲突会议（与我无关）：可弹窗，不可移动，不可拖拽
 * 冲突会议（我是发起人）：可弹窗，可移动，不可拖拽
 */

//  待优化
class EventItem extends PureComponent {
  constructor(props) {
    super(props)

    const { left, top, width } = props
    this.state = {
      left: left,
      top: top,
      width: width
    }
    this.startResizer = null
    this.endResizer = null
  }

  static propTypes = {
    schedulerData: PropTypes.object.isRequired,
    eventItem: PropTypes.object.isRequired,
    isStart: PropTypes.bool.isRequired,
    isEnd: PropTypes.bool.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    isInPopover: PropTypes.bool.isRequired,
    leftIndex: PropTypes.number.isRequired,
    rightIndex: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    updateEventStart: PropTypes.func,
    updateEventEnd: PropTypes.func,
    moveEvent: PropTypes.func,
    subtitleGetter: PropTypes.func,
    eventItemClick: PropTypes.func,
    viewEventClick: PropTypes.func,
    viewEventText: PropTypes.string,
    viewEvent2Click: PropTypes.func,
    viewEvent2Text: PropTypes.string,
    conflictOccurred: PropTypes.func,
    renderEventItem: PropTypes.func
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(np) {
    const { left, top, width } = np
    this.setState({
      left: left,
      top: top,
      width: width
    })

    this.subscribeResizeEvent(np)
  }

  componentDidMount() {
    this.subscribeResizeEvent(this.props)
  }

  initStartDrag = ev => {
    ev.stopPropagation()
    if (ev.buttons !== undefined && ev.buttons !== 1) return

    const { schedulerData } = this.props
    schedulerData._startResizing()
    this.setState({
      startX: ev.clientX
    })

    document.documentElement.addEventListener(
      'mousemove',
      this.doStartDrag,
      false
    )
    document.documentElement.addEventListener(
      'mouseup',
      this.stopStartDrag,
      false
    )
    document.onselectstart = function() {
      return false
    }
    document.ondragstart = function() {
      return false
    }
  }

  doStartDrag = ev => {
    ev.stopPropagation()

    const { left, width, leftIndex, rightIndex, schedulerData } = this.props
    let cellWidth = schedulerData.getContentCellWidth()
    let offset = leftIndex > 0 ? 5 : 6
    let minWidth = cellWidth - offset
    let maxWidth = rightIndex * cellWidth - offset
    const { startX } = this.state
    let newLeft = left + ev.clientX - startX
    let newWidth = width + startX - ev.clientX
    if (newWidth < minWidth) {
      newWidth = minWidth
      newLeft = (rightIndex - 1) * cellWidth + (rightIndex - 1 > 0 ? 2 : 3)
    } else if (newWidth > maxWidth) {
      newWidth = maxWidth
      newLeft = 3
    }

    this.setState({ left: newLeft, width: newWidth })
  }

  stopStartDrag = ev => {
    ev.stopPropagation()
    document.documentElement.removeEventListener(
      'mousemove',
      this.doStartDrag,
      false
    )
    document.documentElement.removeEventListener(
      'mouseup',
      this.stopStartDrag,
      false
    )
    document.onselectstart = null
    document.ondragstart = null

    const {
      width,
      leftIndex,
      rightIndex,
      schedulerData,
      eventItem,
      updateEventStart
    } = this.props
    schedulerData._stopResizing()
    const { cellUnit, events, config, localeMoment } = schedulerData
    let cellWidth = schedulerData.getContentCellWidth()
    let offset = leftIndex > 0 ? 5 : 6
    let minWidth = cellWidth - offset
    let maxWidth = rightIndex * cellWidth - offset
    const { startX } = this.state
    let newWidth = width + startX - ev.clientX
    let deltaX = ev.clientX - startX
    let sign = deltaX < 0 ? -1 : deltaX === 0 ? 0 : 1
    let count =
      (sign > 0
        ? Math.floor(Math.abs(deltaX) / cellWidth)
        : Math.ceil(Math.abs(deltaX) / cellWidth)) * sign
    if (newWidth < minWidth) count = rightIndex - leftIndex - 1
    else if (newWidth > maxWidth) count = -leftIndex
    let newStart = localeMoment(eventItem.start)
      .add(
        cellUnit === CellUnits.Hour ? count * config.minuteStep : count,
        cellUnit === CellUnits.Hour ? 'minutes' : 'days'
      )
      .format(DATETIME_FORMAT)
    if (
      count !== 0 &&
      cellUnit !== CellUnits.Hour &&
      config.displayWeekend === false
    ) {
      if (count > 0) {
        let tempCount = 0,
          i = 0
        while (true) {
          i++
          let tempStart = localeMoment(eventItem.start).add(i, 'days')
          let dayOfWeek = tempStart.weekday()
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            tempCount++
            if (tempCount === count) {
              newStart = tempStart.format(DATETIME_FORMAT)
              break
            }
          }
        }
      } else {
        let tempCount = 0,
          i = 0
        while (true) {
          i--
          let tempStart = localeMoment(eventItem.start).add(i, 'days')
          let dayOfWeek = tempStart.weekday()
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            tempCount--
            if (tempCount === count) {
              newStart = tempStart.format(DATETIME_FORMAT)
              break
            }
          }
        }
      }
    }

    let hasConflict = false
    let slotId = schedulerData._getEventSlotId(eventItem)
    let slotName = undefined
    let slot = schedulerData.getSlotById(slotId)
    if (slot) slotName = slot.name
    if (config.checkConflict) {
      let start = localeMoment(newStart),
        end = localeMoment(eventItem.end)

      events.forEach(e => {
        if (
          schedulerData._getEventSlotId(e) === slotId &&
          e.id !== eventItem.id
        ) {
          let eStart = localeMoment(e.start),
            eEnd = localeMoment(e.end)
          if (
            (start >= eStart && start < eEnd) ||
            (end > eStart && end <= eEnd) ||
            (eStart >= start && eStart < end) ||
            (eEnd > start && eEnd <= end)
          ) {
            hasConflict = true
          }
        }
      })
    }

    if (hasConflict) {
      const { conflictOccurred, left, top, width } = this.props
      this.setState({
        left: left,
        top: top,
        width: width
      })

      if (conflictOccurred != undefined) {
        conflictOccurred(
          schedulerData,
          'StartResize',
          eventItem,
          DnDTypes.EVENT,
          slotId,
          slotName,
          newStart,
          eventItem.end
        )
      } else {
        console.log(
          'Conflict occurred, set conflictOccurred func in Scheduler to handle it'
        )
      }
      this.subscribeResizeEvent(this.props)
    } else {
      if (updateEventStart != undefined)
        updateEventStart(schedulerData, eventItem, newStart)
    }
  }

  initEndDrag = ev => {
    ev.stopPropagation()
    if (ev.buttons !== undefined && ev.buttons !== 1) return

    const { schedulerData } = this.props
    schedulerData._startResizing()
    this.setState({
      endX: ev.clientX
    })

    document.documentElement.addEventListener(
      'mousemove',
      this.doEndDrag,
      false
    )
    document.documentElement.addEventListener(
      'mouseup',
      this.stopEndDrag,
      false
    )
    document.onselectstart = function() {
      return false
    }
    document.ondragstart = function() {
      return false
    }
  }

  doEndDrag = ev => {
    ev.stopPropagation()
    const { width, leftIndex, schedulerData } = this.props
    const { headers } = schedulerData
    let cellWidth = schedulerData.getContentCellWidth()
    let offset = leftIndex > 0 ? 5 : 6
    let minWidth = cellWidth - offset
    let maxWidth = (headers.length - leftIndex) * cellWidth - offset
    const { endX } = this.state

    let newWidth = width + ev.clientX - endX
    if (newWidth < minWidth) newWidth = minWidth
    else if (newWidth > maxWidth) newWidth = maxWidth

    this.setState({ width: newWidth })
  }

  stopEndDrag = ev => {
    ev.stopPropagation()
    document.documentElement.removeEventListener(
      'mousemove',
      this.doEndDrag,
      false
    )
    document.documentElement.removeEventListener(
      'mouseup',
      this.stopEndDrag,
      false
    )
    document.onselectstart = null
    document.ondragstart = null

    const {
      width,
      leftIndex,
      rightIndex,
      schedulerData,
      eventItem,
      updateEventEnd
    } = this.props
    schedulerData._stopResizing()
    const { headers, cellUnit, events, config, localeMoment } = schedulerData
    let cellWidth = schedulerData.getContentCellWidth()
    let offset = leftIndex > 0 ? 5 : 6
    let minWidth = cellWidth - offset
    let maxWidth = (headers.length - leftIndex) * cellWidth - offset
    const { endX } = this.state

    let newWidth = width + ev.clientX - endX
    let deltaX = newWidth - width
    let sign = deltaX < 0 ? -1 : deltaX === 0 ? 0 : 1
    let count =
      (sign < 0
        ? Math.floor(Math.abs(deltaX) / cellWidth)
        : Math.ceil(Math.abs(deltaX) / cellWidth)) * sign
    if (newWidth < minWidth) count = leftIndex - rightIndex + 1
    else if (newWidth > maxWidth) count = headers.length - rightIndex
    let newEnd = localeMoment(eventItem.end)
      .add(
        cellUnit === CellUnits.Hour ? count * config.minuteStep : count,
        cellUnit === CellUnits.Hour ? 'minutes' : 'days'
      )
      .format(DATETIME_FORMAT)
    if (
      count !== 0 &&
      cellUnit !== CellUnits.Hour &&
      config.displayWeekend === false
    ) {
      if (count > 0) {
        let tempCount = 0,
          i = 0
        while (true) {
          i++
          let tempEnd = localeMoment(eventItem.end).add(i, 'days')
          let dayOfWeek = tempEnd.weekday()
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            tempCount++
            if (tempCount === count) {
              newEnd = tempEnd.format(DATETIME_FORMAT)
              break
            }
          }
        }
      } else {
        let tempCount = 0,
          i = 0
        while (true) {
          i--
          let tempEnd = localeMoment(eventItem.end).add(i, 'days')
          let dayOfWeek = tempEnd.weekday()
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            tempCount--
            if (tempCount === count) {
              newEnd = tempEnd.format(DATETIME_FORMAT)
              break
            }
          }
        }
      }
    }

    let hasConflict = false
    let slotId = schedulerData._getEventSlotId(eventItem)
    let slotName = undefined
    let slot = schedulerData.getSlotById(slotId)
    if (slot) slotName = slot.name
    if (config.checkConflict) {
      let start = localeMoment(eventItem.start),
        end = localeMoment(newEnd)

      events.forEach(e => {
        if (
          schedulerData._getEventSlotId(e) === slotId &&
          e.id !== eventItem.id
        ) {
          let eStart = localeMoment(e.start),
            eEnd = localeMoment(e.end)
          if (
            (start >= eStart && start < eEnd) ||
            (end > eStart && end <= eEnd) ||
            (eStart >= start && eStart < end) ||
            (eEnd > start && eEnd <= end)
          )
            hasConflict = true
        }
      })
    }

    if (hasConflict) {
      const { conflictOccurred, left, top, width } = this.props
      this.setState({
        left: left,
        top: top,
        width: width
      })

      if (conflictOccurred != undefined) {
        conflictOccurred(
          schedulerData,
          'EndResize',
          eventItem,
          DnDTypes.EVENT,
          slotId,
          slotName,
          eventItem.start,
          newEnd
        )
      } else {
        console.log(
          'Conflict occurred, set conflictOccurred func in Scheduler to handle it'
        )
      }

      this.subscribeResizeEvent(this.props)
    } else {
      if (updateEventEnd != undefined)
        updateEventEnd(schedulerData, eventItem, newEnd)
    }
  }

  render() {
    const {
      eventItem,
      isStart,
      isEnd,
      isInPopover,
      schedulerData,
      isDragging,
      connectDragSource,
      connectDragPreview,
      renderEventItem
    } = this.props
    const { config, localeMoment } = schedulerData
    const { left, width, top } = this.state
    let bgColor = config.defaultEventBgColor
    if (eventItem.bgColor) bgColor = eventItem.bgColor

    let titleText = schedulerData.behaviors.getEventTextFunc(
      schedulerData,
      eventItem
    )
    let content = (
      <EventItemPopover
        {...this.props}
        eventItem={eventItem}
        title={eventItem.title}
        startTime={eventItem.start}
        endTime={eventItem.end}
        statusColor={bgColor}
      />
    )
    let start = localeMoment(eventItem.start)
    let eventTitle = isInPopover
      ? `${start.format('HH:mm')} ${titleText}`
      : titleText
    let startResizeDiv = <div />
    if (this.startResizable(this.props)) {
      startResizeDiv = (
        <div
          className="event-resizer event-start-resizer"
          ref={ref => (this.startResizer = ref)}
        />
      )
    }

    let endResizeDiv = <div />
    if (this.endResizable(this.props)) {
      endResizeDiv = (
        <div
          className="event-resizer event-end-resizer"
          ref={ref => (this.endResizer = ref)}
        />
      )
    }
    const duration = `${localeMoment(eventItem.start).format(
      'hh:mm'
    )} - ${localeMoment(eventItem.end).format('hh:mm')}`
    const rowHeight = config.eventItemHeight / 2
    const itemHeight = eventItem.hasConflict
      ? rowHeight
      : config.eventItemHeight
    let eventItemTemplate = (
      <div
        // className={roundCls + ' event-item'}
        className={'event-item'}
        key={eventItem.id}
        style={{
          height: itemHeight,
          backgroundColor: bgColor,
          padding: '0 8px'
        }}
      >
        <span
          style={{
            lineHeight: `${rowHeight}px`
          }}
        >
          {eventTitle}
        </span>
        <span
          style={{
            lineHeight: `${rowHeight}px`
          }}
        >
          {duration}
        </span>
      </div>
    )
    if (renderEventItem != undefined)
      eventItemTemplate = renderEventItem(
        schedulerData,
        eventItem,
        bgColor,
        isStart,
        isEnd,
        'event-item',
        config.eventItemHeight,
        undefined
      )

    let eventItemContent = (
      <div
        className="timeline-event"
        style={{ left: left, width: width, top: top }}
        // onClick={() => {
        //   if (eventItemClick) eventItemClick(schedulerData, eventItem)
        // }}
      >
        {eventItemTemplate}
        {startResizeDiv}
        {endResizeDiv}
      </div>
    )

    return isDragging ? null : schedulerData._isResizing() ||
      config.eventItemPopoverEnabled == false ||
      eventItem.showPopover == false ? (
        <div>{connectDragPreview(connectDragSource(eventItemContent))}</div>
      ) : (
        <Popover placement="right" title={null} content={content} trigger="click">
          {connectDragPreview(connectDragSource(eventItemContent))}
        </Popover>
      )
  }

  startResizable = props => {
    const { eventItem, isInPopover, schedulerData } = props
    const { config } = schedulerData
    return (
      config.startResizable === true &&
      isInPopover === false &&
      (eventItem.resizable == undefined || eventItem.resizable !== false) &&
      (eventItem.startResizable == undefined ||
        eventItem.startResizable !== false)
    )
  }

  endResizable = props => {
    const { eventItem, isInPopover, schedulerData } = props
    const { config } = schedulerData
    return (
      config.endResizable === true &&
      isInPopover === false &&
      (eventItem.resizable == undefined || eventItem.resizable !== false) &&
      (eventItem.endResizable == undefined || eventItem.endResizable !== false)
    )
  }

  subscribeResizeEvent = props => {
    if (this.startResizer != undefined) {
      this.startResizer.removeEventListener(
        'mousedown',
        this.initStartDrag,
        false
      )
      if (this.startResizable(props))
        this.startResizer.addEventListener(
          'mousedown',
          this.initStartDrag,
          false
        )
    }
    if (this.endResizer != undefined) {
      this.endResizer.removeEventListener('mousedown', this.initEndDrag, false)
      if (this.endResizable(props))
        this.endResizer.addEventListener('mousedown', this.initEndDrag, false)
    }
  }
}

export default EventItem
