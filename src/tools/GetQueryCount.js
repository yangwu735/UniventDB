import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import "firebase/firestore";

function GetDocumentCount(props) {
  const [documentCount, setDocumentCount] = useState(0);

  useEffect(() => {
    const docRef = db.collection(props.coll).where(props.field, props.comp, props.value);
    let count = 0;
    docRef.get().then((querySnapshot) => {
      if (querySnapshot) {
        querySnapshot.forEach(() => {
          count++;
        });
      } else {
        console.log("No such document!");
      }
      setDocumentCount(count);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }, []);

  return (
    String(documentCount)
  );
}

export default GetDocumentCount;