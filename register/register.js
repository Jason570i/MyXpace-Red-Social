import { URLUsers, createData, getData } from "../api/api.js";

//selectors
const formRegister = document.querySelector("#formRegister");
const imageInput = document.querySelector("#image");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

//events
formRegister.addEventListener("submit",async (e)=>{
e.preventDefault();

const invalidEmail = await getData(`${URLUsers}?email=${emailInput.value}`);

if (invalidEmail.length) {
    console.log("El email ya existe");
    return;
}

const user = {
    image: imageInput.value,
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
}

await createData(URLUsers,user);
})
