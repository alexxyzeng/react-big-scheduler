/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Icon from 'antd/lib/icon'
import 'antd/lib/select/style/index.css'
import 'antd/lib/grid/style/index.css'
import Radio from 'antd/lib/radio'
import 'antd/lib/radio/style/index.css'
import Popover from 'antd/lib/popover'
import 'antd/lib/popover/style/index.css'
import Calendar from 'antd/lib/calendar'
import 'antd/lib/calendar/style/index.css'
import EventItem from './EventItem'
import DnDSource from './DnDSource'
import DnDContext from './DnDContext'
import ResourceListView from './ResourceListView'
import TimeLineView from './TimeLineView'
import BodyView from './BodyView'
import ResourceEvents from './ResourceEvents'
import AgendaView from './AgendaView'
import AddMorePopover from './AddMorePopover'
import HeaderView from './HeaderView'
import ViewTypes from './ViewTypes'
import CellUnits from './CellUnits'
import SummaryPos from './SummaryPos'
import SchedulerData from './SchedulerData'
import DemoData from './DemoData'
import ResourceHeaderView from './ResourceHeaderView'
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class Scheduler extends Component {
  constructor(props) {
    super(props)

    const { schedulerData, dndSources, size, resourceColumns } = props
    this.resourceWidth = resourceColumns.reduce((prev, next) => {
      return prev + next.width || 60
    }, 0)
    let sources = []
    sources.push(
      new DnDSource(props => {
        return props.eventItem
      }, EventItem)
    )
    if (dndSources != undefined && dndSources.length > 0) {
      sources = [...sources, ...dndSources]
    }
    let dndContext = new DnDContext(sources, ResourceEvents)

    this.currentArea = -1
    schedulerData.setDocumentSize(size)
    this.state = {
      visible: false,
      dndContext: dndContext,
      contentHeight: schedulerData.getSchedulerContentDesiredHeight(),
      contentScrollbarHeight: 17,
      contentScrollbarWidth: 17,
      resourceScrollbarHeight: 17,
      resourceScrollbarWidth: 17,

      documentWidth: document.documentElement.clientWidth,
      documentHeight: document.documentElement.clientHeight
    }

    this.scrollTop = 0
    this.scrollLeft = 0

    if (schedulerData.isSchedulerResponsive()) {
      window.onresize = this.onWindowResize
    }
  }

  //  TODO: 修改resize事件
  onWindowResize = e => {
    const { schedulerData } = this.props
    schedulerData._setDocumentWidth(document.documentElement.clientWidth)
    this.setState({
      documentWidth: document.documentElement.clientWidth,
      documentHeight: document.documentElement.clientHeight
    })
  }

  componentDidMount(props, state) {
    this.resolveScrollbarSize()
  }

  componentDidUpdate(props, state) {
    this.resolveScrollbarSize()

    const { schedulerData } = this.props
    const { localeMoment, behaviors } = schedulerData
    if (
      schedulerData.getScrollToSpecialMoment() &&
      !!behaviors.getScrollSpecialMomentFunc
    ) {
      if (
        !!this.schedulerContent &&
        this.schedulerContent.scrollWidth > this.schedulerContent.clientWidth
      ) {
        let start = localeMoment(schedulerData.startDate).startOf('day'),
          end = localeMoment(schedulerData.endDate).endOf('day'),
          specialMoment = behaviors.getScrollSpecialMomentFunc(
            schedulerData,
            start,
            end
          )
        if (specialMoment >= start && specialMoment <= end) {
          let index = 0
          schedulerData.headers.forEach(item => {
            let header = localeMoment(item.time)
            if (specialMoment >= header) index++
          })
          this.schedulerContent.scrollLeft =
            (index - 1) * schedulerData.getContentCellWidth()

          schedulerData.setScrollToSpecialMoment(false)
        }
      }
    }
  }

  render() {
    const {
      schedulerData,
      leftCustomHeader,
      rightCustomHeader,
      nonAgendaCellHeaderTemplateResolver,
      size: { height },
      resourceColumns
    } = this.props
    const { viewType, showAgenda, isEventPerspective, config } = schedulerData
    const schedulerWidth = schedulerData.getSchedulerWidth()
    //  设置时间标签
    let dateLabel = schedulerData.getDateLabel()
    //  设置时间切换按钮
    let defaultValue = `${viewType}${showAgenda ? 1 : 0}${
      isEventPerspective ? 1 : 0
    }`
    //  TODO: 重构列表代码
    let tbodyContent = this.renderBodyContent(
      schedulerData,
      nonAgendaCellHeaderTemplateResolver,
      schedulerWidth,
      height,
      resourceColumns
    )

    return (
      <table
        id="RBS-Scheduler-root"
        className="scheduler"
        style={{ width: `${schedulerWidth}px` }}
      >
        <thead>
          <tr>
            <td colSpan="2">
              <HeaderView
                config={config}
                dateLabel={dateLabel}
                defaultValue={defaultValue}
                goBack={this.goBack}
                goNext={this.goNext}
                visible={this.state.visible}
                handleVisibleChange={this.handleVisibleChange}
                onViewChange={this.onViewChange}
                onSelect={this.onSelect}
              />
            </td>
          </tr>
        </thead>
        <tbody>{tbodyContent}</tbody>
      </table>
    )
  }

  resolveScrollbarSize = () => {
    const { schedulerData } = this.props
    let contentScrollbarHeight = 17,
      contentScrollbarWidth = 17,
      resourceScrollbarHeight = 17,
      resourceScrollbarWidth = 17,
      contentHeight = schedulerData.getSchedulerContentDesiredHeight()
    if (this.schedulerContent) {
      contentScrollbarHeight =
        this.schedulerContent.offsetHeight - this.schedulerContent.clientHeight
      contentScrollbarWidth =
        this.schedulerContent.offsetWidth - this.schedulerContent.clientWidth
    }
    if (this.schedulerResource) {
      resourceScrollbarHeight =
        this.schedulerResource.offsetHeight -
        this.schedulerResource.clientHeight
      resourceScrollbarWidth =
        this.schedulerResource.offsetWidth - this.schedulerResource.clientWidth
    }
    if (
      !!this.schedulerContentBgTable &&
      !!this.schedulerContentBgTable.offsetHeight
    ) {
      contentHeight = this.schedulerContentBgTable.offsetHeight
    }

    let tmpState = {}
    let needSet = false
    if (contentScrollbarHeight != this.state.contentScrollbarHeight) {
      tmpState = {
        ...tmpState,
        contentScrollbarHeight: contentScrollbarHeight
      }
      needSet = true
    }
    if (contentScrollbarWidth != this.state.contentScrollbarWidth) {
      tmpState = { ...tmpState, contentScrollbarWidth: contentScrollbarWidth }
      needSet = true
    }
    if (contentHeight != this.state.contentHeight) {
      tmpState = { ...tmpState, contentHeight: contentHeight }
      needSet = true
    }
    if (resourceScrollbarHeight != this.state.resourceScrollbarHeight) {
      tmpState = {
        ...tmpState,
        resourceScrollbarHeight: resourceScrollbarHeight
      }
      needSet = true
    }
    if (resourceScrollbarWidth != this.state.resourceScrollbarWidth) {
      tmpState = {
        ...tmpState,
        resourceScrollbarWidth: resourceScrollbarWidth
      }
      needSet = true
    }
    if (needSet) this.setState(tmpState)
  }

  schedulerHeadRef = element => {
    this.schedulerHead = element
  }

  onSchedulerHeadMouseOver = () => {
    this.currentArea = 2
  }

  onSchedulerHeadMouseOut = () => {
    this.currentArea = -1
  }

  onSchedulerHeadScroll = (proxy, event) => {
    if (
      (this.currentArea === 2 || this.currentArea === -1) &&
      this.schedulerContent.scrollLeft != this.schedulerHead.scrollLeft
    ) {
      this.schedulerContent.scrollLeft = this.schedulerHead.scrollLeft
    }
  }

  schedulerResourceRef = element => {
    this.schedulerResource = element
  }

  onSchedulerResourceMouseOver = () => {
    this.currentArea = 1
  }

  onSchedulerResourceMouseOut = () => {
    this.currentArea = -1
  }

  onSchedulerResourceScroll = (proxy, event) => {
    if (
      (this.currentArea === 1 || this.currentArea === -1) &&
      this.schedulerContent.scrollTop != this.schedulerResource.scrollTop
    )
      this.schedulerContent.scrollTop = this.schedulerResource.scrollTop
  }

  schedulerContentRef = element => {
    this.schedulerContent = element
  }

  schedulerContentBgTableRef = element => {
    this.schedulerContentBgTable = element
  }

  onSchedulerContentMouseOver = () => {
    this.currentArea = 0
  }

  onSchedulerContentMouseOut = () => {
    this.currentArea = -1
  }

  onSchedulerContentScroll = (proxy, event) => {
    if (this.currentArea === 0 || this.currentArea === -1) {
      if (this.schedulerHead.scrollLeft != this.schedulerContent.scrollLeft)
        this.schedulerHead.scrollLeft = this.schedulerContent.scrollLeft
      if (this.schedulerResource.scrollTop != this.schedulerContent.scrollTop)
        this.schedulerResource.scrollTop = this.schedulerContent.scrollTop
    }

    const {
      schedulerData,
      onScrollLeft,
      onScrollRight,
      onScrollTop,
      onScrollBottom
    } = this.props
    const { scrollLeft, scrollTop } = this
    if (this.schedulerContent.scrollLeft !== scrollLeft) {
      if (this.schedulerContent.scrollLeft === 0 && onScrollLeft != undefined) {
        onScrollLeft(
          schedulerData,
          this.schedulerContent,
          this.schedulerContent.scrollWidth - this.schedulerContent.clientWidth
        )
      }
      if (
        this.schedulerContent.scrollLeft ===
          this.schedulerContent.scrollWidth -
            this.schedulerContent.clientWidth &&
        onScrollRight != undefined
      ) {
        onScrollRight(
          schedulerData,
          this.schedulerContent,
          this.schedulerContent.scrollWidth - this.schedulerContent.clientWidth
        )
      }
    } else if (this.schedulerContent.scrollTop !== scrollTop) {
      if (this.schedulerContent.scrollTop === 0 && onScrollTop != undefined) {
        onScrollTop(
          schedulerData,
          this.schedulerContent,
          this.schedulerContent.scrollHeight -
            this.schedulerContent.clientHeight
        )
      }
      if (
        this.schedulerContent.scrollTop ===
          this.schedulerContent.scrollHeight -
            this.schedulerContent.clientHeight &&
        onScrollBottom != undefined
      ) {
        onScrollBottom(
          schedulerData,
          this.schedulerContent,
          this.schedulerContent.scrollHeight -
            this.schedulerContent.clientHeight
        )
      }
    }
    this.scrollLeft = scrollLeft
    this.scrollTop = scrollTop
  }

  onViewChange = e => {
    // TODO: 顶部时间导航这里有bug
    const { onViewChange, schedulerData } = this.props
    let viewType = parseInt(e.target.value.charAt(0))
    let showAgenda = e.target.value.charAt(1) === '1'
    let isEventPerspective = e.target.value.charAt(2) === '1'
    onViewChange(schedulerData, {
      viewType: viewType,
      showAgenda: showAgenda,
      isEventPerspective: isEventPerspective
    })
  }

  goNext = () => {
    const { nextClick, schedulerData } = this.props
    nextClick(schedulerData)
  }

  goBack = () => {
    const { prevClick, schedulerData } = this.props
    prevClick(schedulerData)
  }

  handleVisibleChange = visible => {
    this.setState({ visible })
  }

  onSelect = date => {
    this.setState({
      visible: false
    })

    const { onSelectDate, schedulerData } = this.props
    onSelectDate(schedulerData, date)
  }

  renderBodyContent(
    schedulerData,
    nonAgendaCellHeaderTemplateResolver,
    width,
    height,
    resourceColumns
  ) {
    const { renderData, showAgenda, config } = schedulerData
    const renderRowHeight = renderData.reduce((prev, next) => {
      return prev + next.rowHeight
    }, 0)
    const cellHeight = schedulerData.getContentCellHeight()
    const extraBlankCount = (height - config.tableHeaderHeight - renderRowHeight) / cellHeight
    if (showAgenda) {
      return <AgendaView {...this.props} />
    }
    let tbodyContent = <tr />
    //  TODO: 左侧导航信息列表，研究如何自定义内容和宽高
    //   let resourceTableWidth = schedulerData.getResourceTableWidth();
    let resourceTableWidth = this.resourceWidth
    let schedulerContainerWidth = width - resourceTableWidth + 1
    let schedulerWidth = schedulerData.getContentTableWidth() - 1
    let DndResourceEvents = this.state.dndContext.getDropTarget()
    let eventDndSource = this.state.dndContext.getDndSource()
    let resourceEventsList = renderData.map(item => {
      return (
        <DndResourceEvents
          {...this.props}
          key={item.slotId}
          resourceEvents={item}
          dndSource={eventDndSource}
        />
      )
    })
    const {
      contentScrollbarHeight,
      contentScrollbarWidth,
      resourceScrollbarHeight,
      resourceScrollbarWidth,
      contentHeight
    } = this.state
    let resourcePaddingBottom =
      resourceScrollbarHeight === 0 ? contentScrollbarHeight : 0
    let contentPaddingBottom =
      contentScrollbarHeight === 0 ? resourceScrollbarHeight : 0
    let schedulerContentStyle = {
      overflow: 'auto',
      margin: '0px',
      position: 'relative',
      paddingBottom: contentPaddingBottom
    }
    let resourceContentStyle = {
      overflowX: 'auto',
      overflowY: 'auto',
      width: resourceTableWidth + resourceScrollbarWidth - 2,
      margin: `0px -${contentScrollbarWidth}px 0px 0px`
    }
    if (height > 0) {
      schedulerContentStyle = {
        ...schedulerContentStyle,
        height: height - config.tableHeaderHeight
      }
      resourceContentStyle = {
        ...resourceContentStyle,
        height: height - config.tableHeaderHeight
      }
    }
    let resourceName = schedulerData.isEventPerspective
      ? config.taskName
      : config.resourceName
    tbodyContent = (
      // 左侧列表需要增加功能
      <tr>
        {/* TODO: 抽离ResourceView */}
        <td style={{ width: resourceTableWidth, verticalAlign: 'top' }}>
          <div className="resource-view">
            <div
              style={{
                overflow: 'hidden',
                borderBottom: '1px solid #e9e9e9',
                height: config.tableHeaderHeight
              }}
            >
              <div
                style={{
                  overflowX: 'scroll',
                  overflowY: 'hidden',
                  margin: `0px 0px -${contentScrollbarHeight}px`
                }}
              >
                <ResourceHeaderView
                  resourceColumns={resourceColumns}
                  tableHeaderHeight={config.tableHeaderHeight}
                />
              </div>
            </div>
            <div
              style={resourceContentStyle}
              ref={this.schedulerResourceRef}
              onMouseOver={this.onSchedulerResourceMouseOver}
              onMouseOut={this.onSchedulerResourceMouseOut}
              onScroll={this.onSchedulerResourceScroll}
            >
              <ResourceListView
                extraBlankCount={extraBlankCount}
                cellHeight={cellHeight}
                renderData={renderData}
                resourceColumns={resourceColumns}
                contentScrollbarHeight={resourcePaddingBottom}
              />
            </div>
          </div>
        </td>
        <td>
          <div
            className="scheduler-view"
            style={{ width: schedulerContainerWidth, verticalAlign: 'top' }}
          >
            <div
              style={{
                overflow: 'hidden',
                borderBottom: '1px solid #e9e9e9',
                height: config.tableHeaderHeight
              }}
            >
              <div
                style={{
                  overflowX: 'scroll',
                  overflowY: 'hidden',
                  margin: `0px 0px -${contentScrollbarHeight}px`
                }}
                ref={this.schedulerHeadRef}
                onMouseOver={this.onSchedulerHeadMouseOver}
                onMouseOut={this.onSchedulerHeadMouseOut}
                onScroll={this.onSchedulerHeadScroll}
              >
                <div
                  style={{
                    paddingRight: `${contentScrollbarWidth}px`,
                    width: schedulerWidth + contentScrollbarWidth
                  }}
                >
                  <TimeLineView
                    schedulerData={schedulerData}
                    nonAgendaCellHeaderTemplateResolver={
                      nonAgendaCellHeaderTemplateResolver
                    }
                  />
                </div>
              </div>
            </div>
            <div
              style={schedulerContentStyle}
              ref={this.schedulerContentRef}
              onMouseOver={this.onSchedulerContentMouseOver}
              onMouseOut={this.onSchedulerContentMouseOut}
              onScroll={this.onSchedulerContentScroll}
            >
              <div style={{ width: schedulerWidth, height: contentHeight }}>
                {/* 会议信息 */}
                <div className="scheduler-content">
                  <table className="scheduler-content-table">
                    <tbody>{resourceEventsList}</tbody>
                  </table>
                </div>
                {/* 背景 */}
                <BodyView
                  schedulerWidth={schedulerWidth}
                  schedulerData={schedulerData}
                  extraBlankCount={extraBlankCount}
                  cellHeight={cellHeight}
                  type={schedulerData.viewType}
                />
              </div>
            </div>
          </div>
        </td>
      </tr>
    )
    return tbodyContent
  }
}

