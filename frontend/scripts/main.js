const loginBtn = document.querySelector("#loginForm");
const registerBtn = document.querySelector("#registerForm");
const adress = "http://localhost:3000";

loginBtn.addEventListener("click", () => {
  console.log("login");
  console.log("ass");
});
registerBtn.addEventListener("click", async () => {
  const data = await fetch(adress)
    // .then((res) => res.json())
    .then((data) => {
        console.log(data);
        return data;
    })
    .catch((e) => console.error("error: " + e));
  console.log(data);
});
