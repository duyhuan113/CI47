const view = {};
view.setActiveScreen = (screenName, fromCreateConversation = false) => {
    switch (screenName) {
        case 'registerPage':
            document.getElementById('app').innerHTML = component.registerPage;
            const registerForm = document.getElementById('register-form');
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = {
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value
                };
                controller.register(data);
            });
            document.getElementById('redirect-login').addEventListener('click', () => {
                view.setActiveScreen('loginPage')
            });
            break;
        case 'loginPage':
            document.getElementById('app').innerHTML = component.loginPage;
            const loginForm = document.getElementById('login-form');
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = {
                    email: loginForm.email.value,
                    password: loginForm.password.value
                };
                controller.login(data);
            });

            document.getElementById('redirect-register').addEventListener('click', () => {
                view.setActiveScreen('registerPage');
            });
            break;

        case 'chatPage':
            document.getElementById('app').innerHTML = component.chatPage;
            const sendMessageForm = document.getElementById('send-message-form');
            sendMessageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const message = {
                    content: sendMessageForm.message.value,
                    owner: model.currentUser.email,
                    createdAt: new Date().toISOString()
                }
                if (sendMessageForm.message.value.trim() !== '') {
                    model.addMessage(message);
                    //view.addMessage(message);
                    sendMessageForm.message.value = '';
                }
            })
            document.getElementById('create-conversation').addEventListener('click', () => {
                view.setActiveScreen('createConversationPage')
            })
            if (fromCreateConversation) {
                view.showCurrentConversation();
                view.showConversations();
            } else {
                model.getConversations();
                model.listenConversationChange();
            }

            const addUser = document.getElementById('add-user-form');
            addUser.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = addUser.email.value
                controller.addUser(data);
            })
            break;

        case 'createConversationPage':
            document.getElementById('app').innerHTML = component.createConversationPage;
            document.getElementById('redirect-to-chat').addEventListener('click', () => {
                view.setActiveScreen('chatPage', true);
            })

            const createConversationForm = document.getElementById('create-conversation-form');
            createConversationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = {
                    titles: createConversationForm.title.value,
                    email: createConversationForm.email.value
                }
                controller.createConversation(data);
            })
            break;


    }
}




view.addMessage = (message) => {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message');
    if (message.owner === model.currentUser.email) {
        messageWrapper.classList.add('mine');
        messageWrapper.innerHTML = `
        <div class="content">${message.content}</div>
        `
    } else {
        messageWrapper.classList.add('their');
        messageWrapper.innerHTML = `
        <div class="owner">${message.owner}</div>
        <div class="content">${message.content}</div>
        `
    }
    document.querySelector('.list-messages').appendChild(messageWrapper);
}

view.showCurrentConversation = () => {
    document.querySelector('.conversation-title').innerHTML = model.currentConversation.titles;
    document.querySelector('.list-messages').innerHTML = '';
    for (message of model.currentConversation.messages) {
        view.addMessage(message);
    }

    document.querySelector('.list-users').innerHTML = '';
    for (user of model.currentConversation.users) {
        view.addUser(user);
    }
    view.scrollToEndElement();
}

view.setErrorMessage = (elementId, content) => {
    document.getElementById(elementId).innerText = content;
}

view.scrollToEndElement = () => {
    const element = document.querySelector('.list-messages');
    element.scrollTop = element.scrollHeight;
}

view.showConversations = () => {
    for (conversation of model.conversations) {
        view.addConversation(conversation)
    }
}
view.addConversation = (conversation) => {
    const conversationWrapper = document.createElement('div');
    conversationWrapper.classList.add('conversation');
    conversationWrapper.classList.add('cursor-pointer');
    if (conversation.id === model.currentConversation.id) {
        conversationWrapper.classList.add('current');
    }
    conversationWrapper.innerHTML = `
    <div class="left-conversation-title">${conversation.titles}</div>
    <div class="number-of-user">${conversation.users.length} Users</div>
    `;
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    // if (mediaQuery.matches) {
    //     conversationWrapper.firstElementChild.innerText = conversation.titles.charAt(0).toUpperCase();
    //     document.getElementById('create-conversation').innerText = '+';
    // }
    mediaQuery.addListener((e) => {
        if (mediaQuery.matches) {
            conversationWrapper.firstElementChild.innerText = conversation.titles.charAt(0).toUpperCase();
            document.getElementById('create-conversation').innerText = '+';
        } else {
            conversationWrapper.firstElementChild.innerText = conversation.titles;
            document.getElementById('create-conversation').innerText = '+ New Conversation';
        }
    })
    conversationWrapper.addEventListener('click', () => {
        model.currentConversation = model.conversations.filter(item => item.id === conversation.id)[0];
        view.showCurrentConversation();
        document.querySelector('.conversation.current').classList.remove('current');
        conversationWrapper.classList.add('current');
    })
    document.querySelector('.list-conversations').appendChild(conversationWrapper);
}

view.addUser = (user) => {
    const addWrraper = document.createElement('div');
    addWrraper.classList.add('user-email');
    addWrraper.innerHTML = user;

    document.querySelector('.list-users').appendChild(addWrraper);
}