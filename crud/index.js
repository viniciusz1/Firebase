const { initializeApp } = require('firebase/app');
const {
    getFirestore,
    collection,
    doc,
    setDoc,
    addDoc,
    query,
    where,
    getDocs,
    getDoc,
    deleteDoc   
} = require('firebase/firestore/lite');
//query -- consulta
//where -- adicionar condições
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
        const referenceEntity = await setDoc(doc(db, nomeTabela, id), dado);
        const savedData = {
            ...dado, id: id
        }
        return savedData;
    } else {
        const referenceEntity = await addDoc(collection(db, nomeTabela), dado);
        const savedData = { ...dado, id: referenceEntity.id }
        return savedData;
    }
}


async function get(nomeTabela) {
    const tableRef = collection(db, nomeTabela);

    const q = query(tableRef);

    const querySnapshot = await getDocs(q);

    const lista = []


    querySnapshot.forEach((doc) => {
        const data = {
            ...doc.data(),
            id: doc.id
        }
        lista.push(data);
        console.log(doc.id, " => ", doc.data());
    });
    return lista;
}

async function getById(nomeTabela, id) {
    const docRef = doc(db, nomeTabela, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return new Error("Not found")
    }
}

async function remove(nomeTabela, id) {
    const dado = await deleteDoc(doc(db, nomeTabela, id));
    return {
        message: `${id} deleted`
    }

}

module.exports = {
    save,
    get,
    getById,
    remove
}