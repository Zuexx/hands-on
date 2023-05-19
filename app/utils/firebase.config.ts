const config = {
  apiKey: process.env.APP_FIREBASE_API_KEY,
  authDomain: process.env.APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.APP_FIREBASE_DATABASE_URL,
  projectId: process.env.NODE_ENV === "development" ? `demo-${process.env.APP_FIREBASE_PROJECT_ID}` : process.env.APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.APP_FIREBASE_APP_ID,
  measurementId: process.env.APP_FIREBASE_MEASUREMENT_ID
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(`No APP_Firebase configuration object provided.\nAd d your web app's configuration object to firebase-config.ts`)
  }
  else {
    return config
  }
}
