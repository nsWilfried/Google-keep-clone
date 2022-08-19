import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyAZ2QE25iKBs8RMR028cGHIZlfjDlgOcKY",
    authDomain: "keep-clone-c2a52.firebaseapp.com",
    projectId: "keep-clone-c2a52",
    storageBucket: "keep-clone-c2a52.appspot.com",
    messagingSenderId: "785880773918",
    appId: "1:785880773918:web:f60d1799be96e42537c50f",
    measurementId: "G-H24PDGE5ZQ"
  })
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }
