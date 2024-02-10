import { URLUsers, getData } from "../api/api.js";

//variables
const dataUser = JSON.parse(localStorage.getItem("user"));
let timer;

//selectors
const userNameHeader = document.querySelector(".userHeader .loginButton");
const userImgHeader = document.querySelector(".userHeader img");
const userLogout = document.querySelector(".userHeader .logoutButton");
const friendName = document.querySelector("#friendName");

document.addEventListener("DOMContentLoaded", () => {
  if (dataUser) {
    userNameHeader.textContent = `User: ${dataUser[0].name}`;
    userImgHeader.src = dataUser[0].image;
    userImgHeader.style.display = "block";
    userLogout.style.display = "block";
  } else {
    window.location.href = "/index.html";
  }
});

userLogout.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/index.html";
});

friendName.addEventListener("input",()=>{
    clearTimeout(timer)
    timer = setTimeout(async () => {
        const data = await getData(`${URLUsers}?name=${friendName.value}`);
        console.log(data);
    }, 500);
})



