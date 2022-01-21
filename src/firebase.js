
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/storage"
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: "AIzaSyAMzWDdvvqxXIZ_wUIgv0ERUD47dkaLYsg",
  authDomain: "react-79c6e.firebaseapp.com",
  databaseURL: "https://react-79c6e-default-rtdb.firebaseio.com",
  projectId: "react-79c6e",
  storageBucket: "react-79c6e.appspot.com",
  messagingSenderId: "100138590480",
  appId: "1:100138590480:web:6f08f765bee2aafb88c595",
  measurementId: "G-DKS2YFK0ZK"
});

export const auth = app.auth()
var fireDb = app.database();
var storage = app.storage();

// firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const appAuth = firebase.auth();

// export default fireDb.database();
export { projectStorage, projectFirestore, timestamp,storage, firebase, fireDb as default,appAuth };
