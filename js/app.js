//modal close and open

const createBtn = document.getElementById("createAccountBtn");
const modal = document.getElementById("registerModal");
const closeBtn = document.getElementById("closeModal");

createBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

//register

let user = JSON.parse(localStorage.getItem("users")) || []

document.querySelector("#registerForm").addEventListener("submit", (e) => {
    e.preventDefault()

    let firstName = document.querySelector("#firstName").value
    let lastName = document.querySelector("#lastName").value
    let email = document.querySelector("#email").value
    let password = document.querySelector("#password").value


    if (firstName.length < 3) {
        alert("First name must be at least 3 characters.");
        return;
    }

    if (lastName.length < 3) {
        alert("Last name must be at least 3 characters.");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters.");
        return;
    }

    let newUser = {
        firstName,
        lastName,
        email,
        password
    };

     user.push(newUser)
    localStorage.setItem("users", JSON.stringify(user))

   
    console.log(newUser);
    alert("Registration completed successfully.")
    modal.style.display = "none";
})
console.log(user);


//sign in control

document.querySelector("#formLogin").addEventListener("submit", (e) => {
    e.preventDefault()
    let email = document.querySelector("#loginEmail").value.trim()
    let password = document.querySelector("#loginPassword").value.trim()

    let users = JSON.parse(localStorage.getItem("users")) || []

    let foundUser = users.find(user => user.email === email && user.password === password)

    if (foundUser) {
        window.location.href ="pages/test.html"
    }else{
        alert("The email or password is incorrect or such user does not exist!")
    }

})
