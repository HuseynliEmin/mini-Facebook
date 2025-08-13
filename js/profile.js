let currentUser = JSON.parse(localStorage.getItem("currentUser"));

let userFullName = document.querySelector("#userFullName")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let profileImage = document.querySelector("#profileImage");
let uploadImage = document.querySelector("#uploadImage");

userFullName.innerHTML = `${currentUser.lastName} ${currentUser.firstName}`
email.innerHTML = currentUser.email
password.innerHTML = currentUser.password


if (currentUser.profileImage) {
    profileImage.src = currentUser.profileImage;
    uploadImage.remove()
}

// image add

uploadImage.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = e.target.result;
            profileImage.src = imageData;

            currentUser.profileImage = imageData;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            let users = JSON.parse(localStorage.getItem("users")) || [];
            users = users.map(user =>
                user.email === currentUser.email ? { ...user, profileImage: imageData } : user
            );
            localStorage.setItem("users", JSON.stringify(users));
        };
        reader.readAsDataURL(file);
    }
});

// modal open and close

let passwordChange = document.querySelector("#passwordChange")
let passwordModal = document.querySelector("#passwordModal");
let closeModal = document.querySelector("#closeModal");
let savePassword = document.querySelector("#savePassword");
let newPassword = document.querySelector("#newPassword");

passwordChange.addEventListener("click", () => {
    passwordModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
    passwordModal.style.display = "none";
});
window.addEventListener("click", (e) => {
    if (e.target === passwordModal) {
        passwordModal.style.display = "none";
    }
});

//password change

savePassword.addEventListener("click", () => {
    const inputValue = newPassword.value.trim()

    if (inputValue.length < 8) {
        alert("Password must be at least 8 characters.");
        return;
    }
    currentUser.password = inputValue
    localStorage.setItem("currentUser", JSON.stringify(currentUser))

    let users = JSON.parse(localStorage.getItem("users")) || []
    users = users.map(user => user.email === currentUser.email ? { ...user, password: inputValue } : user)
    localStorage.setItem("users", JSON.stringify(users))

    password.innerHTML = inputValue
    passwordModal.style.display = "none"
    newPassword.value = ""

    alert("Password changed successfully!");

})