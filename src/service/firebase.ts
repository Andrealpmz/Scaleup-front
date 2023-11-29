import { initializeApp, getApps } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAAmhl5mckrKyrX1EOzIJNm11Y3aKef5HY",
    authDomain: "scale-up-cb096.firebaseapp.com",
    projectId: "scale-up-cb096",
    storageBucket: "scale-up-cb096.appspot.com",
    messagingSenderId: "212327086010",
    appId: "1:212327086010:web:dc9ea9ff6723b5d4b58f83",
    measurementId: "G-TNWBT8114M"
};

const apps = getApps();
const app = !apps.length ? initializeApp(firebaseConfig) : apps[0];

export const messaging = getMessaging(app);