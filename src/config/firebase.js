import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtVhUeaF_JHdBckEhtjgX6ToIh5aRYkSM",
    authDomain: "waseem-transfers.firebaseapp.com",
    databaseURL: "https://waseem-transfers.firebaseio.com",
    projectId: "waseem-transfers",
    storageBucket: "waseem-transfers.appspot.com",
    messagingSenderId: "1053709360760",
    appId: "1:1053709360760:web:1aa867700123f4dea3178d",
    measurementId: "G-H6Z91H5XPT"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();


export { db, storage, storageRef }

export default firebase;