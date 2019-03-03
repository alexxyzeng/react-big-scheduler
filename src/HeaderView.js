import React from 'react'
import { Row, Col, Popover, Icon, Radio } from 'antd'
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

function HeaderView({
  config,
  calendarPopoverEnabled,
  popover,
  dateLabel,
  defaultValue,
  goBack,
  goNext,
  visible,
  handleVisibleChange,
  onViewChange
}) {
  const { headerEnabled, views } = config

  if (!headerEnabled) {
    return <div />
  }

  return (
    <Row
      type="flex"
      align="middle"
      justify="space-between"
      style={{ marginBottom: '24px' }}
    >
      <Col>
        <div className="header2-text">
          <Icon
            type="left"
            style={{ marginRight: '8px' }}
            className="icon-nav"
            onClick={goBack}
          />
          {calendarPopoverEnabled ? (
            <Popover
              content={popover}
              placement="bottom"
              trigger="click"
              visible={visible}
              onVisibleChange={handleVisibleChange}
            >
              <span
                className={'header2-text-label'}
                style={{ cursor: 'pointer' }}
              >
                {dateLabel}
              </span>
            </Popover>
          ) : (
            <span className={'header2-text-label'}>{dateLabel}</span>
          )}
          <Icon
            type="right"
            style={{ marginLeft: '8px' }}
            className="icon-nav"
            onClick={goNext}
          />
        </div>
      </Col>
      <Col>
        <RadioGroup
          defaultValue={defaultValue}
          size="default"
          onChange={onViewChange}
        >
          {getCalendarGroup(views)}
        </RadioGroup>
      </Col>
    </Row>
  )
}

export default React.memo(HeaderView)

const getCalendarGroup = views => {
  return views.map(item => {
    const key = `${item.viewType}${item.showAgenda ? 1 : 0}${
      item.isEventPerspective ? 1 : 0
    }`
    return (
      <RadioButton key={key} value={key}>
        <span style={{ margin: '0px 8px' }}>{item.viewName}</span>
      </RadioButton>
    )
  })
}
