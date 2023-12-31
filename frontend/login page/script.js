const usernameInput = document.querySelector(".username");
const passwordInput = document.querySelector(".password");
const submitBtn = document.querySelector(".submit-btn");
const alertPopUp = document.querySelector(".alert");
alertPopUp.style.display = "none";

submitBtn.addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput.value.trim(),
        password: passwordInput.value.trim(),
      }),
    });
    const data = await response.json();

    alertPopUp.style.display = "";
    if (response.status == 200) {
      alertPopUp.setAttribute("class", "alert alert-success");
      alertPopUp.innerText = data.message;
      localStorage.setItem("username", usernameInput.value.trim());
      window.location.href =
        "http://127.0.0.1:5500/frontend/Welcome%20Page/index.html";
    } else {
      alertPopUp.setAttribute("class", "alert alert-danger");
      alertPopUp.innerText = data.message;
    }
    usernameInput.value = "";
    passwordInput.value = "";
    setTimeout(() => {
      alertPopUp.style.display = "none";
    }, 2000);
  } catch (err) {
    console.log(err);
  }
});
