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
let currentPostId = null; 

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

sharePost.addEventListener("click", () => {
    let postContentValue = postContent.value.trim();
    if (!postContentValue) return;

    let newPost = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        text: postContentValue,
        comments: []
    };

    posts.unshift(newPost);
    savePosts();
    renderPosts();
    postContent.value = "";
});

function renderPosts() {
    postsList.innerHTML = "";

    posts.forEach(post => {
        postsList.innerHTML += `
        <div style="margin-bottom: 30px;">
            <div style="margin-bottom: 40px; font-size: 23px;">
                <img style="border-radius:50%; width:41px; margin-right:11px;" src="${userData.profileImage}" alt='Profile Picture'>
                ${userData.lastName} ${userData.firstName}
            </div>
            <div>
                <p>${post.text}</p>
            </div>
            <div>
                <i class="fas fa-heart heart-icon" style="color:gray; cursor: pointer;"></i>
                <i class="fas fa-comment comment-icon" 
                   data-bs-toggle="modal" 
                   data-bs-target="#staticBackdrop" 
                   data-id="${post.id}" 
                   style="color:gray; cursor: pointer; margin-left: 20px;"></i>
            </div>
            <div class="mt-2">
                ${post.comments.map(c => `<p style="margin:0; font-size:14px; color:#555;">💬 ${c}</p>`).join("")}
            </div>
        </div>
        `;
    });

    // heart click
    document.querySelectorAll(".heart-icon").forEach(icon => {
        icon.addEventListener("click", () => {
            icon.style.color = (icon.style.color === "gray") ? "red" : "gray";
        });
    });

    // comment icon click
    document.querySelectorAll(".comment-icon").forEach(icon => {
        icon.addEventListener("click", () => {
            currentPostId = icon.getAttribute("data-id");
            commentInput.value = "";
        });
    });
}

renderPosts();

// comment share
let commentInput = document.querySelector("#commentInput")
let commentShare = document.querySelector("#commentShare")

commentShare.addEventListener("click", () => {
    let commentText = commentInput.value.trim();
    if (!commentText || !currentPostId) return;

    let post = posts.find(p => p.id == currentPostId);
    if (post) {
        post.comments.push(commentText);
        savePosts();
        renderPosts();
        commentInput.value = "";
    }
});