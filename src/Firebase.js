import firebase from "firebase/app";
import firestore from "firebase/firestore";

const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: "AIzaSyDqiuPg6uReUlQIyKFq3IfNUypKNPw3XUo",
  authDomain: "form-25daa.firebaseapp.com",
  databaseURL: "https://form-25daa-default-rtdb.firebaseio.com",
  projectId: "form-25daa",
  storageBucket: "form-25daa.appspot.com",
  messagingSenderId: "1013853005074",
  appId: "1:1013853005074:web:41fe1b951742e83ab0ffcb",
  measurementId: "G-BCCZFL0P85",
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
