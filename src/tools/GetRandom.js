import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import "firebase/firestore";
import GetDocumentData from './GetDoc';

function GetRandom(props) {
  const [documentId, setDocumentId] = useState(null);
  const docRef = db.collection('students').where('studentGrade', '==', props.grade);
  let count = 0;
  const [docId, setDocId] = useState("");
  let idArr = [];
  useEffect(() => {
    docRef.get().then((querySnapshot) => {
      if (querySnapshot) {
        querySnapshot.forEach(() => {
          idArr.push(querySnapshot.docs[count].id);
          count++;
        });
      } else {
        console.log("No such document!");
      }
      let rand = Math.floor(Math.random() * count);
      setDocId(idArr[rand]);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }, [docId]);
  if (docId == '') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <GetDocumentData coll='students' docu={docId.toString()} field='studentFirst'/> &nbsp;
      <GetDocumentData coll='students' docu={docId.toString()} field='studentLast'/> 
      <div className='ml-7 font-normal'>
        ---------------&nbsp;&nbsp;&nbsp;
        Grade:&nbsp;
        <GetDocumentData coll='students' docu={docId.toString()} field='studentGrade'/>&nbsp;&nbsp;
        Points:&nbsp;
        <GetDocumentData coll='students' docu={docId.toString()} field='studentPoints'/>
      </div>
    </div>
  );
}

export default GetRandom;
