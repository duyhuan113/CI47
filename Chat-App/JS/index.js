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
    view.setActiveScreen('loginPage');
};