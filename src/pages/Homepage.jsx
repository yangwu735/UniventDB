import React from 'react'
import { db } from '../lib/firebase';


const Homepage = () => {
  const docRef = db.collection('students').doc('S1');
  docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
  return (
    <div>
      {}
    </div>
  )
}

export default Homepage