const loginBtn = document.querySelector("#loginForm");
const registerBtn = document.querySelector("#registerForm");
const adress = "http://localhost:3000";
const response = document.querySelector("#response");

loginBtn.addEventListener("click", async () => {
  const formValues = {
    nickname: String(document.querySelector("#loginNickname").value),
    password: String(document.querySelector("#loginPassword").value),
  };
  try {
    const res = await fetch(`${adress}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    switch (res.status) {
      case 200:
        const data = await res.json();
        response.innerText = data.msg;

        window.location.replace("/dashboard");
        break;
      case 422:
        const datav = await res.json();
        response.innerText = `Invalid value in ${datav.errors[0].param}.`;
        break;
      case 401:
        response.innerText = "Wrong nickname or password.";
        break;
      case 500:
        const datap = await res.json();
        response.innerText = datap.msg;
        break;
      default:
        response.innerText = "Something goes wrong. Please try later.";
        break;
    }
  } catch (err) {
    response.innerText = "Something goes wrong. Please try again later.";
  }
});

registerBtn.addEventListener("click", async () => {
  const formValues = {
    nickname: String(document.querySelector("#registerNickname").value),
    password: String(document.querySelector("#registerPassword").value),
  };
  try {
    const res = await fetch(`${adress}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    switch (res.status) {
      case 201:
        const datat = await res.json();
        response.innerText = data.msg;
        break;
      case 422:
        const datav = await res.json();
        response.innerText = `Invalid value in ${datav.errors[0].param}.`;
        break;
      case 400:
        const dataf = await res.json();
        response.innerText = dataf.msg;
        break;
      case 500:
        const datap = await res.json();
        response.innerText = datap.msg;
        break;
      default:
        response.innerText = "Something goes wrong. Please try later.";
        break;
    }
  } catch (err) {
    response.innerText = "Something goes wrong. Please try again later.";
  }
});
