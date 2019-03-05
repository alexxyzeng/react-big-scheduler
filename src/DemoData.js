const DemoData = {
  resources: [
    { id: 'r0', name: 'Resource0', capacity: 10 },
    { id: 'r1', name: 'Resource1', capacity: 20 },
    { id: 'r2', name: 'Resource2', capacity: 15 },
    { id: 'r3', name: 'Resource3', capacity: 18 },
    { id: 'r4', name: 'Resource4', capacity: 13 },
    { id: 'r5', name: 'Resource5', capacity: 6 },
    { id: 'r6', name: 'Resource6', capacity: 50 },
    { id: 'r7', name: 'Resource7', capacity: 12 },
    { id: 'r8', name: 'Resource8', capacity: 20 },
    { id: 'r9', name: 'Resource9', capacity: 33 },
    { id: 'r10', name: 'Resource10', capacity: 6 },
    { id: 'r11', name: 'Resource11', capacity: 8 },
    { id: 'r12', name: 'Resource12', capacity: 24 },
    { id: 'r13', name: 'Resource13', capacity: 28 },
    { id: 'r14', name: 'Resource14', capacity: 32 },
    { id: 'r15', name: 'Resource15', capacity: 14 },
    { id: 'r16', name: 'Resource16', capacity: 8 },
    { id: 'r17', name: 'Resource17', capacity: 22 },
    { id: 'r18', name: 'Resource18', capacity: 6 },
    { id: 'r19', name: 'Resource19', capacity: 50 },
    { id: 'r20', name: 'Resource20', capacity: 36 }
    // { id: 'r21', name: 'Resource21' },
    // { id: 'r22', name: 'Resource22' },
    // { id: 'r23', name: 'Resource23' },
    // { id: 'r24', name: 'Resource24' },
    // { id: 'r25', name: 'Resource25' },
    // { id: 'r26', name: 'Resource26' },
    // { id: 'r27', name: 'Resource27' },
    // { id: 'r28', name: 'Resource28' },
    // { id: 'r29', name: 'Resource29' },
    // { id: 'r30', name: 'Resource30' },
    // { id: 'r31', name: 'Resource31' },
    // { id: 'r32', name: 'Resource32' },
    // { id: 'r33', name: 'Resource33' },
    // { id: 'r34', name: 'Resource34' },
    // { id: 'r35', name: 'Resource35' },
    // { id: 'r36', name: 'Resource36' },
    // { id: 'r37', name: 'Resource37' },
    // { id: 'r38', name: 'Resource38' },
    // { id: 'r39', name: 'Resource39' },
    // { id: 'r40', name: 'Resource40' },
    // { id: 'r41', name: 'Resource41' },
    // { id: 'r42', name: 'Resource42' },
    // { id: 'r43', name: 'Resource43' },
    // { id: 'r44', name: 'Resource44' },
    // { id: 'r45', name: 'Resource45' },
    // { id: 'r46', name: 'Resource46' },
    // { id: 'r47', name: 'Resource47' },
    // { id: 'r48', name: 'Resource48' },
    // { id: 'r49', name: 'Resource49' },
    // { id: 'r50', name: 'Resource50' },
    // { id: 'r51', name: 'Resource51' },
    // { id: 'r52', name: 'Resource52' },
    // { id: 'r53', name: 'Resource53' },
    // { id: 'r54', name: 'Resource54' },
    // { id: 'r55', name: 'Resource55' },
    // { id: 'r56', name: 'Resource56' },
    // { id: 'r57', name: 'Resource57' },
    // { id: 'r58', name: 'Resource58' },
    // { id: 'r59', name: 'Resource59' },
    // { id: 'r60', name: 'Resource60' },
    // { id: 'r61', name: 'Resource61' },
    // { id: 'r62', name: 'Resource62' },
    // { id: 'r63', name: 'Resource63' },
    // { id: 'r64', name: 'Resource64' },
    // { id: 'r65', name: 'Resource65' },
    // { id: 'r66', name: 'Resource66' },
    // { id: 'r67', name: 'Resource67' },
    // { id: 'r68', name: 'Resource68' },
    // { id: 'r69', name: 'Resource69' },
    // { id: 'r70', name: 'Resource70' },
    // { id: 'r71', name: 'Resource71' },
    // { id: 'r72', name: 'Resource72' },
    // { id: 'r73', name: 'Resource73' },
    // { id: 'r74', name: 'Resource74' },
    // { id: 'r75', name: 'Resource75' },
    // { id: 'r76', name: 'Resource76' },
    // { id: 'r77', name: 'Resource77' },
    // { id: 'r78', name: 'Resource78' },
    // { id: 'r79', name: 'Resource79' },
    // { id: 'r80', name: 'Resource80' },
    // { id: 'r81', name: 'Resource81' },
    // { id: 'r82', name: 'Resource82' },
    // { id: 'r83', name: 'Resource83' },
    // { id: 'r84', name: 'Resource84' },
    // { id: 'r85', name: 'Resource85' },
    // { id: 'r86', name: 'Resource86' },
    // { id: 'r87', name: 'Resource87' },
    // { id: 'r88', name: 'Resource88' },
    // { id: 'r89', name: 'Resource89' },
    // { id: 'r90', name: 'Resource90' },
    // { id: 'r91', name: 'Resource91' },
    // { id: 'r92', name: 'Resource92' },
    // { id: 'r93', name: 'Resource93' },
    // { id: 'r94', name: 'Resource94' },
    // { id: 'r95', name: 'Resource95' },
    // { id: 'r96', name: 'Resource96' },
    // { id: 'r97', name: 'Resource97' },
    // { id: 'r98', name: 'Resource98' },
    // { id: 'r99', name: 'Resource99' }
  ],
  events: [
    {
      id: 1,
      start: '2017-12-18 09:30:00',
      end: '2017-12-19 23:30:00',
      resourceId: 'r1',
      title: 'I am finished',
      bgColor: '#D9D9D9',
      showPopover: false,
      resizable: false
    },
    {
      id: 2,
      start: '2017-12-18 12:30:00',
      end: '2017-12-18 23:30:00',
      resourceId: 'r2',
      title: 'I am not resizable',
      resizable: false
    },
    {
      id: 3,
      start: '2017-12-19 12:30:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r3',
      title: 'I am not movable',
      movable: false
    },
    {
      id: 4,
      start: '2017-12-19 14:30:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r4',
      title: 'I am not start-resizable',
      startResizable: false
    },
    {
      id: 5,
      start: '2017-12-19 15:30:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r5',
      title: 'I am not end-resizable',
      endResizable: false
    },
    {
      id: 6,
      start: '2017-12-19 15:35:00',
      end: '2017-12-19 23:30:00',
      resourceId: 'r6',
      title: 'I am normal'
    },
    {
      id: 7,
      start: '2017-12-19 15:40:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r7',
      title: 'I am exceptional',
      bgColor: '#FA9E95'
    },
    {
      id: 8,
      start: '2017-12-19 15:50:00',
      end: '2017-12-19 23:30:00',
      resourceId: 'r1',
      title: 'I am locked',
      movable: false,
      resizable: false,
      bgColor: 'red'
    },
    {
      id: 9,
      start: '2017-12-19 16:30:00',
      end: '2017-12-27 23:30:00',
      resourceId: 'r1',
      title: 'R1 has many tasks 1'
    },
    {
      id: 10,
      start: '2017-12-19 17:30:00',
      end: '2017-12-19 23:30:00',
      resourceId: 'r1',
      title: 'R1 has recurring tasks every week on Tuesday, Friday',
      rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
      bgColor: '#f759ab'
    },
    {
      id: 11,
      start: '2017-12-19 18:30:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r1',
      title: 'R1 has many tasks 3'
    },
    {
      id: 12,
      start: '2017-12-20 18:30:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r1',
      title: 'R1 has many tasks 4'
    },
    {
      id: 13,
      start: '2017-12-21 18:30:00',
      end: '2017-12-24 23:30:00',
      resourceId: 'r1',
      title: 'R1 has many tasks 5'
    },
    {
      id: 14,
      start: '2017-12-23 18:30:00',
      end: '2017-12-27 23:30:00',
      resourceId: 'r1',
      title: 'R1 has many tasks 6'
    }
  ],
  eventsForTaskView: [
    {
      id: 1,
      start: '2017-12-18 09:30:00',
      end: '2017-12-18 23:30:00',
      resourceId: 'r1',
      title: 'I am finished',
      bgColor: '#D9D9D9',
      groupId: 1,
      groupName: 'Task1'
    },
    {
      id: 2,
      start: '2017-12-18 12:30:00',
      end: '2017-12-26 23:30:00',
      resourceId: 'r2',
      title: 'I am not resizable',
      resizable: false,
      groupId: 2,
      groupName: 'Task2'
    },
    {
      id: 3,
      start: '2017-12-19 12:30:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r3',
      title: 'I am not movable',
      movable: false,
      groupId: 3,
      groupName: 'Task3'
    },
    {
      id: 7,
      start: '2017-12-19 15:40:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r7',
      title: 'I am exceptional',
      bgColor: '#FA9E95',
      groupId: 4,
      groupName: 'Task4'
    },
    {
      id: 4,
      start: '2017-12-20 14:30:00',
      end: '2017-12-21 23:30:00',
      resourceId: 'r4',
      title: 'I am not start-resizable',
      startResizable: false,
      groupId: 1,
      groupName: 'Task1'
    },
    {
      id: 5,
      start: '2017-12-21 15:30:00',
      end: '2017-12-22 23:30:00',
      resourceId: 'r5',
      title: 'I am not end-resizable',
      endResizable: false,
      groupId: 3,
      groupName: 'Task3'
    },
    {
      id: 9,
      start: '2017-12-21 16:30:00',
      end: '2017-12-21 23:30:00',
      resourceId: 'r1',
      title: 'R1 has many tasks',
      groupId: 4,
      groupName: 'Task4'
    },
    {
      id: 6,
      start: '2017-12-22 15:35:00',
      end: '2017-12-23 23:30:00',
      resourceId: 'r6',
      title: 'I am normal',
      groupId: 1,
      groupName: 'Task1'
    },
    {
      id: 8,
      start: '2017-12-25 15:50:00',
      end: '2017-12-26 23:30:00',
      resourceId: 'r1',
      title: 'I am locked',
      movable: false,
      resizable: false,
      bgColor: 'red',
      groupId: 1,
      groupName: 'Task1'
    },
    {
      id: 10,
      start: '2017-12-26 18:30:00',
      end: '2017-12-26 23:30:00',
      resourceId: 'r2',
      title: 'R2 has many tasks',
      groupId: 4,
      groupName: 'Task4'
    },
    {
      id: 11,
      start: '2017-12-27 18:30:00',
      end: '2017-12-27 23:30:00',
      resourceId: 'r14',
      title: 'R4 has many tasks',
      groupId: 4,
      groupName: 'Task4'
    },
    {
      id: 12,
      start: '2017-12-28 18:30:00',
      end: '2017-12-28 23:30:00',
      resourceId: 'r6',
      title: 'R6 has many tasks',
      groupId: 3,
      groupName: 'Task3'
    }
  ],
  eventsForCustomEventStyle: [
    {
      id: 1,
      start: '2017-12-18 09:30:00',
      end: '2017-12-19 23:30:00',
      resourceId: 'r1',
      title: 'I am finished',
      bgColor: '#D9D9D9',
      type: 1
    },
    {
      id: 2,
      start: '2017-12-18 12:30:00',
      end: '2017-12-26 23:30:00',
      resourceId: 'r2',
      title: 'I am not resizable',
      resizable: false,
      type: 2
    },
    {
      id: 3,
      start: '2017-12-19 12:30:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r3',
      title: 'I am not movable',
      movable: false,
      type: 3
    },
    {
      id: 4,
      start: '2017-12-19 14:30:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r4',
      title: 'I am not start-resizable',
      startResizable: false,
      type: 1
    },
    {
      id: 5,
      start: '2017-12-19 15:30:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r5',
      title: 'I am not end-resizable',
      endResizable: false,
      type: 2
    },
    {
      id: 6,
      start: '2017-12-19 15:35:00',
      end: '2017-12-19 23:30:00',
      resourceId: 'r6',
      title: 'I am normal',
      type: 3
    },
    {
      id: 7,
      start: '2017-12-19 15:40:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r7',
      title: 'I am exceptional',
      bgColor: '#FA9E95',
      type: 1
    },
    {
      id: 8,
      start: '2017-12-19 15:50:00',
      end: '2017-12-19 23:30:00',
      resourceId: 'r1',
      title: 'I am locked',
      movable: false,
      resizable: false,
      bgColor: 'red',
      type: 2
    },
    {
      id: 9,
      start: '2017-12-19 16:30:00',
      end: '2017-12-27 23:30:00',
      resourceId: 'r1',
      title: 'R1 has many tasks 1',
      type: 3
    },
    {
      id: 10,
      start: '2017-12-20 18:30:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r1',
      title: 'R1 has many tasks 2',
      type: 1
    },
    {
      id: 11,
      start: '2017-12-21 18:30:00',
      end: '2017-12-22 23:30:00',
      resourceId: 'r1',
      title: 'R1 has many tasks 3',
      type: 2
    },
    {
      id: 12,
      start: '2017-12-23 18:30:00',
      end: '2017-12-27 23:30:00',
      resourceId: 'r1',
      title: 'R1 has many tasks 4',
      type: 3
    }
  ]
}

export default DemoData
