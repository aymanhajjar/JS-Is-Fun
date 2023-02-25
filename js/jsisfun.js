var register_form = document.getElementById('registerForm')
var container = document.getElementById('container')

function openForm() {
    register_form.classList.add('openForm')
    container.classList.add('containerBlur')
}

function closeForm() {
    register_form.classList.remove('openForm')
    container.classList.remove('containerBlur')
}

function mergeSort() {
    var numbers = prompt('Input 10 numbers, sperate by comma ","')
}

function palindrome () {
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

function checkPrime () {
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