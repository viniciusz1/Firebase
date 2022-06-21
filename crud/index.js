const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, addDoc } = require('firebase/firestore/lite');

const firebaseConfig = {
    apiKey: "AIzaSyDaq61zpJMCaWNDv5c82UcbHNyzfREPc3s",
    authDomain: "acoustic-mix-331823.firebaseapp.com",
    projectId: "acoustic-mix-331823",
    storageBucket: "acoustic-mix-331823.appspot.com",
    messagingSenderId: "205599177627",
    appId: "1:205599177627:web:013d6cbe6bedd68c747f3e",
    measurementId: "G-97ZKDB226T"
  };
  

const app = initializeApp(firebaseConfig);

const db = getFirestore();


async function save(nomeTabela, id, dado) {
    if (id) {
        const referenceEntity = await setDoc(doc(db,nomeTabela, id), dado);
        const savedData = {
            ...dado, id: id
        }
        return savedData;
    } else {
        const referenceEntity = await addDoc(collection(db, nomeTabela), dado);
        const savedData = {...dado, id: referenceEntity.id}
        return savedData;
    }
}

module.exports = {
    save
}