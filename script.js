


let users = []

// get users from localstorage
const localStorageUsers = JSON.parse(localStorage.getItem('users'))
users = localStorage.getItem('users') !== null ? localStorageUsers : []

// dom elements

const form = document.getElementById('form')
const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
let output = document.querySelector('ul.users')


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

        output.innerHTML += `<li id="${user.id}" class="user-div list-group-item text-center">
        <span>${user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}</span>
        <span>${user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1)}</span>
        <small>${user.email}</small>  
        <button type="button" class="delete-btn" >X</button>
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

    users.unshift(user)
    showAlert('user added', 'success')
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

output.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove()
        window.confirm('Are you sure')
        showAlert('user deleted', 'success')
        updateLocalStorage()
    }


})



// show Alert
function showAlert(message, className) {
    const div = document.createElement('div')
    div.className = `alert alert-${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector('.container')
    container.insertBefore(div, form)

    //disappear in 3 seconds
    setTimeout(() => {
        document.querySelector('.alert').remove()

    }, 3000)
}





// edit user

function editUser(id) {
    let newUsers = users
    console.log('newUsers', newUsers)
    let foundUser = newUsers.find(user => user.id === id)
    console.log(foundUser)


}

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


