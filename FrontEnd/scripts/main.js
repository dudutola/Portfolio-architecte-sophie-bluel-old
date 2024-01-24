import { generateWorks } from "./works.js";
// import { loginAuthentication } from "./login.js";

// Retrieve data from the backend
const apiWorks = await fetch("http://localhost:5678/api/works");
const works = await apiWorks.json();
console.log(works)

generateWorks(works);
// loginAuthentication();

const filterButtons = document.querySelectorAll(".filterbar span");
filterButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    console.log(event)

    console.log(button);

    let filterTerm = button.textContent.trim();

    switch (filterTerm) {
      case "Objets":
        const worksObjets = works.filter((work) => work.category.name === "Objets");
        generateWorks(worksObjets);
        break;

      case "Appartements":
        const worksAppartements = works.filter((work) => work.category.name === "Appartements");
        generateWorks(worksAppartements);
        break;

      case "Hôtels & restaurants":
        const worksHotelsResto = works.filter((work) => work.category.name === "Hotels & restaurants");
        generateWorks(worksHotelsResto);
        break;

      default:
        generateWorks(works);
        break;
    }
  });
})


// Initialize form
// export async function generateLogin() {
//   const sectionIntroduction = document.createElement("section");
//   sectionIntroduction.id = "introduction";

//   const figure = document.createElement("figure");
//   const img = document.createElement("img");
//   img.src = "./assets/images/sophie-bluel.png";
//   img.alt = "Photo de Sophie Bluel";

//   const article = document.createElement("article");
//   const title = document.createElement("h2");
//   title.innerText = "Designer d'espace";
//   const paragraph = document.createElement("p");
//   paragraph.innerText = "Je raconte votre histoire, je valorise vos idées. Je vous accompagne de la conception à la livraison finale du chantier.";
//   const paragraphSecond = document.createElement("p");
//   paragraphSecond.innerText = "Chaque projet sera étudié en commun, de façon à mettre en valeur les volumes, les matières et les couleurs dans le respect de l’esprit des lieux et le choix adapté des matériaux. Le suivi du chantier sera assuré dans le souci du détail, le respect du planning et du budget.";
//   const paragraphThird = document.createElement("p");
//   paragraphThird.innerText = "En cas de besoin, une équipe pluridisciplinaire peut-être constituée : architecte DPLG, décorateur(trice)";

//   // Append elements to the form
//   figure.appendChild(img);
//   article.appendChild(title);
//   article.appendChild(paragraph);
//   article.appendChild(paragraphSecond);
//   article.appendChild(paragraphThird);
//   sectionIntroduction.appendChild(figure);
//   sectionIntroduction.appendChild(article);


//   // Remove the elements inside the gallery
//   // form.innerHTML = "";

//   const sectionContact = document.createElement("section");
//   sectionContact.id = "contact";

//   const titleLogin = document.createElement("h2");
//   titleLogin.textContent = "Contact";
//   const paragraphContact = document.createElement("p");
//   paragraphContact.textContent = "Vous avez un projet ? Discutons-en !";
//   // Remove the elements inside the gallery
//   // form.innerHTML = "";

//   // Create form element
//   const form = document.createElement("form");
//   form.action = "#";
//   form.method = "post";

//   // Create input for name
//   const nomLabel = document.createElement("label");
//   nomLabel.textContent = "Nom";
//   const nomInput = document.createElement("input");
//   nomInput.type = "text";
//   nomInput.name = "name";
//   nomInput.id = "name";

//   // Create input for email
//   const emailLabel = document.createElement("label");
//   emailLabel.textContent = "Email";
//   const emailInput = document.createElement("input");
//   emailInput.type = "email";
//   emailInput.name = "email";
//   emailInput.id = "email";
//   emailInput.required = true;

//   // Create label for message
//   const messageLabel = document.createElement("label");
//   messageLabel.textContent = "Message";
//   // Create textarea for textarea
//   const textarea = document.createElement("textarea");
//   textarea.name = "message";
//   textarea.id = "message";
//   textarea.cols = "30";
//   textarea.rows = "10";

//   // Create submit button
//   const submitButton = document.createElement("input");
//   submitButton.type = "submit";
//   submitButton.value = "Envoyer";

//   // Append elements to the form
//   form.appendChild(nomLabel);
//   form.appendChild(nomInput);
//   form.appendChild(emailLabel);
//   form.appendChild(emailInput);
//   form.appendChild(messageLabel);
//   form.appendChild(textarea);
//   form.appendChild(submitButton);
//   sectionContact.appendChild(submitButton);
//   sectionContact.appendChild(titleLogin);
//   sectionContact.appendChild(paragraphContact);
//   sectionContact.appendChild(form);
// // }
