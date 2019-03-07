import ViewTypes from './ViewTypes'
import SummaryPos from './SummaryPos'

export default {
  schedulerWidth: '100%',
  besidesWidth: 20,
  schedulerMaxHeight: 640,
  tableHeaderHeight: 40,

  agendaResourceTableWidth: 160,
  agendaMaxEventWidth: 100,

  dayResourceTableWidth: 160,
  weekResourceTableWidth: '16%',
  monthResourceTableWidth: 160,
  quarterResourceTableWidth: 160,
  yearResourceTableWidth: 160,
  customResourceTableWidth: 160,

  dayCellWidth: 15,
  weekCellWidth: '12%',
  monthCellWidth: 120,
  quarterCellWidth: 120,
  yearCellWidth: 120,
  customCellWidth: 120,
  //  TODO: 修改关于显示最多会议数量的逻辑
  dayMaxEvents: 9999,
  weekMaxEvents: 9999,
  monthMaxEvents: 9999,
  quarterMaxEvents: 9999,
  yearMaxEvents: 9999,
  customMaxEvents: 9999,

  //  TODO: 考虑将这段配置移出
  eventItemHeight: 36,
  eventItemLineHeight: 38,
  nonAgendaSlotMinHeight: 0,
  dayStartFrom: 0,
  dayStopTo: 23,
  defaultEventBgColor: '#80C5F6',
  selectedAreaColor: '#C4DAF4',
  nonWorkingTimeHeadColor: '#999999',
  workingTimeHeadColor: '',
  // nonWorkingTimeHeadBgColor: '#fff0f6',
  // nonWorkingTimeBodyBgColor: '#fff0f6',
  focusTimeBgColor: '#999999',
  borderColor: '#E3F0FB',
  summaryColor: '#666',
  summaryPos: SummaryPos.TopRight,

  startResizable: true,
  endResizable: true,
  movable: true,
  creatable: true,
  crossResourceMove: false,
  checkConflict: true,
  scrollToSpecialMomentEnabled: true,
  eventItemPopoverEnabled: true,
  calendarPopoverEnabled: true,
  recurringEventsEnabled: true,
  headerEnabled: true,
  displayWeekend: true,
  relativeMove: true,
  resourceName: '会议室列表',
  taskName: 'Task Name',
  agendaViewHeader: 'Agenda',
  addMorePopoverHeaderFormat: 'MMM D, YYYY dddd',
  eventItemPopoverDateFormat: 'MMM D',
  nonAgendaDayCellHeaderFormat: 'HH:mm',
  nonAgendaOtherCellHeaderFormat: 'ddd M/D',

  minuteStep: 15,

  views: [
    {
      viewName: 'Day',
      viewType: ViewTypes.Day,
      showAgenda: false,
      isEventPerspective: false
    },
    {
      viewName: 'Week',
      viewType: ViewTypes.Week,
      showAgenda: false,
      isEventPerspective: false
    },
    {
      viewName: 'Month',
      viewType: ViewTypes.Month,
      showAgenda: false,
      isEventPerspective: false
    }
    // {
    //   viewName: 'Quarter',
    //   viewType: ViewTypes.Quarter,
    //   showAgenda: false,
    //   isEventPerspective: false
    // },
    // {
    //   viewName: 'Year',
    //   viewType: ViewTypes.Year,
    //   showAgenda: false,
    //   isEventPerspective: false
    // }
  ]
}
