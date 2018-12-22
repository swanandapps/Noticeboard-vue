import firebase from 'firebase';
import 'firebase/firestore';
import firebaseconfig from './firebaseconfig'

const firebaseapp = firebase.initializeApp(firebaseconfig)
const firestore = firebase.firestore()
firestore.settings({
    timestampsInSnapshots: true
})

export default firebaseapp.firestore()