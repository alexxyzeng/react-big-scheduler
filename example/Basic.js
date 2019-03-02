import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
//import moment from 'moment'
//import 'moment/locale/zh-cn';
import 'antd/lib/style/index.less'; //Add this code for locally example
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT,
  DemoData
} from '../src/index';
import Nav from './Nav';
import Tips from './Tips';
import ViewSrcCode from './ViewSrcCode';
import withDragDropContext from './withDnDContext';

class Basic extends Component {
  constructor(props) {
    super(props);

    //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
    let schedulerData = new SchedulerData(
      '2019-03-01',
      ViewTypes.Day,
      false,
      false,
      { checkConflict: true }
    );
    schedulerData.localeMoment.locale('cnb');
    schedulerData.setResources(DemoData.resources);
    schedulerData.setEvents(DemoData.events);
    this.state = {
      viewModel: schedulerData
    };
  }

  render() {
    const { viewModel } = this.state;
    return (
      <div>
        <div>
          <h3 style={{ textAlign: 'center' }}>Basic example</h3>
          <Scheduler
            schedulerData={viewModel}
            prevClick={this.prevClick}
            nextClick={this.nextClick}
            onSelectDate={this.onSelectDate}
            onViewChange={this.onViewChange}
            eventItemClick={this.eventClicked}
            viewEventClick={this.ops1}
            viewEventText="Ops 1"
            viewEvent2Text="Ops 2"
            viewEvent2Click={this.ops2}
            updateEventStart={this.updateEventStart}
            updateEventEnd={this.updateEventEnd}
            moveEvent={this.moveEvent}
            newEvent={this.newEvent}
            // onScrollLeft={this.onScrollLeft}
            // onScrollRight={this.onScrollRight}
            // onScrollTop={this.onScrollTop}
            // onScrollBottom={this.onScrollBottom}
            // slotClickedFunc={this.onSlotClicked}
          />
        </div>
        <Tips />
      </div>
    );
  }

  prevClick = schedulerData => {
    schedulerData.prev();
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  nextClick = schedulerData => {
    schedulerData.next();
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  eventClicked = (schedulerData, event) => {
    alert(
      `You just clicked an event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  ops1 = (schedulerData, event) => {
    alert(
      `You just executed ops1 to event: {id: ${event.id}, title: ${
        event.title
      }}`
    );
  };

  ops2 = (schedulerData, event) => {
    alert(
      `You just executed ops2 to event: {id: ${event.id}, title: ${
        event.title
      }}`
    );
  };

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    if (
      confirm(
        `Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`
      )
    ) {
      let newFreshId = 0;
      schedulerData.events.forEach(item => {
        if (item.id >= newFreshId) newFreshId = item.id + 1;
      });

      let newEvent = {
        id: newFreshId,
        title: 'New event ',
        start: start,
        end: end,
        resourceId: slotId,
        bgColor: '#31C58D'
      };
      schedulerData.addEvent(newEvent);
      this.setState({
        viewModel: schedulerData
      });
    }
  };

  updateEventStart = (schedulerData, event, newStart) => {
    console.log('update event start');
    if (
      confirm(
        `Do you want to adjust the start of the event? {eventId: ${
          event.id
        }, eventTitle: ${event.title}, newStart: ${newStart}}`
      )
    ) {
      schedulerData.updateEventStart(event, newStart);
    }
    this.setState({
      viewModel: schedulerData
    });
  };

  updateEventEnd = (schedulerData, event, newEnd) => {
    if (
      confirm(
        `Do you want to adjust the end of the event? {eventId: ${
          event.id
        }, eventTitle: ${event.title}, newEnd: ${newEnd}}`
      )
    ) {
      schedulerData.updateEventEnd(event, newEnd);
    }
    this.setState({
      viewModel: schedulerData
    });
    console.log('update event end');
    //  计算偏移值
  };

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    if (
      confirm(
        `Do you want to move the event? {eventId: ${event.id}, eventTitle: ${
          event.title
        }, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`
      )
    ) {
      schedulerData.moveEvent(event, slotId, slotName, start, end);
      this.setState({
        viewModel: schedulerData
      });
    }
  };

  onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    // if (schedulerData.viewType === ViewTypes.Day) {
    //   schedulerData.next();
    //   schedulerData.setEvents(DemoData.events);
    //   this.setState({
    //     viewModel: schedulerData
    //   });
    //   schedulerContent.scrollLeft = maxScrollLeft - 10;
    // }
  };

  onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    // if (schedulerData.viewType === ViewTypes.Day) {
    //   schedulerData.prev();
    //   schedulerData.setEvents(DemoData.events);
    //   this.setState({
    //     viewModel: schedulerData
    //   });
    //   schedulerContent.scrollLeft = 10;
    // }
  };

  onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log('onScrollTop');
  };

  onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log('onScrollBottom');
  };
}

export default withDragDropContext(Basic);
