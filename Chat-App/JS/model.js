const model = {};

model.currentUser = undefined;

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

model.login = async(data) => {
    try {
        const response = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
        console.log(response);
        if (response && response.user.emailVerified) {
            model.currentUser = {
                email: response.user.email,
                displayName: response.user.displayName
            }

            view.setActiveScreen('chatPage');

        } else {
            alert('Please Verify Your Email!');
        }
    } catch (err) {
        console.log(err);
        alert(err.message)
    }
};