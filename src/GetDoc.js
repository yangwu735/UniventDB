import React, { useState, useEffect } from "react";
import { db } from "./lib/firebase";
import "firebase/firestore";

function GetDocumentData(props) {
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    const docRef = db.collection(props.coll).doc(props.docu);

    docRef.get().then((doc) => {
      if (doc.exists) {
        setDocumentData(doc.get(props.field));
      } else {
        console.log("No such document!");
      }
    });
  }, []);

  return (
    String(documentData)
  );
}

export default GetDocumentData;