import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirebaseConfig } from './firebase.config';

const app = initializeApp(getFirebaseConfig())
const auth = getAuth(app);

export { app, auth }
