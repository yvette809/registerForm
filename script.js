// array of users

let users = [
    {
        id: 1,
        firstname: 'yvette',
        lastname: 'tanila',
        email: 'evebabe2006@yahoo.com'
    },

    {
        id: 2,
        firstname: 'terrel',
        lastname: 'roland',
        email: 'terrel2006@yahoo.com'
    },

]

// let users;

// get users from localstorage
// const localStorageUsers = JSON.parse(localStorage.getItem('users'))
// //if we hav users in the local storage, we get them otherwise we return an empty array

// let users = localStorage.getItem('users')!==null? localStorageUsers: []


// dom elements

const form = document.getElementById('form')
const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
let output = document.querySelector('ul.users')
console.log(output)



// functions
// show input error mesage
function showError(input, message) {
    const parent = input.parentElement
    parent.classList.add('error')
    parent.classList.remove('success')
    const small = parent.querySelector('small')
    small.innerText = message

}

// show success message
function showSuccess(input) {
    const parent = input.parentElement
    parent.classList.remove('error')
    parent.classList.add('success')

}

// check required fields
const checkRequired = (inputArr) => {
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${input.id} is required`)
        } else {
            showSuccess(input)
        }

    })

}


// display users

const listUsers = () => {

    output.innerHTML = ""

    users.forEach(user => {

        output.innerHTML += `<li 'id=${user.id}' class="user-div">
        <span>${user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}</span>
        <span>${user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1)}</span>
        <small>${user.email}</small>  
        <button type="button" class="btn" onclick= 'deleteUser(${user.id})'>X</button>
        <i class="fas fa-pencil-alt" onclick= 'editUser(${user.id})'></i>
      <li>
       `
    })


}

listUsers()


// register a user

const register = (firstname, lastname, email, password1, password2) => {
    let user = {
        id: Date.now().toString(),
        firstname: firstname,
        lastname: lastname,
        email: email,
        password1: password1,
        password2: password2
    }

    users.push(user)
    listUsers()
    updateLocalStorage()

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
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${input.id} must be atleast ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${input.id} must be less than ${max} characters`)

    }

}

// delete user

// output.addEventListener('click', e => {
//     if (e.target.classList.contains('btn')) {
//         e.target.parentElement.remove()
//         window.confirm('Are you sure')
//     }
//     updateLocalStorage()

// })


const deleteUser = (id) => {
    users = users.filter(user => user.id !== id)
     console.log(users)
     listUsers()
     updateLocalStorage()
}


// edit user

// add users to local storage

function updateLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    checkRequired([firstname, lastname, email, password, password2])
    if (firstname.value !== "" && lastname.value !== "" && email.value !== "" && (validateEmail(email.value))) {
        register(firstname.value, lastname.value, email.value, password.value, password.value)
        firstname.value = ""
        lastname.value = ""
        email.value = ""
        password.value = ""
        password2.value = ""


    }
})


