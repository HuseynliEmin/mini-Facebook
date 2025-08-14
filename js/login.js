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

//name and profile icon

let navBar = document.querySelector(".navbar-nav");
let userData = JSON.parse(localStorage.getItem("currentUser"));

if (userData) {
    let nameLi = document.createElement("li");
    nameLi.innerHTML = `<div style="color:white; margin-top:9px">${userData.firstName} ${userData.lastName}</div>`;

    let imgLi = document.createElement("li");
    let profileImageSrc = userData.profileImage || "default.jpg";
    imgLi.innerHTML = `<img id='profileImage' style="border-radius:50%; width:41px; margin-right:11px;" src="${profileImageSrc}" alt='Profile Picture'>`;

    navBar.prepend(nameLi);
    navBar.insertBefore(imgLi, nameLi.nextSibling);
}

// share post 

let postContent = document.querySelector("#postContent")
let postsList = document.querySelector("#postsList")
let sharePost = document.querySelector("#sharePost")

let posts = JSON.parse(localStorage.getItem("posts")) || [];
console.log(posts);


sharePost.addEventListener("click", () => {
    let postContentValue = postContent.value.trim();

    posts.unshift(postContentValue)
    localStorage.setItem("posts", JSON.stringify(posts))
    console.log(JSON.parse(localStorage.getItem("posts")));
    renderPosts()

})

function renderPosts() {
    posts.forEach(post => {
        postsList.innerHTML += `<div style="margin-bottom: 30px;">
         <div style="margin-bottom: 40px; font-size: 23px;">
         <img id='profileImage' style="border-radius:50%; width:41px; margin-right:11px;" src="${userData.profileImage}" alt='Profile Picture'>
           ${userData.lastName} ${userData.firstName}
        </div>
        <div>
            <p>${post}</p>
        </div>
        <div>
            <i id="heart" style="color:gray ;cursor: pointer;" class="fas fa-heart"></i>
            <i id="comment" style="color:gray; cursor: pointer; margin-left: 20px;" class="fas fa-comment"></i>
        </div>
        </div>
        `
    });
}
renderPosts()

//liked icon

let heart = document.querySelector("#heart")

heart.addEventListener("click", () => {
    if (heart.style.color == "gray") {
        heart.style.color = "red"
    }
    else {
        heart.style.color = " gray"
    }
})

 