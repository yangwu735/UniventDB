import React from 'react';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TiTick } from 'react-icons/ti';
import { GiLouvrePyramid } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';
import { IoMdCalendar } from 'react-icons/io';
import { AiFillGift } from 'react-icons/ai';
import { IoIosMailUnread } from 'react-icons/io';
import avatar from './defaultAvatar.jpg';
import product1 from './lollipop.jpg';
import product2 from './lollipop.jpg';
import product3 from './lollipop.jpg';
import product4 from './lollipop.jpg';
import product5 from './lollipop.jpg';
import product6 from './lollipop.jpg';
import product7 from './lollipop.jpg';
import product8 from './lollipop.jpg';
import { GetCollection } from '../tools/GetCollection';
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);

export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);

export const kanbanGrid = [
  { headerText: 'To Do',
    keyField: 'Open',
    allowToggle: true },

  { headerText: 'In Progress',
    keyField: 'InProgress',
    allowToggle: true },

  { headerText: 'Testing',
    keyField: 'Testing',
    allowToggle: true,
    isExpanded: false },

  { headerText: 'Done',
    keyField: 'Close',
    allowToggle: true },
];
export const gridEmployeeProfile = (props) => (
  <div className="flex items-center gap-1">
    <img
      className="rounded-full w-10 h-10"
      src={avatar}
      alt="employee"
    />
  </div>
);

export const customersGrid = [
  { type: 'checkbox', 
    width: '50',
    editType: undefined},
  { headerText: '',
    width: '50',
    template: gridEmployeeProfile,
    editType: undefined},
  { field: 'studentFirst',
    headerText: 'First Name',
    width: '100',
    textAlign: 'Left' },
  { field: 'studentLast',
    headerText: 'Last Name',
    width: '100',
    textAlign: 'Left' },
  { field: 'studentGrade',
    headerText: 'Grade Level',
    width: '130',
    textAlign: 'Center'},
  {
    field: 'studentPoints',
    headerText: 'Points',
    width: '100',
    textAlign: 'Center' },
  { field: 'studentEvents',
    headerText: 'Events',
    width: '100',
    format: 'yMd',
    textAlign: 'Center' ,
    editType: undefined},
  { field: 'ID',
    headerText: 'Student ID',
    width: '120',
    textAlign: 'Center',
    editType: undefined
  },

];
const editorTemplate = (args) => {
  return <DropDownListComponent dataSource={["January", "Medium", "Low"]} value={args.eventMonth} change={args.onChange}/>;
};
export const employeesGrid = [
  { field: 'eventName',
    headerText: 'Event Name',
    width: '200',
    textAlign: 'Center',},
  { field: 'eventMonth',
    headerText: 'Month',
    width: '120',
    textAlign: 'Center',
    editTemplate: {editorTemplate}},
  { field: 'eventDay',
    headerText: 'Day',
    width: '135',
    format: 'yMd',
    textAlign: 'Center' },
  { field: 'eventYear',
    headerText: 'Year',
    width: '120',
    textAlign: 'Center' },
  { field: 'ID',
    headerText: 'Event ID',
    width: '125',
    textAlign: 'Center' },
];

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'Dashboard',
        icon: <FiShoppingBag />,
      },
    ],
  },

  {
    title: 'Pages',
    links: [
      {
        name: 'Students',
        icon: <IoMdContacts />,
      },
      {
        name: 'Events',
        icon: <IoMdCalendar />,
      },
      {
        name: 'Prizes',
        icon: <AiFillGift />,
      },
      {
        name: 'Requests',
        icon: <IoIosMailUnread />,
      },
    ],
  },
];

export const cartData = [
  {
    image:
      product5,
    name: 'butterscotch ice-cream',
    category: 'Milk product',
    price: '$250',
  },
  {
    image:
      product6,
    name: 'Supreme fresh tomato',
    category: 'Vegetable Item',
    price: '$450',
  },
  {
    image:
      product7,
    name: 'Red color candy',
    category: 'Food Item',
    price: '$190',
  },
];

export const chatData = [
  {
    image:
      avatar,
    message: 'Roman Joined the Team!',
    desc: 'Congratulate him',
    time: '9:08 AM',
  },
  {
    image:
      avatar,
    message: 'New message received',
    desc: 'Salma sent you new message',
    time: '11:56 AM',
  },
  {
    image:
      avatar,
    message: 'New Payment received',
    desc: 'Check your earnings',
    time: '4:39 AM',
  },
  {
    image:
      avatar,
    message: 'Jolly completed tasks',
    desc: 'Assign her new tasks',
    time: '1:12 AM',
  },
];

export const dropdownData = [
  {
    Id: '1',
    Time: 'March 2021',
  },
  {
    Id: '2',
    Time: 'April 2021',
  }, {
    Id: '3',
    Time: 'May 2021',
  },
];