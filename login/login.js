import { URLUsers, getData } from "../api/api.js";

//selectors
const formLogin = document.querySelector("#formLogin");
const emailLogin = document.querySelector("#emailLogin");
const passwordLogin = document.querySelector("#passwordLogin");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
const validUser = await getData(`${URLUsers}?email=${emailLogin.value}`);
if (validUser.length) {
    if (validUser[0].password === passwordLogin.value) {
        localStorage.setItem("user",JSON.stringify(validUser));
        window.location.href = "/index.html"
    }
}
console.log("Email is not valid");
});
