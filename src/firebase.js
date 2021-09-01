import firebase from "firebase";

const firebaseConfig = {
  //api key
};
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
