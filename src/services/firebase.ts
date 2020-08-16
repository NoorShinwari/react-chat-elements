import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA6SfcDih--QL78CJOF31WJtbMQv0k3l-g",
  authDomain: "cultumchat.firebaseapp.com",
  databaseURL: "https://cultumchat.firebaseio.com",
  projectId: "cultumchat",
  storageBucket: "cultumchat.appspot.com",
  messagingSenderId: "98771010049",
  appId: "1:98771010049:web:ff13f652ace84a3f003600",
  measurementId: "G-3DYNXNP2BM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const auth = firebase.auth;
export const db = firebase.database();
