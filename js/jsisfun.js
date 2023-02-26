var register_popup = document.getElementById('registerPopup')
var container = document.getElementById('container')
var register_form = document.getElementById('registerForm')
var login_status = document.getElementById('status')
var reg_button = document.getElementById('regButton')
var password = document.getElementById('password')
var scroll_button = document.getElementById("scrollUp")
var firstSection = document.getElementById('firstSection')
var secondSection = document.getElementById('secondSection')
var result = document.getElementById('mergeResult')
var members_text = document.getElementById('membersText')
var full_name = ''
var password_validated = false
var position = 0
var direction = 1
var registered = false
var alerted = false

fetch('http://ip-api.com/json/?fields=61439')
.then(response => response.json())
.then(data => {
    document.getElementById('location').innerHTML += data.city + ', ' + data.regionName + ', ' + data.country
    document.getElementById('ip').innerHTML += data.query
})

var moveText = setInterval(() => {
  position += direction * 2
  if (position > 20 || position < 0) {
    direction *= -1
  }
  members_text.style.left = position + 'px'
}, 50)


window.addEventListener('scroll', function() {
    var boundaries = secondSection.getBoundingClientRect()

    if (
       boundaries.top >= 0 &&
       boundaries.top <= (window.innerHeight || document.documentElement.clientHeight) &&
       !alerted
       ) {
        if(registered) {
            alert('You are accessing a members-only area, enjoy!')
            alerted = true
        } else {
            alert('You must be registered to access this area!')
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        }
    } 
    else if (boundaries.top > (window.innerHeight || document.documentElement.clientHeight)) {
        alerted = false
    }
 })

function goTo(div) {
    if(div == 'firstSection') {
        firstSection.scrollIntoView({ behavior: 'smooth' })
    } else if(div == 'secondSection'){
        secondSection.scrollIntoView({ behavior: 'smooth' })
    }
 }

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scroll_button.style.display = "block"
    } else {
      scroll_button.style.display = "none"
    }
  }

function scrollUp() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

password.addEventListener('focus', () => {
    var validation = document.getElementById('validation')
    validation.classList.add('validationOpened')
    })

password.addEventListener('focusout', () => {
    var validation = document.getElementById('validation')
    validation.classList.remove('validationOpened')
    })

password.addEventListener('keyup', () => {
    var lower = document.getElementById("lowercase")
    var upper = document.getElementById("uppercase")
    var special = document.getElementById("special")
    var number = document.getElementById("number")
    var length = document.getElementById("length")

    var lower_case = /[a-z]/g
    var upper_case = /[A-Z]/g
    var special_characters = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g
    var numbers = /[0-9]/g

    password.value.match(lower_case) ? lower.classList.replace('error', 'correct') : lower.classList.replace('correct', 'error')
    password.value.match(upper_case) ? upper.classList.replace('error', 'correct') : upper.classList.replace('correct', 'error')
    password.value.match(special_characters) ? special.classList.replace('error', 'correct') : special.classList.replace('correct', 'error')
    password.value.match(numbers) ? number.classList.replace('error', 'correct') : number.classList.replace('correct', 'error')
    password.value.length >= 8 ? length.classList.replace('error', 'correct') : length.classList.replace('correct', 'error')

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
        registered = false
    } else {
        register_popup.classList.add('openForm')
        container.classList.add('containerBlur')
        document.getElementById('location').style.display = 'none'
        document.getElementById('ip').style.display = 'none'
    }
}

function consonants() {
    var text = document.getElementById('consonantResult')
    var word = prompt('Input a word')
    var word_holder = word
    var set_of_consonants = ''
    var i = 0
    var vowels = ['e', 'i', 'a', 'u', 'o']

    while(!vowels.includes(word[0]) && word.length > 0) {
        set_of_consonants += word[0]
        word = word.substring(1, word.length)
    }
    word += set_of_consonants + 'ay'
    text.innerHTML = `<b>${word_holder}</b> becomes <b>${word}</b>`
}

function getIP() {
    var result = document.getElementById('ipResult')
    fetch('https://api.bigdatacloud.net/data/client-ip')
      .then(response => response.json())
      .then(data => {
        var ipaddress = data.ipString
        var sum = 0
        for (var i = 0; i < ipaddress.length; i++) {
            if(parseInt(ipaddress[i]) % 2 == 0) {
                sum += parseInt(ipaddress[i])
            }
          }
        result.innerHTML = `Your IP address is <b>${data.ipString}</b> and the sum of its even numbers is <b>${sum}</b>`
      })
}

