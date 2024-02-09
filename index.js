import { URLPosts, createData, getData } from "./api/api.js";

//variables
const dataUser = JSON.parse(localStorage.getItem("user"));
//selectors
const newPostSection = document.querySelector(".newPost");
const formPost = document.querySelector("#formPost");
const textAreaPostInput = document.querySelector("#textArea");
const imagePostInput = document.querySelector("#image");
const userNameHeader = document.querySelector(".userHeader .loginButton");
const userImgHeader = document.querySelector(".userHeader img");
const userLogout = document.querySelector(".userHeader .logoutButton");
const postContainer = document.querySelector("#post-container");

//events
document.addEventListener("DOMContentLoaded", async () => {
  if (dataUser) {
    userNameHeader.textContent = `User: ${dataUser[0].name}`;
    userImgHeader.src = dataUser[0].image;
    userImgHeader.style.display = "block";
    userLogout.style.display = "block";
  } else {
    newPostSection.style.display = "none";
  }
  await renderPosts();
});

formPost.addEventListener("submit", (e) => {
  e.preventDefault();
  if (imagePostInput.value || textAreaPostInput.value) {
    const post = {
      content: textAreaPostInput.value,
      image: imagePostInput.value,
      userId: dataUser[0].id,
    };

    createData(URLPosts, post);
  } else {
    console.log("add an image or a text");
  }
});

userLogout.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/index.html";
});

//functions
async function renderPosts() {
  const data = await getData(`${URLPosts}?_embed=user`);
  console.log(data);
  data.forEach((post) => {
    const divPost = document.createElement("div");
    divPost.classList.add("post");
    postContainer.appendChild(divPost);

    const imgElement = document.createElement("img");
    imgElement.src = post.image;
    imgElement.alt = "image";
    divPost.appendChild(imgElement);

    const postContent = document.createElement("p");
    postContent.textContent = post.content;
    divPost.appendChild(postContent);

    const divAuthor = document.createElement("div");
    divPost.appendChild(divAuthor);

    const postAuthor = document.createElement("p");
    postAuthor.setAttribute("author-id", post.user.id);
    postAuthor.textContent = `Posted by: ${post.user.name}`;
    divAuthor.appendChild(postAuthor);

    if (dataUser) {
      if (dataUser[0].id === post.user.id) {
        const divButtons = document.createElement("div");
        divButtons.classList.add("postButtons");
        divPost.appendChild(divButtons);

        const buttonEdit = document.createElement("button");
        buttonEdit.textContent = "Edit Post";
        buttonEdit.classList.add("btn", "btn-edit");
        buttonEdit.setAttribute("post-id", post.id);
        divButtons.appendChild(buttonEdit);

        const buttonDelete = document.createElement("button");
        buttonDelete.textContent = "Delete Post";
        buttonDelete.classList.add("btn", "btn-delete");
        buttonDelete.setAttribute("post-id", post.id);
        divButtons.appendChild(buttonDelete);

        buttonEdit.addEventListener("click", () => {
          console.log("Editing");
        });

        buttonDelete.addEventListener("click", () => {
          console.log("Deleting");
        });
      }
    }
  });
}
