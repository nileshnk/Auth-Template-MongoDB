const logout = document.getElementById("logout");

logout.addEventListener("click", async (e) => {
  const request = await fetch("/logout", {
    method: "POST",
  });
  console.log(await request.json());
});
