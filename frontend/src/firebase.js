import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX1DzjT_W5xVMnlCyIttXKZp5M1c4yD_8",
  authDomain: "dexity-ebf50.firebaseapp.com",
  projectId: "dexity-ebf50",
  storageBucket: "dexity-ebf50.appspot.com",
  messagingSenderId: "129331374553",
  appId: "1:129331374553:web:1a18b6713f0749dcb051c8",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
