

const firebaseConfig = {
    apiKey: window.appConfig.apiKey,
    authDomain: window.appConfig.authDomain,
    projectId: window.appConfig.projectId,
    storageBucket: window.appConfig.storageBucket,
    messagingSenderId: window.appConfig.messagingSenderId,
    appId: window.appConfig.appId,
    measurementId: window.appConfig.measurementId
};
const app = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth();
const db = firebase.firestore()
// console.log(process.env.apiKey)