import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firebase services
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const analytics = firebase.analytics();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const increment = firebase.firestore.FieldValue.increment;

// Add the Google sign-in function
export const signInWithGoogle = async () => {
  try {
    await auth.signInWithPopup(googleAuthProvider);
  } catch (error) {
    console.error("Google sign in failed", error);
  }
};

// Export types
export type FirebaseError = firebase.FirebaseError;
export type User = firebase.User;

export default firebase;