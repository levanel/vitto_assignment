import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

// Your Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: 'AIzaSyC00rVcANtK11UCVv73ioLcQfEXNYNazxU',

  authDomain: 'ideathon-34e9f.firebaseapp.com',

  databaseURL: 'https://ideathon-34e9f-default-rtdb.firebaseio.com',

  projectId: 'ideathon-34e9f',

  storageBucket: 'ideathon-34e9f.firebasestorage.app',

  messagingSenderId: '342279182014',

  appId: '1:342279182014:web:989b5c18d48d082396f0ef',

  measurementId: 'G-YJK31NFSLG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push };
