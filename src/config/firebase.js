import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAl7UzfT-yjv3coDvud7QpCWdupKY7hzUg",
    authDomain: "bookings-117.firebaseapp.com",
    databaseURL: "https://bookings-117.firebaseio.com",
    projectId: "bookings-117",
    storageBucket: "bookings-117.appspot.com",
    messagingSenderId: "947340423857",
    appId: "1:947340423857:web:5fcb42a8932dfee654a890",
    measurementId: "G-B6V106DK1B"
  };
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();


export {db, storage, storageRef}

export default firebase;