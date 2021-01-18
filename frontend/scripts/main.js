const loginBtn = document.querySelector("#loginForm");
const registerBtn = document.querySelector("#registerForm");
const adress = "http://localhost:3000";
const response = document.querySelector("#response");

loginBtn.addEventListener("click", async () => {
  const formValues = {
    nickname: document.querySelector("#loginNickname").value,
    password: document.querySelector("#loginPassword").value,
  };

  const res = await fetch(`${adress}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
  
  console.log(res);
});

registerBtn.addEventListener("click", async () => {
  const formValues = {
    nickname: document.querySelector("#registerNickname").value,
    password: document.querySelector("#registerPassword").value,
  };

  const res = await fetch(`${adress}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });

  console.log(res);
});
