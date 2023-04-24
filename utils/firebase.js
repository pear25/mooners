// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_jlw91JcUO7W6e97TRXeWaBe2J5jhbc8",
    authDomain: "mooners-fdb14.firebaseapp.com",
    projectId: "mooners-fdb14",
    storageBucket: "mooners-fdb14.appspot.com",
    messagingSenderId: "931109887222",
    appId: "1:931109887222:web:a19f12165f246a5d7ca0d7",
    measurementId: "G-CPXFDEVX8F"
};

// Initialize Firebase
if (!firebase.apps.length) {
    const app = initializeApp(firebaseConfig);
}
const analytics = getAnalytics(app);