import { URLUsers, getData } from "../api/api.js";

//variables
const dataUser = JSON.parse(localStorage.getItem("user"));
let timer;

//selectors
const userNameHeader = document.querySelector(".userHeader .loginButton");
const userImgHeader = document.querySelector(".userHeader img");
const userLogout = document.querySelector(".userHeader .logoutButton");
const friendNameInput = document.querySelector("#friendName");
const addFriend = document.querySelector("#add-friend-list");

//events
document.addEventListener("DOMContentLoaded", () => {
  if (dataUser) {
    userNameHeader.textContent = `User: ${dataUser[0].name}`;
    userImgHeader.src = dataUser[0].image;
    userImgHeader.style.display = "block";
    userLogout.style.display = "block";
    renderUsers();
  } else {
    window.location.href = "/index.html";
  }
});

userLogout.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/index.html";
});

friendNameInput.addEventListener("input",()=>{
    clearTimeout(timer)
    timer = setTimeout(async () => {
        const data = await getData(`${URLUsers}?name=${friendName.value}`);
        console.log(data);
    }, 500);
})

//functions
async function renderUsers() {
    const data = await getData(URLUsers);
    data.forEach(user => {
        const li = document.createElement("li");
        const pName = document.createElement("p");
        pName.textContent = user.name;
        li.appendChild(pName);

        const addButton = document.createElement("button");
        addButton.setAttribute("user-id",user.id);
        addButton.textContent = "Add Friend"
        li.appendChild(addButton);
        addFriend.appendChild(li)
    });
}


