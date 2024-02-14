// Select main
const main = document.querySelector("main");

// Create contact section
function generateConnection() {
  const loginBold = document.querySelector("li:nth-child(3)")
  loginBold.style.fontWeight = "bold";
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
    <input type="submit" value="Se connecter" id="submit-connection">
    <a href="">Mot de passe oublié</a>`;

  // Append elements to the main
  contactSection.appendChild(login);
  contactSection.appendChild(form);
  main.appendChild(contactSection);
}
generateConnection();


const url = "http://localhost:5678/api/users/login";
const form = document.getElementById("form");

function loginAuthentication() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

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
        window.localStorage.setItem("userData", JSON.stringify(data));
        // Redirection
        window.location = "./index.html";

      } else {
        const emailMessage = document.getElementById("wrongEmail");
        const passwordMessage = document.getElementById("wrongPassword");

        emailMessage.innerText = "E-mail incorrect";
        passwordMessage.innerText = "Mot de passe incorrect";

        emailMessage.style.color = "red";
        emailMessage.style.margin = "4px";
        passwordMessage.style.color = "red";
        passwordMessage.style.margin = "4px";
      }
    });
  });
}

loginAuthentication()
