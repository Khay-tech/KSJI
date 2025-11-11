// Modal functionality
function openLoginModal() {
  document.getElementById("loginModal").style.display = "block"
}

function closeLoginModal() {
  document.getElementById("loginModal").style.display = "none"
}

// Event listeners
document.getElementById("loginBtn").addEventListener("click", openLoginModal)
document.getElementById("signupBtn").addEventListener("click", () => {
  window.location.href = "signup.html"
})

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  const modal = document.getElementById("loginModal")
  if (event.target == modal) {
    modal.style.display = "none"
  }
})

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  checkUserSession()
})

function checkUserSession() {
  const loggedInUser = localStorage.getItem("loggedInUser")
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser)
    redirectToDashboard(user)
  }
}

function redirectToDashboard(user) {
  if (user.role === "admin") {
    window.location.href = "admin.html"
  } else {
    window.location.href = "dashboard.html"
  }
}
