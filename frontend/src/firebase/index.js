import firebase from 'firebase/app';
import 'firebase/storage';



// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBtle3mX0Ej_4_0yDl844-psW_2KrfqJyo",
    authDomain: "navadipti.firebaseapp.com",
    databaseURL: "https://navadipti.firebaseio.com",
    projectId: "navadipti",
    storageBucket: "navadipti.appspot.com",
    messagingSenderId: "178364937717",
    appId: "1:178364937717:web:e4ba1050cbc6b0ed5c1cbc",
    measurementId: "G-B0EJ6VBKHC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage, firebase as default};