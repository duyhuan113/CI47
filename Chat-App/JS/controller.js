const controller = {};

function validateEmail(email) {
    const emailFomat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailFomat.test(String(email).toLowerCase());
}

function validatePassword(password) {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
    console.log(password);
    return re.test(password);
}

controller.register = (data) => {
    if (data.firstName === '') {
        document.getElementById('first-name-error').innerHTML = 'Please Enter Your First Name';
    } else {
        document.getElementById('first-name-error').innerHTML = '';
    }

    if (data.lastName === '') {
        document.getElementById('last-name-error').innerHTML = 'Please Enter Your Last Name';
    } else {
        document.getElementById('last-name-error').innerHTML = '';
    }

    if (data.email === '') {
        document.getElementById('email-error').innerHTML = 'Please Enter Your Email';
    } else {
        if (validateEmail(data.email) == true) {
            document.getElementById('email-error').innerHTML = '';

        } else {
            document.getElementById('email-error').innerHTML = 'Invalid Email';
        }
    }

    if (data.password === '') {
        document.getElementById('password-error').innerHTML = 'Please Enter Your Password';
    } else {
        if (validatePassword(data.password) == true) {
            document.getElementById('password-error').innerHTML = '';
            console.log('s');
        } else {
            document.getElementById('password-error').innerHTML = 'Password Must Be Longer Than 6 Characters, Contains 1 Upper Case Character and 1 Number';
            console.log('f');
        }
    }
    if (data.confirmPassword === '') {
        document.getElementById('confirm-password-error').innerHTML = 'Please Confirm Your Password';
    } else {
        if (data.confirmPassword !== data.password) {
            document.getElementById('confirm-password-error').innerHTML = "Confirm Password Doesn't Match With PassWord";
        } else {
            document.getElementById('confirm-password-error').innerHTML = "";
        }
    }
}

controller.login = (data) => {
    if (data.userName === '') {
        document.getElementById('user-name-error').innerHTML = 'Please Enter Your First Name';
    } else {
        document.getElementById('user-name-error').innerHTML = '';
    }

    if (data.password === '') {
        document.getElementById('password-error').innerHTML = 'Please Enter Your Password';
    } else {
        if (validatePassword(data.password) == true) {
            document.getElementById('password-error').innerHTML = '';
            console.log('s');
        } else {
            document.getElementById('password-error').innerHTML = 'Password Must Be Longer Than 6 Characters, Contains 1 Upper Case Character and 1 Number';
            console.log('f');
        }
    }
}