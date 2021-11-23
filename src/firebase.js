import firebase from 'firebase/app';
import 'firebase/auth';
const config={
    apiKey: "AIzaSyAFn2QFbrfbB1tXvq74hNG4H4L2k_WeKNU",
    authDomain: "loginotp-d6ca1.firebaseapp.com",
    projectId: "loginotp-d6ca1",
    storageBucket: "loginotp-d6ca1.appspot.com",
    messagingSenderId: "64425274518",
    appId: "1:64425274518:web:0efa717ef934026c5c66b7"
}
firebase.initializeApp(config);
export default firebase;