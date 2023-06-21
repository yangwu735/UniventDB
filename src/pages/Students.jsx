import { React,useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { db } from '../lib/firebase';
import avatar from '../data/defaultAvatar.jpg';

import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';
import { GetCollection } from '../tools/GetCollection';

//Creates the students page
const Students = () => {
  const editSettings = {
    allowEditing: true, // Enable editing
    allowAdding: true, // Enable adding new rows
    allowDeleting: true, // Enable deleting rows
    mode: "Normal", // Set editing mode to "Normal"
  };
  //Handles database grid actions
  const handleActionBegin = (args) => {
    console.log(args)
    if (args.requestType === 'delete'){
      db.collection('students').doc(args.data[0].ID).delete();
    }
    if (args.requestType === 'save') {
      let editedData = args.data;
      if (editedData.studentFirst === '') {
        args.cancel = true; // Cancel the save operation
        alert('Please enter a first name.'); // Show an error message
      }
      else if (editedData.studentLast === '') {
        args.cancel = true; 
        alert('Please enter a last name.'); 
      }
      else if (editedData.studentGrade === '') {
        args.cancel = true; 
        alert('Please enter a grade level.'); 
      }
      else if (editedData.studentPoints === '') {
        args.cancel = true; 
        alert('Please enter points amount.'); 
      }
      else if (editedData.ID === '' || editedData.ID === undefined) {
        args.cancel = true; 
        alert('Please enter student ID.'); 
      }
      else{
        if(args.action === 'add'){
          alert('Please set student events on events page.');
          editedData.studentEvents = [];
          db.collection('students').doc(args.data.ID).set(editedData);
        }else{
          db.collection('students').doc(args.data.ID).update(editedData);
        }
      }
    } 
    
  };
  //Sorts by default by student last name
  const [sortSettings, setSortSettings] = useState({ columns: [{ field: 'studentLast', direction: 'Ascending' }] });
  //Rendering below
  return (
    <div className="m-2 p-2 ml-10 bg-white rounded-3xl">
      <Header category="Page" title="Students" />
      <GridComponent
        dataSource={GetCollection({coll:'students'})}
        actionBegin={handleActionBegin}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editSettings}
        rowHeight={60}
        columnSpacing={0}
        toolbar={["Add", "Edit", "Delete", "Update", "Cancel","Search"]} // Enable the grid's toolbar
        sortSettings={sortSettings}
      >
        <ColumnsDirective>
          <ColumnDirective type='checkbox' width='50' allowEditing={false}/>
          {/* <ColumnDirective 
            headerText='' 
            width='50' 
            template={
              <div className="flex items-center gap-1">
                <img
                  className="rounded-full w-10 h-10"
                  src={avatar}
                  alt="employee"
                />
              </div>
            } 
            editType={undefined} 
          /> */}
          <ColumnDirective field='studentFirst' headerText='First Name' width='100' textAlign='Left'/>
          <ColumnDirective field='studentLast' headerText='Last Name' width='100' textAlign='Left'/>
          <ColumnDirective field='studentGrade' headerText='Grade Level' width='130' textAlign='Center'/>
          <ColumnDirective field='studentPoints' headerText='Points' width='100' textAlign='Center'/>
          <ColumnDirective field='studentEvents' headerText='Events' width='100' textAlign='Center' allowEditing={false}/>
          <ColumnDirective field='ID' headerText='Student ID' width='120' textAlign='Center'/>
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Students;