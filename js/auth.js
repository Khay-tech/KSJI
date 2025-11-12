// Authentication utility functions

const ADMIN_PASSKEY = "Cadetadmin832"

function hashPassword(password) {
  return btoa(password)
}

function verifyPassword(password, hash) {
  return btoa(password) === hash
}

function getUsersFromStorage() {
  const users = localStorage.getItem("ksji_users")
  return users ? JSON.parse(users) : []
}

function saveUsersToStorage(users) {
  localStorage.setItem("ksji_users", JSON.stringify(users))
}

function registerUser(name, cadetId, email, password, role = "member") {
  const users = getUsersFromStorage()

  if (users.find((u) => u.email === email || u.id === cadetId)) {
    return { success: false, message: "Email or ID already exists" }
  }

  const newUser = {
    id: cadetId,
    name: name,
    email: email,
    password: hashPassword(password),
    duesPaid: [],
    role: role,
  }

  users.push(newUser)
  saveUsersToStorage(users)

  return { success: true, message: "Registration successful" }
}

function loginUser(emailOrId, password) {
  const users = getUsersFromStorage()
  const user = users.find((u) => u.email === emailOrId || u.id === emailOrId)

  if (!user || !verifyPassword(password, user.password)) {
    return { success: false, message: "Invalid email/ID or password" }
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user))
  return { success: true, user: user }
}

function verifyAdminPasskey(passkey) {
  return passkey === ADMIN_PASSKEY
}

function loginAsAdmin(passkey) {
  if (!verifyAdminPasskey(passkey)) {
    return { success: false, message: "Invalid admin passkey" }
  }

  const adminUser = {
    id: "ADMIN_SESSION",
    name: "Administrator",
    email: "admin@ksji.local",
    role: "admin",
    isAdminSession: true,
  }

  localStorage.setItem("loggedInUser", JSON.stringify(adminUser))
  return { success: true, user: adminUser }
}

function logoutUser() {
  localStorage.removeItem("loggedInUser")
  window.location.href = "index.html"
}

function getLoggedInUser() {
  const user = localStorage.getItem("loggedInUser")
  return user ? JSON.parse(user) : null
}

function updateMemberDuesPaid(memberId, monthKey) {
  const users = getUsersFromStorage()
  const userIndex = users.findIndex((u) => u.id === memberId)

  if (userIndex !== -1) {
    if (!users[userIndex].duesPaid.includes(monthKey)) {
      users[userIndex].duesPaid.push(monthKey)
      users[userIndex].duesPaid.sort()
    }
    saveUsersToStorage(users)
    return { success: true, user: users[userIndex] }
  }

  return { success: false, message: "Member not found" }
}

// Form submission handlers
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value
      const password = this.querySelector('input[type="password"]').value

      const result = loginUser(email, password)
      if (result.success) {
        if (result.user.role === "admin") {
          window.location.href = "admin.html"
        } else {
          window.location.href = "dashboard.html"
        }
      } else {
        alert(result.message)
      }
    })
  }
})
