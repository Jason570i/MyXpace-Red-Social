import { URLPosts, createData } from "./api/api.js";

//variables
const dataUSer = JSON.parse(localStorage.getItem("user"));
//selectors
const formPost = document.querySelector("#formPost");
const textAreaPostInput = document.querySelector("#textArea");
const imagePostInput = document.querySelector("#image");
const userNameHeader = document.querySelector(".userHeader h2");
const userImgHeader = document.querySelector(".userHeader img");

//events
document.addEventListener("DOMContentLoaded", () => {
    if (dataUSer) {
        userNameHeader.textContent = `User: ${dataUSer[0].name}`;
        userImgHeader.src = dataUSer[0].image;
    }
});

formPost.addEventListener("submit",(e)=>{
    e.preventDefault();
    if (imagePostInput.value || textAreaPostInput.value) {
        createData(URLPosts)
    }else{
        console.log("add an image or a text");
    }
})
