import React from 'react'

import { millSecondsInMinute } from './utils/const'

class CurrentTimeView extends React.PureComponent {
  constructor(props) {
    super(props)
    this.timer = null
    const left = this.getTimeViewLeft()
    this.state = { left: left }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const left = this.getTimeViewLeft()
      this.setState({ left })
    }, millSecondsInMinute)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null
  }

  getTimeViewLeft() {
    const currentDate = new Date()
    const hours = currentDate.getHours()
    const mins = currentDate.getMinutes()
    const left = (hours * 4 + mins / 15) * 15
    return left
  }

  render() {
    const { height = '100%' } = this.props
    const { left } = this.state
    return (
      <div
        style={{
          position: 'absolute',
          width: 1,
          backgroundColor: 'red',
          top: 0,
          left: left,
          height: height,
          zIndex: 100
        }}
      />
    )
  }
}

export default CurrentTimeView
