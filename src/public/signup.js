const signupForm = document.getElementById("signupForm");
const loginBtn = document.getElementById("loginRedirect");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signupForm);
  const dataObj = Object.fromEntries(formData.entries());
  const send = await fetch("/signup", {
    method: "POST",
    body: JSON.stringify(dataObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await send.json();
  console.log(response);
  if (response.status) {
    loginBtn.hidden = false;
  }
});

loginBtn.addEventListener("click", () => {
  window.location.assign("/login");
});
