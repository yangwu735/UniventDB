import React from 'react'
import { db } from '../lib/firebase';


const Homepage = () => {
  var docRef = db.collection("students").doc("S1");
  var oops;
  docRef.get().then((doc) => {
      if (doc.exists) {
          console.log(doc.data().studentFirst);
          return doc.data().studentFirst;
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
  return (
    <div>
      {String(oops)}
    </div>
  )
}

export default Homepage