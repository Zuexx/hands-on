import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirebaseConfig } from './firebase.config';

const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app)

if (process.env.NODE_ENV === "development" && !auth.emulatorConfig) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: false })
}

export { app, auth }
