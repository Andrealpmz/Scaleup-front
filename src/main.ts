import { createApp, provide, h, onMounted, onUnmounted } from 'vue';
import { createPinia } from 'pinia';
import Dialog from 'primevue/dialog';
import firebase from 'firebase/compat/app';
import {getAuth, signInAnonymously} from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import Tooltip from 'primevue/tooltip';
import PrimeVue from 'primevue/config';

import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

import './style.css';
import App from './App.vue';
import router from './router/routerVue';

import '@mdi/font/css/materialdesignicons.css';


import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';




//Config SW
let swLocation = "sw.js";

if (navigator.serviceWorker) {
  if (window.location.href.includes("localhost")) swLocation = "/sw.js"; //Varia según el host
  navigator.serviceWorker.register(swLocation);
}

//Config firebase
const configFirebase = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const messaging = getMessaging(firebase.initializeApp(configFirebase));

Notification.requestPermission().then(function(){
  if(!(Notification.permission === 'denied' || Notification.permission === 'default')){
    getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPIDKEY }).then((currentToken) => {
      if (currentToken) {
        signInAnonymously(getAuth());
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }
});

onMessage(messaging, (payload) => {
  var notificationTitle = 'Bienvenido a Scale Up';
  var notificationOptions = {
    body: 'Da un gran paso al mundo digital.',
    icon: '@/asset/images/PWA-images/icon-192x192.png',
  };

  var notification = new Notification(notificationTitle, notificationOptions);
  notification.onclick = function(event) {
    notification.close();
  };
});

//Config Apollo

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_MICRO_BACKEND_GQL,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.directive('click-outside', {
  beforeMount(el, binding) {
    const onClick = (event: any) => {
      if (!el.contains(event.target) && el !== event.target) {
        binding.value();
      }
    };

    onMounted(() => {
      document.addEventListener('click', onClick);
    });

    onUnmounted(() => {
      document.removeEventListener('click', onClick);
    });
  }
});

app.config.globalProperties.$messaging = messaging;

const pinia = createPinia();

app.use(VueSweetalert2);
app.use(router);
app.use(pinia);
app.use(PrimeVue);
app.directive('tooltip', Tooltip);

app.component('Dialog', Dialog);
app.mount('#app');
