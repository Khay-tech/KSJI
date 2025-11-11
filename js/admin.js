// Admin specific functions

function requireAdminLogin() {
  const user = window.getLoggedInUser() // Assuming getLoggedInUser is a global function
  if (!user || user.role !== "admin") {
    window.location.href = "index.html"
    return null
  }
  return user
}

function renderMembersTable(searchTerm = "") {
  const users = window.getAllUsers().filter((u) => u.role === "member") // Assuming getAllUsers is a global function
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const tableBody = document.getElementById("membersTableBody")
  if (!tableBody) return

  tableBody.innerHTML = ""
  filteredUsers.forEach((user) => {
    const row = document.createElement("tr")
    row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.id}</td>
            <td>${user.email}</td>
            <td>${user.duesPaidMonths}</td>
            <td>
                <button class="btn btn-small" onclick="handleMarkPaid('${user.id}')">Mark Paid</button>
                <button class="btn btn-danger btn-small" onclick="handleDeleteUser('${user.id}')">Delete</button>
            </td>
        `
    tableBody.appendChild(row)
  })
}

function handleMarkPaid(userId) {
  const result = window.markDuesPaid(userId) // Assuming markDuesPaid is a global function
  if (result.success) {
    renderMembersTable()
    alert("Dues marked as paid")
  }
}

function handleDeleteUser(userId) {
  if (confirm("Are you sure you want to delete this member?")) {
    window.deleteUser(userId) // Assuming deleteUser is a global function
    renderMembersTable()
  }
}
