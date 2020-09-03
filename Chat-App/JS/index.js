window.onload = () => {
    var firebaseConfig = {
        apiKey: "AIzaSyAi1LRhedpBbQrb1FAepC04VCTWBrTQb8o",
        authDomain: "chat--app-e21a6.firebaseapp.com",
        databaseURL: "https://chat--app-e21a6.firebaseio.com",
        projectId: "chat--app-e21a6",
        storageBucket: "chat--app-e21a6.appspot.com",
        messagingSenderId: "185988236769",
        appId: "1:185988236769:web:6d638b8d4b75ff332d7ea0",
        measurementId: "G-T8HX0D1K5X"
    };
    firebase.initializeApp(firebaseConfig);
    //console.log(firebase.app());
    firebase.auth().onAuthStateChanged((user) => {
        //console.log(user);
        if (user) {
            model.currentUser = {
                displayName: user.displayName,
                email: user.email
            }
            if (user.emailVerified) {
                view.setActiveScreen('chatPage');
            } else {
                alert('Please Verified Your Email');
                firebase.auth().signOut();
                view.setActiveScreen('loginPage');
            }
        } else {
            view.setActiveScreen('loginPage');
        }
    });
    view.setActiveScreen('loginPage');

};




// const updateMessage = async(message) => {
//     const docId = '8zzlgzchdbB8dpbTxdNv';
//     const messageToAdd = {
//         content: message.content,
//         owner: message.owner,
//         createdAt: message.createdAt
//     }
//     const el = {
//         messages: firebase.firestore.FieldValue.arrayUnion(messageToAdd)
//     }
//     firebase.firestore().collection('conversations').doc(docId).update(el);
// }

// const templateFirestore = async() => {
//     //getOne
//     const docId = 'FcgEhyc6fdWArXU7V3yl';
//     const response = await firebase.firestore().collection('users').doc(docId).get();
//     const user = getOneDocument(response);
//     //console.log(user);

//     //getMany

//     const responseMany = await firebase.firestore().collection('users').get();
//     console.log(responseMany);

//     const firstUser = getOneDocument(responseMany.docs[0]);

//     const users = getManyDocment(responseMany);
//     //console.log(users);
//     const dataToCreate = {
//             age: 100,
//             name: 'ABC'
//         }
//         //add Data
//         //firebase.firestore().collection('users').add(dataToCreate);
//     const idToUpdate = 'wJaOz5OTrcFtX7SnwGUd';
//     const dataToUpdate = {
//             name: 'Long',
//             phone: firebase.firestore.FieldValue.arrayUnion('099')
//         }
//         //Update Data
//         //firebase.firestore().collection('users').doc(idToUpdate).update(dataToUpdate);

//     //delete
//     const idToDelete = 'jQiVBJtDdgTjqW0c4pjq';
//     //firebase.firestore().collection('users').doc(idToDelete).delete();
// };



const getManyDocment = (response) => {
    const listData = [];
    for (const doc of response.docs) {
        listData.push(getOneDocument(doc));
    }
    return listData;
};

const getOneDocument = (response) => {
    const data = response.data();
    data.id = response.id;
    return data;
};