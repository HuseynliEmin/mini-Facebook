//logout 

let logoutBtn = document.querySelector("#logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
        window.location.href = "../index.html";  
    });
}

if (window.location.pathname.includes("/pages/") && !localStorage.getItem("isLoggedIn")) {
    window.location.href = "../index.html";
}