export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export {
  SchedulerData,
  ViewTypes,
  CellUnits,
  SummaryPos,
  DnDSource,
  DnDContext,
  AddMorePopover,
  DemoData
}
export default Scheduler

Scheduler.propTypes = {
  //  列表数据
  schedulerData: PropTypes.object.isRequired,
  //  前一天
  prevClick: PropTypes.func.isRequired,
  //  后一天
  nextClick: PropTypes.func.isRequired,
  //  切换视图模型
  onViewChange: PropTypes.func.isRequired,
  //  选择日期
  onSelectDate: PropTypes.func.isRequired,
  onSetAddMoreState: PropTypes.func,
  //  更新会议开始时间
  updateEventStart: PropTypes.func,
  //  更新会议结束时间
  updateEventEnd: PropTypes.func,
  //  移动会议
  moveEvent: PropTypes.func,
  //  自定义左侧头部
  leftCustomHeader: PropTypes.object,
  //  自定义右侧头部
  rightCustomHeader: PropTypes.object,
  //  新建会议
  newEvent: PropTypes.func,
  subtitleGetter: PropTypes.func,
  //  会议点击事件
  eventItemClick: PropTypes.func,
  //  点击popover的文字和事件
  viewEventClick: PropTypes.func,
  viewEventText: PropTypes.string,
  viewEvent2Click: PropTypes.func,
  viewEvent2Text: PropTypes.string,
  //  冲突检查
  conflictOccurred: PropTypes.func,
  //  自定义事件模板
  eventItem: PropTypes.object,
  eventItemTemplateResolver: PropTypes.func,
  dndSources: PropTypes.array,
  slotClickedFunc: PropTypes.func,
  nonAgendaCellHeaderTemplateResolver: PropTypes.func,
  //  各个方向的滚动事件
  onScrollLeft: PropTypes.func,
  onScrollRight: PropTypes.func,
  onScrollTop: PropTypes.func,
  onScrollBottom: PropTypes.func,
  //  宽高
  size: PropTypes.object,
  //  是否显示当前时间
  showTimeIndicator: PropTypes.bool,
  resourceColumns: PropTypes.array
}
