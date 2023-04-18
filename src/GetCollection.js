import React, { useState, useEffect } from "react";
import { db } from "./lib/firebase";
import "firebase/firestore";

export function GetCollection(props) {
  const [documentArr, setDocumentArr] = useState([]);

  useEffect(() => {
    const docRef = db.collection(props.coll);
    const tempArr = [];
    docRef.get().then((querySnapshot) => {
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          const tempDoc = doc.data();
          tempArr.push(tempDoc);
        });
      } else {
        console.log("No such document!");
      }
      setDocumentArr(tempArr);
      console.log(tempArr)
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }, []);

  return (
    documentArr
  );
}
