const usernameInput = document.querySelector(".username");
const passwordInput = document.querySelector(".password");
const signupBtn = document.querySelector(".signup-btn");
const alertPopUp = document.querySelector(".alert");
alertPopUp.style.display = "none";

signupBtn.addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput.value.trim(),
        password: passwordInput.value.trim(),
      }),
    });
    usernameInput.value = "";
    passwordInput.value = "";
    const data = await response.json();
    console.log(response.status);
    alertPopUp.style.display = "";
    if (response.status == 200) {
      alertPopUp.setAttribute("class", "alert alert-success");
      alertPopUp.innerText = data.message;
    } else {
      alertPopUp.setAttribute("class", "alert alert-danger");
      alertPopUp.innerText = data.message;
    }
    setTimeout(() => {
      alertPopUp.style.display = "none";
    }, 2000);
  } catch (err) {
    console.log(err);
  }
});
