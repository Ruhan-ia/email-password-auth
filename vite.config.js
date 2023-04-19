// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZOIfuTQcXsiryq49HN7XMaVHmLwrm_yY",
  authDomain: "email-password-auth-320d8.firebaseapp.com",
  projectId: "email-password-auth-320d8",
  storageBucket: "email-password-auth-320d8.appspot.com",
  messagingSenderId: "1011409107761",
  appId: "1:1011409107761:web:75fbb21a9621e803bc8e10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
