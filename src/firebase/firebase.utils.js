import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBPbs9pw7d8I_outmv5N3O_PBY-q-fdH-k",
  authDomain: "crwn-db-c3ad5.firebaseapp.com",
  databaseURL: "https://crwn-db-c3ad5.firebaseio.com",
  projectId: "crwn-db-c3ad5",
  storageBucket: "crwn-db-c3ad5.appspot.com",
  messagingSenderId: "451845489516",
  appId: "1:451845489516:web:eb7b94e9ae5b8f291c2949",
  measurementId: "G-1TDJ0V2LDK",
};

// This function lets you store current login gmail user into firebase
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
