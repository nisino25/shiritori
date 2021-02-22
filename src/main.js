import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).mount('#app')



import firebase from 'firebase'
 
const firebaseConfig = {
  apiKey: "AIzaSyCq6YHpvSEFewCEG7r-NkmIVi9JDVryhxQ",
  authDomain: "shiritori-7c72d.firebaseapp.com",
  projectId: "shiritori-7c72d",
  storageBucket: "shiritori-7c72d.appspot.com",
  messagingSenderId: "897743408372",
  appId: "1:897743408372:web:b2e62d66331c44714da2a1",
  measurementId: "G-FHEK2T9W1Y"
};
 
firebase.initializeApp(firebaseConfig);

