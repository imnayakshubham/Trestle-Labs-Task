import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD8XpuNxobMTlltaKWul8S5BjKR0-JTbcM",
  authDomain: "trestle-f477b.firebaseapp.com",
  projectId: "trestle-f477b",
  storageBucket: "trestle-f477b.appspot.com",
  messagingSenderId: "361758485488",
  appId: "1:361758485488:web:ffe67ec6aec7ab2e6c4b35",
};
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
