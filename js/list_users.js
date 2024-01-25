const urlData = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const encodedData = urlParams.get("clientData")
    const userEmail = urlParams.get("email")
    if (encodedData) {
        const decodedData = decodeURIComponent(encodedData)
        return {
            decodedData: JSON.parse(decodedData),
            userEmail: userEmail
        }
    }

    window.location.href = "../login.html"
    return null
}

const clientData = urlData().decodedData
const userEmail = urlData().userEmail
// const logout = document.getElementById("logout")
// logout.addEventListener("click", () => window.location.href = "../login.html")

if (clientData) {
    // Reference to the table body
    const tableBody = document.querySelector("#userTable tbody")
    const title = document.getElementById("title")
    const loggedInUserData = clientData.find((user) => user.email === userEmail)
    title.textContent =`Welcome ${loggedInUserData.last_name} ${loggedInUserData.first_name}`
    // Iterate through the client data and create table rows
    clientData.forEach((userData, index) => {
        // Create a new row
        const newRow = tableBody.insertRow()

        // Create cells and populate them
        const emailCell = newRow.insertCell(0)
        const firstNameCell = newRow.insertCell(1)
        const lastNameCell = newRow.insertCell(2)
        const phoneCell = newRow.insertCell(3)
        const editCell = newRow.insertCell(4)

        emailCell.textContent = userData.email
        firstNameCell.textContent = userData.first_name
        lastNameCell.textContent = userData.last_name
        phoneCell.textContent = userData.phone
        const editButton = document.createElement("a")
        editButton.setAttribute("href", "#")
        editButton.textContent = "Edit"
        editButton.onclick = () => editFunction(index) // Add your edit function here
        editCell.appendChild(editButton)
        // Append the row to the table body
        tableBody.appendChild(newRow)
    })
} else {
    console.error("Client data not found.")
}
const editFunction = (index) => {
    alert(`Edit Data for index ${index}`)
}