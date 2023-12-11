import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC1AC1RrVZC3y7BaFYPb5XaOlgsv0V7ipw",
  authDomain: "hostclone-b308f.firebaseapp.com",
  projectId: "hostclone-b308f",
  storageBucket: "hostclone-b308f.appspot.com",
  messagingSenderId: "424114306279",
  appId: "1:424114306279:web:a504e34cb25fec5bcff642",
  measurementId: "G-3SD68F9RYW",
};

initializeApp(firebaseConfig);

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BJO4Bkjz7x1zfl91kn9653kN6FUhribggzKqGMABrUts1drwgZX0tDE0u3QcQVj5rjEZyuhGrNR5RGsL5Xk5rig",
  })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

const messaging = getMessaging();
//......

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
