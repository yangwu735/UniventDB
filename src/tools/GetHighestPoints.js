import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import "firebase/firestore";
import GetDocumentData from './GetDoc';

function GetHighestPoints(props) {
  const [documentId, setDocumentId] = useState(null);
  useEffect(() => {
    if(props.grade === undefined){
      let highDocId;
      const query = db.collection('students');
      query.orderBy('studentPoints', 'desc').limit(1).get()
        .then(querySnapshot => {
            highDocId = querySnapshot.docs[0].id;
            setDocumentId(highDocId);
            console.log(documentId)
        })
        .catch(error => {
            console.error(error);
        });
    }
    else{
      const query = db.collection('students').where('studentGrade', '==', props.grade);
      query.orderBy('studentPoints', 'desc').limit(1).get()
      .then(querySnapshot => {
        const highDocId = querySnapshot.docs[0].id;
        setDocumentId(highDocId);
        console.log(highDocId);
      })
      .catch(error => {
        console.error(error);
      });
    }
  },[]);

  return (
    <div className="flex">
      <GetDocumentData coll='students' docu={documentId} field='studentFirst'/> &nbsp;
      <GetDocumentData coll='students' docu={documentId} field='studentLast'/> 
      <div className='ml-7 font-normal'>
        ---------------&nbsp;&nbsp;&nbsp;
        Grade:&nbsp;
        <GetDocumentData coll='students' docu={documentId} field='studentGrade'/>&nbsp;&nbsp;
        Points:&nbsp;
        <GetDocumentData coll='students' docu={documentId} field='studentPoints'/>
      </div>
    </div>
  );
}

export default GetHighestPoints;