import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCb0BygcivIRkDXKHGDHmd8iqnuEw1nkLw",
  authDomain: "tailortech-1112.firebaseapp.com",
  projectId: "tailortech-1112",
  storageBucket: "tailortech-1112.appspot.com",
  messagingSenderId: "1011722345635",
  appId: "1:1011722345635:web:3d8dbcd35936e1bc9ff316",
};

let app;

if (initializeApp.length === 0) {
  app = initializeApp(firebaseConfig);
}

let auth;

if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
