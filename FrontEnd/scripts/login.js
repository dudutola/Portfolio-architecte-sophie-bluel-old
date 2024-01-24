
// Initialize form
// export async function generateLogin() {
//   const sectionContact = document.createElement("section");
//   sectionContact.id = "contact";

//   const titleLogin = document.createElement("h2");
//   titleLogin.textContent = "Log In";
//   // Remove the elements inside the gallery
//   form.innerHTML = "";

//   // Create form element
//   const form = document.createElement("form");
//   form.id = "form";
//   form.action = "http://localhost:5678/api/users/login";
//   form.method = "post";

//   // Create input for email
//   const emailLabel = document.createElement("label");
//   emailLabel.textContent = "Email";
//   const emailInput = document.createElement("input");
//   emailInput.type = "email";
//   emailInput.name = "email";
//   emailInput.id = "email";
//   emailInput.required = true;

//   // Create input for password
//   const passwordLabel = document.createElement("label");
//   passwordLabel.textContent = "Mot de passe";
//   const passwordInput = document.createElement("input");
//   passwordInput.type = "password";
//   passwordInput.name = "password";
//   passwordInput.id = "password";
//   passwordInput.required = true;

//   // Create submit button
//   const submitButton = document.createElement("input");
//   submitButton.type = "submit";
//   submitButton.value = "Se connecter";
//   submitButton.id = "submit";

//   // Append elements to the form
//   form.appendChild(emailLabel);
//   form.appendChild(emailInput);
//   form.appendChild(passwordLabel);
//   form.appendChild(passwordInput);
//   form.appendChild(submitButton);
// }


const url = "http://localhost:5678/api/users/login";
const form = document.getElementById("form");


function loginAuthentication() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // let formData = new FormData(form);

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let formData = JSON.stringify({ email: email, password: password })

    console.log(formData);

    const requestInfos = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: formData
    }

    fetch(url, requestInfos)
    .then(response => response.json())
    .then((data) => {

      console.log(data);

      if (data.hasOwnProperty("userId") && data.hasOwnProperty("token")) {
        window.location = "/FrontEnd";
      } else {
        console.log('no')

        const emailMessage = document.getElementById("wrongEmail");
        const passwordMessage = document.getElementById("wrongPassword");

        emailMessage.innerText = "E-mail incorect";
        passwordMessage.innerText = "Mot de passe incorect";

        emailMessage.style.color = "red";
        passwordMessage.style.color = "red";
      }
    });
  });
}

loginAuthentication()
