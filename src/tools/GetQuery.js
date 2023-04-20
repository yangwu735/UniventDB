import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import "firebase/firestore";

function GetQuery(props) {
  const retData = [];
    const query = db.collection(props.coll).where(props.field, props.comp, props.value);
    query.get().then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      retData.push(...data);
      console.log(retData)
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  return (
    retData
  );
};

export default GetQuery;