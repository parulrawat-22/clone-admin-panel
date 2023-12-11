importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyC1AC1RrVZC3y7BaFYPb5XaOlgsv0V7ipw",
  authDomain: "hostclone-b308f.firebaseapp.com",
  projectId: "hostclone-b308f",
  storageBucket: "hostclone-b308f.appspot.com",
  messagingSenderId: "424114306279",
  appId: "1:424114306279:web:a504e34cb25fec5bcff642",
  measurementId: "G-3SD68F9RYW",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
