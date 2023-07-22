import { register, signin } from "./api.js";
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const signUpForm = document.getElementById('sign-up-form');
const signInForm = document.getElementById("sign-in-form");
const container = document.querySelector(".container");

function showalert(text) {
    var toast = document.getElementById("errorToast");
    toast.innerText = text
    toast.classList.add("show");
    setTimeout(function() {
      toast.classList.remove("show");
    }, 4000); // 4 seconds
  }

sign_up_btn.addEventListener('click', async () =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', async () =>{
    container.classList.remove("sign-up-mode");
});


signUpForm.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const data = await register({
        name: document.getElementById('signupname').value,
        email: document.getElementById('signupemail').value,
        password: document.getElementById('signuppassword').value,
    });
    if (data.error) {
        showalert(data.error.message)
    } else {
        const userUrl = `${window.location.origin}/`;
        window.location.replace(userUrl);
    }
});

signInForm.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const data = await signin({
        email: document.getElementById("signinemail").value,
        password: document.getElementById("signinpassword").value
    });
    if (data.error) {
        showalert(data.error.message)
    } else {
        const userUrl = `${window.location.origin}/welcome.html`;
        window.location.replace(userUrl);
    }
});