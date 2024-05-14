import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAHCK65YBRyLOG3IaMB1t-siQYPtvMsKFo",
  authDomain: "eventos-880e4.firebaseapp.com",
  projectId: "eventos-880e4",
  storageBucket: "eventos-880e4.appspot.com",
  messagingSenderId: "380867968611",
  appId: "1:380867968611:web:d84cce9406602dfca9c256"
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  export default app;
  