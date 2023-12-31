const heading = document.querySelector(".head");
const username = localStorage.getItem("username");
heading.innerText = `Welcome ${username}`;
