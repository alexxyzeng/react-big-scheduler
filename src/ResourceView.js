import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ResourceListView from './ResourceListView'

class ResourceView extends PureComponent {
  constructor(props) {
    super(props)
    const {
      resourceTableWidth,
      resourceScrollbarWidth,
      contentScrollbarWidth
    } = props
    this.resourceContentStyle = {
      overflowX: 'auto',
      overflowY: 'auto',
      width: resourceTableWidth + resourceScrollbarWidth - 2,
      margin: `0px -${contentScrollbarWidth}px 0px 0px`
    }
  }

  render() {
    const {
      resourceTableWidth,
      tableHeaderHeight,
      contentScrollbarHeight,
      contentScrollbarWidth,
      resourceScrollbarWidth,
      resourcePaddingBottom,
      renderData,
      resourceColumns
    } = this.props
    const resourceContentStyle = {
      overflowX: 'auto',
      overflowY: 'auto',
      width: resourceTableWidth + resourceScrollbarWidth - 2,
      margin: `0px -${contentScrollbarWidth}px 0px 0px`
    }
    return (
      <div className="resource-view">
        <div
          style={{
            overflow: 'hidden',
            borderBottom: '1px solid #e9e9e9',
            height: tableHeaderHeight
          }}
        >
          <div
            style={{
              overflowX: 'scroll',
              overflowY: 'hidden',
              margin: `0px 0px -${contentScrollbarHeight}px`
            }}
          >
            <table className="resource-table">
              <thead>
                <tr style={{ height: tableHeaderHeight }}>
                  <th className="header3-text" style={{ width: 120 }}>
                    {'会议室列表'}
                  </th>
                  <th className="header3-text" style={{ width: 100 }}>
                    {'容量'}
                  </th>
                  <th className="header3-text" style={{ width: 100 }}>
                    {'容量'}
                  </th>
                </tr>
              </thead>
            </table>
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
            renderData={renderData}
            resourceColumns={resourceColumns}
            contentScrollbarHeight={resourcePaddingBottom}
          />
        </div>
      </div>
    )
  }
}

ResourceView.propTypes = {
  resourceTableWidth: PropTypes.number,
  tableHeaderHeight: PropTypes.number,
  contentScrollbarHeight: PropTypes.number,
  contentScrollbarWidth: PropTypes.number,
  resourceScrollbarWidth: PropTypes.number,
  resourcePaddingBottom: PropTypes.number,
  renderData: PropTypes.object,
  resourceColumns: PropTypes.array
}

export default ResourceView
