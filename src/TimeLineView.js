import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { CellUnits } from './index';

class HeaderView extends PureComponent {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    schedulerData: PropTypes.object.isRequired,
    nonAgendaCellHeaderTemplateResolver: PropTypes.func
  };

  render() {
    const { schedulerData, nonAgendaCellHeaderTemplateResolver } = this.props;
    const { headers, cellUnit, config, localeMoment } = schedulerData;
    let headerHeight = schedulerData.getTableHeaderHeight();
    let cellWidth = schedulerData.getContentCellWidth();
    let minuteStepsInHour = schedulerData.getMinuteStepsInHour();

    let headerList = [];
    let style = {};
    if (cellUnit === CellUnits.Hour) {
      headers.forEach((item, index) => {
        if (index % minuteStepsInHour === 0) {
          let datetime = localeMoment(item.time);
          const isCurrentTime = datetime.isSame(new Date(), 'hour');
          style = !!item.nonWorkingTime
            ? {
                width: cellWidth * minuteStepsInHour,
                // color: config.nonWorkingTimeHeadColor,
                backgroundColor: config.nonWorkingTimeHeadBgColor
              }
            : { width: cellWidth * minuteStepsInHour };

          if (index === headers.length - minuteStepsInHour)
            style = !!item.nonWorkingTime
              ? {
                  // color: config.nonWorkingTimeHeadColor,
                  backgroundColor: config.nonWorkingTimeHeadBgColor
                }
              : {};

          let pFormattedList = config.nonAgendaDayCellHeaderFormat
            .split('|')
            .map(item => datetime.format(item));
          let element;

          if (typeof nonAgendaCellHeaderTemplateResolver === 'function') {
            element = nonAgendaCellHeaderTemplateResolver(
              schedulerData,
              item,
              pFormattedList,
              style
            );
          } else {
            const pList = pFormattedList.map((item, index) => (
              <div key={index}>{item}</div>
            ));
            element = (
              <th key={item.time} className="header3-text" style={style}>
                <div>{pList}</div>
              </th>
            );
          }

          headerList.push(element);
        }
      });
    } else {
      headerList = headers.map((item, index) => {
        let datetime = localeMoment(item.time);
        style = !!item.nonWorkingTime
          ? {
              width: cellWidth,
              color: config.nonWorkingTimeHeadColor,
              backgroundColor: config.nonWorkingTimeHeadBgColor
            }
          : { width: cellWidth };
        if (index === headers.length - 1)
          style = !!item.nonWorkingTime
            ? {
                color: config.nonWorkingTimeHeadColor,
                backgroundColor: config.nonWorkingTimeHeadBgColor
              }
            : {};

        let pFormattedList = config.nonAgendaOtherCellHeaderFormat
          .split('|')
          .map(item => datetime.format(item));

        if (typeof nonAgendaCellHeaderTemplateResolver === 'function') {
          return nonAgendaCellHeaderTemplateResolver(
            schedulerData,
            item,
            pFormattedList,
            style
          );
        }

        const pList = pFormattedList.map((item, index) => (
          <div key={index}>{item}</div>
        ));

        return (
          <th key={item.time} className="header3-text" style={style}>
            <div>{pList}</div>
          </th>
        );
      });
    }

    return (
      <table className="scheduler-bg-table">
        <thead>
          <tr style={{ height: headerHeight }}>{headerList}</tr>
        </thead>
      </table>
    );
  }
}

export default HeaderView;

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
