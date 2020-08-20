const view = {};
view.setActiveScreen = (screenName) => {
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
                }

                controller.register(data);
            });
            document.getElementById('turn-login').onclick = () => {
                view.setActiveScreen('loginPage')
            }
            break;
        case 'loginPage':
            document.getElementById('app').innerHTML = component.loginPage;
            const loginForm = document.getElementById('login-form');
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = {
                    userName: loginForm.userName.value,
                    password: loginForm.password.value
                }
                controller.login(data);
            });

            document.getElementById('turn-register').onclick = () => {
                view.setActiveScreen('registerPage')
            }
            break;

    }
}