import firebase from 'firebase';
import 'firebase/firestore';
import firebaseconfig from './firebaseconfig'

const firebaseapp = firebase.initializeApp(firebaseconfig)
const firestore = firebase.firestore()
 const settings = {
    timestampsInSnapshots: true
}
firestore.settings(settings);
export default firebaseapp.firestore()