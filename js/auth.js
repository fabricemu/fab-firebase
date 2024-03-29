let message = document.getElementById("error");
const fnameInput = document.getElementById("f_name");
const lnameInput = document.getElementById("l_name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("psw");
const password2Input = document.getElementById("psw2");
const error_div = document.getElementById("backend_error");
const hide = () => {
    message.textContent = "";
    password2Input.style.border = "none";
    error_div.style.display = "none";

}
const error_hide = () => {
    error_div.style.display = "none";
}


const register = () => {
    const first_name = fnameInput.value;
    const last_name = lnameInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const password2 = password2Input.value;
    if (password === password2) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                db.collection("Clients").doc().set({email, first_name, last_name, phone})
                    .then((response) => {
                        alert("User Created Successfully")
                        console.log(response)

                    })
                    .catch((error) => {
                        console.log(error)
                    })

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                error_div.style.display = "block";
                error_div.innerHTML = `<b>${errorCode}: </b>${errorMessage}`
                // ..
            });
    } else {
        message.textContent = "Passwords do not match";
        message.style.color = "red";
        password2Input.style.border = "1px solid red";
    }

}

const login = () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userlogin) => {
            // Fetch client data using the email
            fetchClientData(email)
                .then((clientData) => {
                    // Pass client data to the list_users.html page
                    const encodedData = encodeURIComponent(JSON.stringify(clientData));
                    window.location.href = `pages/list_users.html?email=${userlogin.user.email}&clientData=${encodedData}`;
                })
                .catch((fetchError) => {
                    console.error("Error fetching client data:", fetchError);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            error_div.style.display = "block";
            error_div.innerHTML = `<b>Invalid username or password </b><br>`
        })
    const fetchClientData = async (email) => {
        try {
            // Assuming your Firestore collection is named "Client"
            const querySnapshot = await db.collection("Clients").get();
            const clientData = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                clientData.push(data);
            });

            return clientData;
        } catch (error) {
            throw error;
        }
    };
}
const reset_password = (() => {
    const email = emailInput.value;

    // Call the sendPasswordResetEmail method to send a password reset email
    auth.sendPasswordResetEmail(email)
        .then(() => {
            alert("Password reset email sent. Please check your email.");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            error_div.style.display = "block";
            error_div.innerHTML = `<b>${errorCode}: </b>${errorMessage}`
            console.error(errorCode, errorMessage);
            // Handle any errors related to password reset
        });
});
const logout = () => {
    localStorage.clear();
    window.location.href = "../login.html";
};