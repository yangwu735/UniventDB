import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import "firebase/firestore";

function GetDocumentData(props) {
  const [documentData, setDocumentData] = useState('');
  useEffect(() => {
    const docRef = db.collection(props.coll).doc(`${props.docu}`);
    let tempData;
    docRef.get().then((doc) => {

      if (props.docu === 'S1'){
        console.log(props.docu)
      }
      if (doc.exists) {
        tempData = doc.get(props.field);
      } else {
        console.log("No such document!");
      }
      setDocumentData(tempData);
    });
  }, [props.coll, props.docu, props.field]);

  return (
    String(documentData)
  );
}

export default GetDocumentData;