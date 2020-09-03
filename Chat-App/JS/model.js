const model = {};

model.currentUser = undefined;
model.conversations = [];
model.currentConversation = undefined;

model.register = async(data) => {
    try {
        const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
        firebase.auth().currentUser.updateProfile({
            displayName: data.firstName + ' ' + data.lastName
        });
        firebase.auth().currentUser.sendEmailVerification();
    } catch (err) {
        alert(err.message);

    }
};

model.login = (data) => {
    try {
        firebase.auth().signInWithEmailAndPassword(data.email, data.password);

    } catch (err) {
        console.log(err);
        alert(err.message)
    }
};

model.getConversations = async() => {
    const response = await firebase.firestore().collection('conversations').where('users', 'array-contains', model.currentUser.email).get()
        //console.log(getManyDocment(response));
    model.conversations = getManyDocment(response);
    if (model.conversations.length > 0) {
        model.currentConversation = model.conversations[0];
        view.showCurrentConversation();
    }
}

model.addMessage = (message) => {
    dataToUpdate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    }
    firebase.firestore().collection('conversations').doc(model.currentConversation.id).update(dataToUpdate);
}

model.listenConversationChange = () => {
    let isFirstRun = true;

    firebase.firestore().collection('conversations').where('users', 'array-contains', model.currentUser.email).onSnapshot((snapshot) => {

        if (isFirstRun) {
            isFirstRun = false;
            return
        }
        console.log(snapshot.docs);
        for (oneChange of snapshot.docChanges()) {

            const docData = getOneDocument(oneChange.doc);
            if (docData.id === model.currentConversation.id) {
                console.log(1);
                model.currentConversation = docData;
                view.addMessage(model.currentConversation.messages[model.currentConversation.messages.length - 1]);
                view.scrollToEndElement();
            }
        }
    });
};