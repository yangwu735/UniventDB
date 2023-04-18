import {React,useState} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Edit, Page, Selection, Toolbar, Sort, Filter } from "@syncfusion/ej2-react-grids";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { db } from '../lib/firebase';


import { employeesGrid, customersGrid } from '../data/dummy';
import { Header } from '../components';
import { GetCollection } from '../GetCollection';
import { stringToNumber } from '@syncfusion/ej2-react-charts';
import { MultiSelect } from '@syncfusion/ej2-react-dropdowns';


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
          db.collection('events').doc(args.data.ID).set(args.data);
        }
        db.collection('events').doc(args.data.ID).update(args.data);
      }
    } 
    
  };

  const MultiSelectEditor = (props) => {
    const { value, onChange, dataSource } = props;
  
    return (
      <MultiSelect
        mode="Box"
        dataSource={dataSource}
        value={value ? value.split(',') : []}
        change={(e) => onChange(e.value.join(','))}
      />
    );
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
    return <DropDownListComponent dataSource={["January", "February", "March","April","May","June","July","August","September","October","November","December"]} value={args.eventMonth} change={args.onChange}/>;
  };
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Events" />
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
          <ColumnDirective field='eventAttendance' headerText='Attendees' textAlign='Center' editType='dropdownedit' 
          edit={{create: () => {
            const multiselect = new MultiSelect({
              dataSource: GetNamesOfCollection(GetCollection({coll: 'students'})), 
              mode: 'Box', placeholder: 'Select students',
            });
            return multiselect.element;
          },
            read: (element) => element.value,
            write: (args) => {args.rowData[args.column.field] = args.value;},
        }}/>
          <ColumnDirective field='ID' headerText='Event ID' width='125' textAlign='Center' allowEditing={false}/>
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Events;