function submitForm() {
    if(validateForm()) {
        var js_object = {
            'firstname': register_form.elements['firstname'].value,
            'lastname': register_form.elements['lastname'].value,
            'email': register_form.elements['email'].value,
            'password': register_form.elements['password'].value,
        }
        var json_object = JSON.stringify(js_object)
        console.log('JSON Object: ',json_object)
        full_name = register_form.elements['firstname'].value + ' ' + register_form.elements['lastname'].value
        reg_button.innerHTML = 'Sign Out'
        login_status.innerText = `Welcome, ${full_name}!`
        closeForm()
        registered = true
    }
}

function reverse() {
    var string = prompt('Input a string')
    var string_holder = string
    var numbers = []
    var newstring = ''
    for (var i = 0; i < string.length; i++) {
        if(!isNaN(string[i]))
        numbers.push(string[i])
    }
    for (var i = 0; i < string.length; i++) {
        if(!isNaN(string[i])) {
            newstring += numbers.pop()
        } else {
            newstring += string[i]
        }
    }
    document.getElementById('reverseResult').innerHTML = `<b>${string_holder}</b> reversed is <b>${newstring}</b>`
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
    document.getElementById('location').style.display = 'flex'
    document.getElementById('ip').style.display = 'block'
}

function mergeStart() {
    var numbers = prompt('Input 10 numbers, sperated by comma ","')
    var unsortedDiv = document.getElementById('unsortedArray')
    var sortedDiv = document.getElementById('sortedArray')
    unsortedDiv.innerHTML = ''
    sortedDiv.innerHTML = ''
    var array = numbers.split(',').map(Number)
    unsortedDiv.classList.add('mergeOpened')
    for(var i=0; i<array.length; i++) {
        unsortedDiv.innerHTML += `<div class="mergeNumber">${array[i]}</div>`
    }
    sortedDiv.classList.add('mergeOpened')
    var sortedArray = mergeSort(array)
    for(var i=0; i<sortedArray.length; i++) {
        sortedDiv.innerHTML += `<div class="mergeNumber">${sortedArray[i]}</div>`
    }
}

function mergeSort(array) {
    if (array.length <= 1) {
        return array
      }
    var  mid = Math.floor(array.length / 2)
    var sortedLeft = mergeSort(array.slice(0, mid))
    let sortedRight = mergeSort(array.slice(mid))

    return merge(sortedLeft, sortedRight)
}

function merge(leftArr, rightArr) {
    var sortedArr = []
    while (leftArr.length > 0 && rightArr.length > 0) {
      if (leftArr[0] < rightArr[0]) {
        sortedArr.push(leftArr.shift())
      } else {
        sortedArr.push(rightArr.shift())
      }
    }
    return sortedArr.concat(leftArr, rightArr)
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
        string = string.substring(1, string.length-1)
        return palindromeCheck(string)
      }
    return false
}

function prime () {
    var result = document.getElementById('primeResult')
    var number = prompt('Input your year of birth')
    var isPrime = primeCheck(number)
    var ageIsPrime = primeCheck(2023-number)
    if(isPrime) {
        result.innerHTML = `Yes, your birth year, <b>${number}</b>, is a prime number!`
    } else {
        result.innerHTML = `No, your birth year, <b>${number}</b>, is <i>not</i> a prime number!`
    }
    if(ageIsPrime) {
        result.innerHTML += ` And your age, <b>${2023-number}</b>, is a prime number!`
    } else {
        result.innerHTML += ` And your age, <b>${2023-number}</b>, is <i>not</i> a prime number!`
    }
}

function primeCheck(number) {
    if (number <= 1) return false
    if (number === 2) return true
    var sqrt = Math.sqrt(number)
    for (var i = 2; i <= sqrt; i++) 
        if (number % i === 0) return false
    return true
}

class Course {
    constructor(name, cdn, credits) {
      this.name = name
      this.cdn = cdn
      this.credits = credits
    }
  }

function submitCourse() {
    var course_name = document.getElementById('course')
    var course_cdn = document.getElementById('cdn')
    var course_credits = document.getElementById('credits')
    var favourite_course = new Course(course_name, course_cdn, course_credits)
    document.getElementById('courseResult').innerHTML = 'A new JS class object was created containing your course!'
}