// Dashboard utility functions

// Declare getLoggedInUser function
function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"))
}

function requireLogin() {
  const user = getLoggedInUser()
  if (!user) {
    window.location.href = "index.html"
    return null
  }
  return user
}

// Declare getUsersFromStorage function
function getUsersFromStorage() {
  return JSON.parse(localStorage.getItem("users")) || []
}

function updateUserProfile(userId, updates) {
  const users = getUsersFromStorage()
  const userIndex = users.findIndex((u) => u.id === userId)

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updates }
    saveUsersToStorage(users)
    localStorage.setItem("loggedInUser", JSON.stringify(users[userIndex]))
    return { success: true, user: users[userIndex] }
  }

  return { success: false, message: "User not found" }
}

function getAllUsers() {
  return getUsersFromStorage()
}

// Declare saveUsersToStorage function
function saveUsersToStorage(users) {
  localStorage.setItem("users", JSON.stringify(users))
}

function deleteUser(userId) {
  const users = getUsersFromStorage()
  const filteredUsers = users.filter((u) => u.id !== userId)
  saveUsersToStorage(filteredUsers)
  return { success: true }
}

function markDuesPaid(userId) {
  const users = getUsersFromStorage()
  const userIndex = users.findIndex((u) => u.id === userId)

  if (userIndex !== -1) {
    users[userIndex].duesPaidMonths += 1
    saveUsersToStorage(users)
    return { success: true, duesPaidMonths: users[userIndex].duesPaidMonths }
  }

  return { success: false, message: "User not found" }
}
