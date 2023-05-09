const config = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(`No Firebase configuration object provided.\nAdd your web app's configuration object to firebase-config.ts`)
  }
  else {
    return config
  }
}
