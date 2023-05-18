import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirebaseConfig } from './firebase.config';

const app = initializeApp(getFirebaseConfig())
const auth = getAuth(app);

// if (process.env.NODE_ENV === "development")
//     connectAuthEmulator(auth, "http://127.0.0.1:9099")

export { app, auth }
