import { React,useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { db } from '../lib/firebase';
import avatar from '../data/defaultAvatar.jpg';

import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';
import { GetCollection } from '../tools/GetCollection';

const Requests  = () => {
  const editSettings = {
    allowDeleting: true, // Enable deleting rows
    mode: "Normal", // Set editing mode to "Normal"
  };
  const handleActionBegin = (args) => {
    console.log(args)
    if (args.requestType === 'delete'){
      console.log(args.data[0].id);
      db.collection('prizeRequests').doc(args.data[0].id).delete();
    }
  };
  return (
    <div className="m-2 p-2 ml-10 bg-white rounded-3xl">
      <Header category="Page" title="Requests" />
      <GridComponent
        dataSource={GetCollection({coll:'prizeRequests'})}
        actionBegin={handleActionBegin}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editSettings}
        rowHeight={60}
        columnSpacing={0}
        toolbar={["Delete", "Cancel", "Search"]} // Enable the grid's toolbar
      >
        <ColumnsDirective>
          <ColumnDirective type='checkbox' width='50' allowEditing={false}/>
          <ColumnDirective field='name' headerText='Student Name' width='150' textAlign='Center'/>
          <ColumnDirective field='grade' headerText='Grade Level' width='150' textAlign='Center'/>
          <ColumnDirective field='prize' headerText='Prize Requested' width='150' textAlign='Center'/>
          <ColumnDirective field='ID' headerText='' width='0' textAlign='Center'/>
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Requests;