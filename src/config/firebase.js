import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC6GNH42RkQggoA0lUkkFDpelENsvA3gyU",
  authDomain: "eventos-55d53.firebaseapp.com",
  projectId: "eventos-55d53",
  storageBucket: "eventos-55d53.appspot.com",
  messagingSenderId: "243274252989",
  appId: "1:243274252989:web:1cbd55f4f524b1d0486dd4"
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  export default app;
  