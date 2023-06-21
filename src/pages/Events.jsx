import {React,useState,useEffect} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Edit, Page, Selection, Toolbar, Sort, Filter, change } from "@syncfusion/ej2-react-grids";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { db } from '../lib/firebase';


import { employeesGrid, customersGrid } from '../data/dummy';
import { Header } from '../components';
import { GetCollection } from '../tools/GetCollection';
import { stringToNumber } from '@syncfusion/ej2-react-charts';
import MultiSelectEditor from '../tools/MultiSelectEditor';
import GetHighestPoints from '../tools/GetHighestPoints';
//Creates the events page
const Events = () => {
  const [sortSettings, setSortSettings] = useState({ columns: [{ field: 'eventName', direction: 'Ascending' }] });
  const [nameColl,setNameColl] = useState([]);
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editSettings = {
    allowEditing: true, // Enable editing
    allowAdding: true, // Enable adding new rows
    allowDeleting: true, // Enable deleting rows
    mode: "Normal", // Set editing mode to "Normal"
  };
  
  const handleActionBegin = (args) => {
    console.log(args)
    if (args.requestType === 'delete'){
      db.collection('events').doc(args.data[0].ID).delete();
    }
    if (args.requestType === 'save') {
      const editedData = args.data;
      if (editedData.eventName === '') {
        args.cancel = true; // Cancel the save operation
        alert('Please enter an event name.'); // Show an error message
      }
      else if (editedData.eventMonth === '') {
        args.cancel = true; 
        alert('Please enter an event month.'); 
      }
      //Limits day input to 1 through 31
      else if (editedData.eventDay === '' || isNaN(editedData.eventDay) || stringToNumber(editedData.eventDay) < 1 || stringToNumber(editedData.eventDay) > 31) {
        args.cancel = true; 
        alert('Please enter a valid event day.'); 
      }
      //Limits year input to 1950 to "current year + 1" for future events
      else if (editedData.eventYear === '' || stringToNumber(editedData.eventYear) < 1950 || stringToNumber(editedData.eventYear) > new Date().getFullYear()+1) {
        args.cancel = true; 
        alert('Please enter a valid event year.'); 
      }
      else if (editedData.eventAttendance === '') {
        args.cancel = true;
        alert('Please enter event attenance.'); 
      }
      else if (editedData.ID === '') {
        args.cancel = true;
        alert('Please enter event ID.'); 
      }
      else{
        if(args.action === 'add'){
          db.collection('events').doc(args.data.ID).set(editedData);
        }
        db.collection('events').doc(args.data.ID).update(editedData);
      }
    } 
    
  };

  
  const GetNamesOfCollection = (coll) => {
    let tempArr = []
    coll.forEach(element => {
      tempArr = tempArr.concat([toString(element.studentFirst) + toString(element.studentLast)])
    })
    setNameColl(tempArr);
    return nameColl
  }

  const editorTemplate = (args) => {
    console.log(args)
    return (
      <DropDownListComponent 
        dataSource={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
        value={args.eventMonth}
        change={args.change}
      />
    );
  };
  const [button1Text, setButton1Text] = useState('Select');
  const [button2Text, setButton2Text] = useState('Select');
  const [button3Text, setButton3Text] = useState('Select');
  const [b1Style, setB1Style] = useState({ color: '#03C9D7', backgroundColor: '#E5FAFB' });
  const [b2Style, setB2Style] = useState({ color: '#03C9D7', backgroundColor: '#E5FAFB' });
  const [b3Style, setB3Style] = useState({ color: '#03C9D7', backgroundColor: '#E5FAFB' });
  const [b1, setB1] = useState(false);
  const [b2, setB2] = useState(false);
  const [b3, setB3] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [names, setNames] = useState(["Timmy Turret","Alex Lixler","Wilbur Walrus","Orange Ophelius","Jay Ninjago","Jojo Line","Jeffry Anode"]);
  const [grade, setGrade] = useState(0);
  const [name, setName] = useState('');
  const [studentsList, setStudentsList] = useState([]);
  let tempArr = []
  const handleGradeChange = (event) => {
    console.log(event.target.value);
    setGrade(event.target.value);
    updateStudentsList();
  };

  async function updateStudentsList() {
    const highestPoints = await GetHighestPoints();
    setStudentsList(highestPoints);
  }
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleSubmit = () => {
    setShowOptions(false);
    setSubmitted(true);
    let idGen = Math.floor(Math.random()*100000000);
    db.collection('prizeRequests').doc(idGen.toString()).set({id: idGen.toString(), name: name, grade: grade, prize: (b1 ? ('No Homework') : (b2 ? ('Giant Lollipop') : ('T-Shirt')))});
  }
  const handleButtonStyle = () => {
    let tempColor='#03C9D7';
    let tempBkColor='#E5FAFB';
    tempColor = ((b3 || b2) ? '#8F8F8F' : '#03C9D7');
    tempBkColor = ((b3 || b2) ? '#F3F3F3' : '#E5FAFB');
    setB1Style({color: tempColor, backgroundColor: tempBkColor});
    tempColor = ((b1 || b3) ? '#8F8F8F' : '#03C9D7');
    tempBkColor = ((b1 || b3) ? '#F3F3F3' : '#E5FAFB');
    setB2Style({color: tempColor, backgroundColor: tempBkColor});
    tempColor = ((b1 || b2) ? '#8F8F8F' : '#03C9D7');
    tempBkColor = ((b1 || b2) ? '#F3F3F3' : '#E5FAFB');
    setB3Style({color: tempColor, backgroundColor: tempBkColor});
  }
  const handleButton = (thisb1, thisb2, thisb3) => {
    setTimeout(() => {
      console.log(b1,b2,b3)
      if(thisb1){
        handleButtonStyle();
        setButton1Text('Selected!');
        setButton2Text('Select');
        setButton3Text('Select');
      }
      else if(thisb2){
        handleButtonStyle();
        setButton1Text('Select');
        setButton2Text('Selected!');
        setButton3Text('Select');
      }
      else if(thisb3){
        handleButtonStyle();
        setButton1Text('Select');
        setButton2Text('Select');
        setButton3Text('Selected!');
      }
      else{
        handleButtonStyle();
        setButton1Text('Select');
        setButton2Text('Select');
        setButton3Text('Select');
      }
    },100);
  }
  useEffect(() => {
    handleButton(b1,b2,b3);
    console.log(grade);
    if(name === 'Orange Ophelius' && grade == 11){
      setShowOptions(true);
    }
    else{
      setShowOptions(false);
    }
  },[b1, b2, b3, name, grade, names, submitted]);

  return (
    <div>
    
    <div className="m-2 p-2 ml-10 bg-white rounded-3xl">
      <Header category="Page" title="Events" />
      <div className="flex m-2 p-2 ml-10 bg-white rounded-3xl">
      <select value={grade} onChange={handleGradeChange}>
        <option value={0}>Please select a grade level</option>
        <option value={9}>9th Grade</option>
        <option value={10}>10th Grade</option>
        <option value={11}>11th Grade</option>
        <option value={12}>12th Grade</option>
      </select>
      <select className='ml-10' multiple={true} value={name} onChange={handleNameChange}>
        { 
          names.map((name) =>
            <option value={name}>{name}</option>
          )
        }
      </select>
      <div className='ml-5'>
        <button 
        className='opacity-0.9 rounded-xl content-center p-4 hover:drop-shadow-xl h-auto'type="button"
        style={{color: '#03C9D7', backgroundColor: '#E5FAFB'}}
        onClick={() => {
            
        }}>
          Submit
        </button>
      </div>
    </div>
      <GridComponent
        dataSource={GetCollection({coll:'events'})}
        actionBegin={handleActionBegin}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editSettings}
        rowHeight={60}
        columnSpacing={0}
        toolbar={["Add", "Edit", "Delete", "Update", "Cancel"]} 
        sortSettings={sortSettings}
      >
        <ColumnsDirective>
          <ColumnDirective field='eventName' headerText='Event Name' width='200' textAlign='Center' />
          <ColumnDirective field='eventMonth' headerText='Month' width='120' textAlign='Center' editTemplate={editorTemplate} />
          <ColumnDirective field='eventDay' headerText='Day' width='135' format='yMd' textAlign='Center' />
          <ColumnDirective field='eventYear' headerText='Year' width='120' textAlign='Center' />
          <ColumnDirective field='eventPoints' headerText='Points' width='120' textAlign='Center' />
          {/* <ColumnDirective field='eventAttendance' headerText='Attendees' textAlign='Center' editType='dropdownedit' 
          edit={{create: () => {
            const multiselect = new MultiSelectEditor({
              dataSource: ['a','b','c'], //GetNamesOfCollection(GetCollection({coll: 'students'}))
              mode: 'Box', placeholder: 'Select students',
            });
            return multiselect.element;
          },
            read: (element) => element.value,
            write: (args) => {args.rowData[args.column.field] = args.value;},
        }}/> */}
          <ColumnDirective field='ID' headerText='Event ID' width='125' textAlign='Center'/>
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
    </div>
  );
};

export default Events;