importScripts("https://www.gstatic.com/firebasejs/9.8.4/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.8.4/firebase-messaging-compat.js")
 
const firebaseConfig = {
  apiKey: "AIzaSyAAmhl5mckrKyrX1EOzIJNm11Y3aKef5HY",
  authDomain: "scale-up-cb096.firebaseapp.com",
  projectId: "scale-up-cb096",
  storageBucket: "scale-up-cb096.appspot.com",
  messagingSenderId: "212327086010",
  appId: "1:212327086010:web:dc9ea9ff6723b5d4b58f83",
  measurementId: "G-TNWBT8114M"
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(payload => {
    console.log("Recibiste mensaje mientras estabas ausente");
    const notificationTitle= payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body
    }

    return self.registration.showNotification(
        new Notification(notificationTitle, notificationOptions)
    )
})

messaging.onMessage(payload =>{
    console.log('Receiving foreground message');
    console.log(payload)
    var notificationTitle = 'Bienvenido a Scale Up';
    var notificationOptions = {
      body: payload.data.alert,
      icon: '@/asset/images/PWA-images/icon-192x192.png',
    };

    var notification = new Notification(notificationTitle, notificationOptions);
    notification.onclick = function(event) {
      notification.close();
      console.log(event);
    };
});