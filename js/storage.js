// / Gérer le stockage dans le Localstorage
const KEY_USER = 'users'

function saveUser(user) {
    // Get old users
    const users = getUsers()
    // add new One
    users.push(user)
    // Save in LS
    localStorage.setItem(KEY_USER, JSON.stringify(users))
}

function getUsers() {
    // Get users or array if empty
    const datasFromLocalstorage = localStorage.getItem(KEY_USER)
    const convertUsers = JSON.parse(datasFromLocalstorage) || []

    return convertUsers

    // return JSON.parse(localStorage.getItem(KEY_USER)) || []
}

export { saveUser }