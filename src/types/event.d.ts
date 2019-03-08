export interface Event {
  id: number;
  start: number | string;
  end: number | string;
  resourceId: string;
  title: string;
  //  TODO: 包含所有的内容信息
  // detail:
  resizable: boolean;
  movable: boolean;
  startResizable: boolean;
  endResizable: boolean;
  popoverVisible: boolean;
  conflict: boolean;
  backgroundColor: string;
}

// <Schedueler
//   ...
//   renderPopover={(event, schulderData, ...) => {}}  // popover content
//   renderCusomEvent={(event) => return React.Component.} // custom event item
