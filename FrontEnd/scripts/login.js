// Select main
const main = document.querySelector("main");

// Create contact section
function generateContact() {
  // Create intro elements
  const contactSection = document.createElement("section");
  contactSection.id = "contact";
  const login = document.createElement("h2");
  login.innerText = "Log In";

  // Create form element
  const form = document.createElement("form");
  form.action = "http://localhost:5678/api/users/login";
  form.method = "post";
  form.id = "form";
  form.innerHTML = `
    <label for="email">E-mail</label>
    <input type="email" name="email" id="email" required>
    <p id="wrongEmail"></p>
    <label for="message">Mot de passe</label>
    <input type="password" name="password" id="password" required>
    <p id="wrongPassword"></p>
    <input type="submit" value="Se connecter" id="submit">`;

  const passwordForgot = document.createElement("a");
  passwordForgot.href = "";
  passwordForgot.innerText = "Mot de passe oublié";

  // Append elements to the main
  contactSection.appendChild(login);
  contactSection.appendChild(form);
  main.appendChild(contactSection);
}
generateContact();


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
        // Retrieval of stored elements from localStorage
        window.localStorage.setItem("portfolio", JSON.stringify(data));
        // Redirection
        window.location = "/FrontEnd";

      } else {
        const emailMessage = document.getElementById("wrongEmail");
        const passwordMessage = document.getElementById("wrongPassword");

        emailMessage.innerText = "E-mail incorrect";
        passwordMessage.innerText = "Mot de passe incorrect";

        emailMessage.style.color = "red";
        passwordMessage.style.color = "red";
      }
    });
  });
}

loginAuthentication()
