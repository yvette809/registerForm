const form = document.getElementById('form')
const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')





// functions
// show input error mesage
function showError(input, message) {
    //let formControl = document.querySelector('.form-control')
    const formControl = input.parentElement
    formControl.classList.add('error')
    const small = formControl.querySelector('small')
    small.innerText = message

}

// show success message
function showSuccess(input) {
    let formControl = document.querySelector('.form-control')
    formControl.className = 'form-control success'

}

// add to form

const register = (firstname, lastname, email, password1, password2) => {
    let user = {
        id: Math.floor(Math.random()),
        firstname: firstname,
        lastname: lastname,
        email: email,
        password1: password1,
        password2: password2
    }
    console.log(user)

}


// display users

const listUsers = () => {
    let users = document.querySelector('div.users')
    const user = ` <span>${firstname.value.charAt(0).toUpperCase() + firstname.value.slice(1)}</span>
      <span>${lastname.value.charAt(0).toUpperCase() + lastname.value.slice(1)}</span>
    <p>${email.value}</p>  
    <button>X<button>
     `
    users.innerHTML += user

}


// ckeck email validity

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase())
};

// check if user already exist by email



// check password
function checkPassword(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'passwords do not match')
    }
}

// check length
function checkLength(input, min, max){
    if(input.value.length<min){
        showError(input, `${input} must be atleast ${min} characters`)
    }else if(input.value.length> max){
        showError(input, `${input.value} must be less than ${max} characters`)

    }

}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (firstname.value === "") {
        showError(firstname, ' firstname is required')
    } else {
        showSuccess(firstname)

    }

    if (lastname.value === "") {
        showError(lastname, ' lastname is required')
    } else {
        showSuccess(lastname)
    }

    if (email.value === "") {
        showError(email, ' email is required')
    } else if (!validateEmail(email.value)) {
        showError(email, 'Email is not valid')
    } else {
        showSuccess(email)
    }
    if (password.value === "") {
        showError(password, ' password is required')
    } else if (password.value.length < 3 || password.value.length > 15) {
        checkLength(password, 3, 15)
    }
    else {
        showSuccess(password)
    }

    if (password2.value === "") {
        showError(password2, ' you need to confirm your password')
    } else if (password.value !== password2.value ) {
        checkPassword(password, password2)
    }
    else {
        showSuccess(password2)
    }
    if (firstname.value !== "" && lastname.value !== "" && email.value !== "" && (validateEmail(email.value))) {
        register(firstname.value, lastname.value, email.value, password.value, password.value)
        listUsers()
    }
})

