import firebase from "firebase/app";
import 'firebase/storage'
import 'firebase/firestore';
// import 'firebase/analytics'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBv0jn3m4RFVRrooGzQRM_lyNNtKk4AROY",
  authDomain: "access-control-b696f.firebaseapp.com",
  projectId: "access-control-b696f",
  storageBucket: "access-control-b696f.appspot.com",
  messagingSenderId: "975333635945",
  appId: "1:975333635945:web:8ede61119996ba52b8aff8",
  measurementId: "G-KY5GME95JG",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default };

// firebase.analytics();
