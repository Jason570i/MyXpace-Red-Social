import {
  URLFriends,
  URLUsers,
  createData,
  deleteData,
  getData,
  updateData,
} from "../api/api.js";

//variables
const dataUser = JSON.parse(localStorage.getItem("user"));
let timer;
let friends;

//selectors
const userNameHeader = document.querySelector(".userHeader .loginButton");
const userImgHeader = document.querySelector(".userHeader img");
const userLogout = document.querySelector(".userHeader .logoutButton");
const friendNameInput = document.querySelector("#friendName");
const addFriend = document.querySelector("#add-friend-list");
const friendList = document.querySelector("#friend-list");

//events
document.addEventListener("DOMContentLoaded", () => {
  if (dataUser) {
    userNameHeader.textContent = `User: ${dataUser[0].name}`;
    userImgHeader.src = dataUser[0].image;
    userImgHeader.style.display = "block";
    userLogout.style.display = "block";
    renderUsers();
    loadFriends();
    renderMyFriendList();
  } else {
    window.location.href = "/index.html";
  }
});

userLogout.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/index.html";
});

friendNameInput.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    const data = await getData(`${URLUsers}?name=${friendName.value}`);
    console.log(data);
  }, 500);
});

//functions
async function renderUsers() {
  const data = await getData(URLUsers);
  data.forEach((user) => {
    if (user.id !== dataUser[0].id) {
      const li = document.createElement("li");
      const pName = document.createElement("p");
      pName.textContent = user.name;
      li.appendChild(pName);

      const addButton = document.createElement("button");
      addButton.setAttribute("user-id", user.id);
      addButton.textContent = "Add Friend";
      li.appendChild(addButton);
      addFriend.appendChild(li);
      addButton.addEventListener("click", async () => {
        friends.userRequest.push({userId: user.id});
        if(friends.id){

           return await updateData(URLFriends,friends.id, friends);
        }

        await createData(URLFriends,friends);

      });
    }
  });
}

async function renderMyFriendList() {
  const data = await getData(URLFriends);
  data.forEach((user) => {
    const li = document.createElement("li");
    const pName = document.createElement("p");
    pName.textContent = user.name;
    li.appendChild(pName);

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("user-id", user.id);
    deleteButton.textContent = "Delete Friend";
    li.appendChild(deleteButton);
    friendList.appendChild(li);
    deleteButton.addEventListener("click", async () => {
      await deleteData(URLFriends, user.id);
    });
  });
}

async function loadFriends() {
  const data = await getData(`${URLFriends}?userId=${dataUser[0].id}`);
  if (data.length) {
    return (friends = data[0]);
  }
  friends = {
    userId: dataUser[0].id,
    userRequest: [],
    userReceived: [],
    userApproved: [],
  };
}
