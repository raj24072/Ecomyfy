import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOC1o6e_l9qtiniMx8y_uNWGlJexWKhOM",
  authDomain: "ecomyfy.firebaseapp.com",
  projectId: "ecomyfy",
  storageBucket: "ecomyfy.appspot.com",
  messagingSenderId: "105561479250",
  appId: "1:105561479250:web:57db8e8490fb9b60fe278b"
};

export const firebaseApp = initializeApp(firebaseConfig)