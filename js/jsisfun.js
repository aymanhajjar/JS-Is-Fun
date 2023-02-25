var register_popup = document.getElementById('registerPopup')
var container = document.getElementById('container')
var register_form = document.getElementById('registerForm')
var login_status = document.getElementById('status')
var reg_button = document.getElementById('regButton')
var password = document.getElementById('password')
var full_name = ''
var password_validated = false

password.addEventListener('focus', () => {
    var validation = document.getElementById('validation')
    validation.classList.add('validationOpened')
    })

password.addEventListener('focusout', () => {
    var validation = document.getElementById('validation')
    validation.classList.remove('validationOpened')
    })

password.addEventListener('keyup', () => {
    var lower = document.getElementById("lowercase");
    var upper = document.getElementById("uppercase");
    var special = document.getElementById("special");
    var number = document.getElementById("number");
    var length = document.getElementById("length");

    var lower_case = /[a-z]/g
    var upper_case = /[A-Z]/g
    var special_characters = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g
    var numbers = /[0-9]/g

    password.value.match(lower_case) ? lower.classList.replace('error', 'correct') : lower.classList.replace('correct', 'error');
    password.value.match(upper_case) ? upper.classList.replace('error', 'correct') : upper.classList.replace('correct', 'error');
    password.value.match(special_characters) ? special.classList.replace('error', 'correct') : special.classList.replace('correct', 'error');
    password.value.match(numbers) ? number.classList.replace('error', 'correct') : number.classList.replace('correct', 'error');
    password.value.length >= 8 ? length.classList.replace('error', 'correct') : length.classList.replace('correct', 'error');

    if(password.value.match(lower_case) && password.value.match(upper_case)
    && password.value.match(special_characters) && password.value.match(numbers)
    && password.value.length >= 8) {
        password_validated = true
    } else {
        password_validated =  false
    }
})

function openForm() {
    if(full_name) {
        login_status.innerText = `You must register first`
        reg_button.innerHTML = 'Register'
        full_name = ''
    } else {
        register_popup.classList.add('openForm')
        container.classList.add('containerBlur')
    }
}

function submitForm() {
    if(validateForm()) {
        var json_object = {
            'firstname': register_form.elements['firstname'].value,
            'lastname': register_form.elements['lastname'].value,
            'email': register_form.elements['email'].value,
            'password': register_form.elements['password'].value,
        }
        console.log('JSON Object: ',json_object)
        full_name = register_form.elements['firstname'].value + ' ' + register_form.elements['lastname'].value
        reg_button.innerHTML = 'Sign Out'
        login_status.innerText = `Welcome, ${full_name}!`
        closeForm()
    }
}

function validateForm() {
    var firstname = document.getElementById('firstname')
    var lastname = document.getElementById('lastname')
    var error = document.getElementById('errormessage')
    var confirm_password = document.getElementById('confirmPassword')
    var email = document.getElementById('email')
    var email_regex =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    error.innerHTML = ''

    if(firstname.value.length == 0) {
        error.innerHTML = 'Please provide your first name!'
        firstname.classList.add('errorField')
        return false
    }
    if(lastname.value.length == 0) {
        error.innerHTML = 'Please provide your last name!'
        lastname.classList.add('errorField')
        return false
    }
    if(!email.value.match(email_regex) || email.value.length == 0) {
        error.innerHTML = 'Please provide a valid email!'
        email.classList.add('errorField')
        return false
    }
    if(!password_validated) {
        error.innerHTML = "Please fix your password!"
        password.classList.add('errorField')
        return false
    }
    if(password.value != confirm_password.value) {
        error.innerHTML = "Passwords don't match!"
        password.classList.add('errorField')
        confirm_password.classList.add('errorField')
        return false
    }
    return true
}

function closeForm() {
    register_popup.classList.remove('openForm')
    container.classList.remove('containerBlur')
}

function mergeSort() {
    var numbers = prompt('Input 10 numbers, sperate by comma ","')
}

function palindrome() {
    var result = document.getElementById('palindromeResult')
    var string = prompt('Input a string')
    var isPalindrome = palindromeCheck(string)
    if(isPalindrome) {
        result.innerHTML = `Yes, <b>${string}</b> is a palindrome string!`
    } else {
        result.innerHTML = `No, <b>${string}</b> is <i>not</i> a palindrome string!`
    }
}

function palindromeCheck(string) {
    if(string.length == 1 || string.length == 0) {
        return true
    }
    if (string[0] == string[string.length - 1]) {  
        string = string.substring(1, string.length-1);
        return palindromeCheck(string);
      }
    return false
}

function prime () {
    var result = document.getElementById('primeResult')
    var number = prompt('Input your age')
    var isPrime = primeCheck(number)
    if(isPrime) {
        result.innerHTML = `Yes, your age, <b>${number}</b>, is a prime number!`
    } else {
        result.innerHTML = `No, your age, <b>${number}</b>, is <i>not</i> a prime number!`
    }
}

function primeCheck(number) {
    if (number <= 1) return false;
    if (number === 2) return true;
    var sqrt = Math.sqrt(number);
    for (var i = 2; i <= sqrt; i++) 
        if (number % i === 0) return false;
    return true;
}