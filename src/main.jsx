import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ChakraProvider } from '@chakra-ui/react'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import ShoppingCartContext from './context/ShoppingCartContext';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrCfKytv_ur5dyGjvkBx_sUiNgcAQ_RXQ",
  authDomain: "ferreteriacommerce.firebaseapp.com",
  projectId: "ferreteriacommerce",
  storageBucket: "ferreteriacommerce.appspot.com",
  messagingSenderId: "18638089644",
  appId: "1:18638089644:web:345d2cfbd0d52d41fede09"
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ChakraProvider>
      <ShoppingCartContext>
        <App />
      </ShoppingCartContext>
    </ChakraProvider>   
  // </React.StrictMode>
 ,
)
