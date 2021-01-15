const loginBtn = document.querySelector("#loginForm");
const registerBtn = document.querySelector("#registerForm");
const adress = "http://localhost:3000";
const response = document.querySelector("#response");

loginBtn.addEventListener("click", async () => {
  const formValues = {
    nickname: document.querySelector("#loginNickname").value,
    password: document.querySelector("#loginPassword").value,
  };
  console.log(formValues);
  const res = await fetch(`${adress}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  })
    .then((data) => data.json())
    // .catch(e => "Something goes wrong, please try again.")
    .catch((e) => console.error("Error: " + e));

  if(!!res.errors){
    response.innerText = 
    `Enter correct nickname and password. Password must contain small and big letter, digit and minimum one special character. Available characters: ! @ # $ % ^ & * ( )`;
  }

  if (!!res.token) {
    response.innerText = res.msg;
  }

  if(!res.token){
    response.innerText = "Something goes wrong try again";
  }
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
  })
    .then((data) => data.json())
    .then((data) => data.msg)
    // .catch(e => "Something goes wrong, please try again.")
    .catch((e) => console.error("error: " + e));

  response.innerText = res;
});
