export interface Event {
  id: number
  start: number | string
  end: number | string
  resourceId: string
  title: string
  //  TODO: 包含所有的内容信息
  // content: 
  resizable: boolean
  movable: boolean
  startResizable: boolean
  endResizable: boolean,
  type: number
}