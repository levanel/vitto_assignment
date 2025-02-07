import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

// Your Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: 'xxxxx',

  authDomain: 'xxxxx',

  databaseURL: 'xxxx',

  projectId: 'xxxx',

  storageBucket: 'xxxx',

  messagingSenderId: 'x',

  appId: '1:xxx',

  measurementId: 'xxxxFSLG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push };
// if you want to clone this repo,  then firstly create a firebase account and generate your own api key.
