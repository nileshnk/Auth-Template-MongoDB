const loginRedirectBtn = document.getElementById("loginRedirectBtn");
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const dataObj = Object.fromEntries(formData.entries());
  const send = await fetch("/login", {
    method: "POST",
    body: JSON.stringify(dataObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await send.json();
  console.log(response);
  if (response.status == true) {
    loginRedirectBtn.hidden = false;
  }
});

loginRedirectBtn.addEventListener("click", () => {
  window.location.assign("/");
});
