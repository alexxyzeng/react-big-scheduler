import React, { PureComponent, Component } from 'react';
import { PropTypes } from 'prop-types';
import { ViewTypes } from './index';

class BodyView extends PureComponent {
  constructor(props) {
    super(props);
    const { schedulerData } = this.props;
    this.cellHeight = schedulerData.getContentCellHeight();
    this.headerHeight = schedulerData.getTableHeaderHeight();
  }

  static propTypes = {
    schedulerData: PropTypes.object.isRequired,
    schedulerWidth: PropTypes.number.isRequired
  };

  render() {
    const { schedulerData, schedulerWidth, height } = this.props;
    const { renderData, headers, config, behaviors } = schedulerData;

    let cellWidth = schedulerData.getContentCellWidth();
    //  TODO: 这里需要做优化
    let tableRows = renderData.map((item, index) => {
      const { rowHeight, slotId } = item;
      let rowCells = headers.map((header, index) => {
        let key = item.slotId + '_' + header.time;
        let style = index === headers.length - 1 ? {} : { width: cellWidth };
        if (!!header.nonWorkingTime)
          style = {
            ...style,
            backgroundColor: config.nonWorkingTimeBodyBgColor
          };
        if (!!behaviors.getNonAgendaViewBodyCellBgColorFunc) {
          let cellBgColor = behaviors.getNonAgendaViewBodyCellBgColorFunc(
            schedulerData,
            item.slotId,
            header
          );
          if (!!cellBgColor) style = { ...style, backgroundColor: cellBgColor };
        }
        return (
          <td key={key} style={style}>
            <div />
          </td>
        );
      });

      return (
        <tr key={item.slotId} style={{ height: rowHeight }}>
          {rowCells}
        </tr>
      );
    });

    const extraBlank =
      height - this.cellHeight * renderData.length - this.headerHeight;
    const blankToInsertCount = Math.ceil(extraBlank / this.cellHeight);

    return (
      <div className="scheduler-bg">
        <table
          className="scheduler-bg-table"
          style={{ width: schedulerWidth }}

          // ref={this.schedulerContentBgTableRef}
        >
          <tbody>{tableRows}</tbody>
        </table>
        {/* TODO: 增加占位背景图 */}
        {/* <div
          style={{
            width: schedulerWidth,
            height: `${this.cellHeight}px`,
            backgroundColor: 'lightGrey'
          }}
        />
        <div
          style={{
            width: schedulerWidth,
            height: `${this.cellHeight}px`,
            backgroundColor: 'lightGrey'
          }}
        /> */}
      </div>
    );
  }
}

export default BodyView;
