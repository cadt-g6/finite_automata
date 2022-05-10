import { FirebaseApp, initializeApp } from 'firebase/app';
import process from 'process';

class FirebaseConfig {
  static instance: FirebaseApp;
  static initialize() {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_apiKey,
      authDomain: process.env.REACT_APP_authDomain,
      projectId: process.env.REACT_APP_projectId,
      storageBucket: process.env.REACT_APP_storageBucket,
      messagingSenderId: process.env.REACT_APP_messagingSenderId,
      appId: process.env.REACT_APP_appId,
      measurementId: process.env.REACT_APP_measurementId,
    };
    this.instance = initializeApp(firebaseConfig);
  }
}

export default FirebaseConfig;
