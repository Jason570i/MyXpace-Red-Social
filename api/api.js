export const URLUsers = "http://localhost:3000/users";
export const URLPosts = "http://localhost:3000/posts";
export const URLFriends = "http://localhost:3000/friends";

export async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createData(URL, data) {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const dataSaved = await response.json();
    return dataSaved;
  } catch (error) {
    console.log(error);
  }
}

export async function updateData(URL,id, data) {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const dataSaved = await response.json();
    return dataSaved;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteData(URL, id) {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE"
    });
    const dataSaved = await response.json();
    return dataSaved;
  } catch (error) {
    console.log(error);
  }
}