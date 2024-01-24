// Select main
const main = document.querySelector("main");

// Create contact section
export function generateContact() {
  // Create intro elements
  const contactSection = document.createElement("section");
  contactSection.id = "contact";
  const contact = document.createElement("h2");
  contact.innerText = "Contact";
  const projets = document.createElement("p");
  projets.innerText = "Vous avez un projet ? Discutons-en !";

  // Create form element
  const form = document.createElement("form");
  form.action = "#";
  form.method = "post";
  form.innerHTML = `
    <label for="name">Nom</label>
    <input type="text" name="name" id="name">
    <label for="email">Email</label>
    <input type="email" name="email" id="email">
    <label for="message">Message</label>
    <textarea name="message" id="message" cols="30" rows="10"></textarea>
    <input type="submit" value="Envoyer">`;

  // Append elements to the main
  contactSection.appendChild(contact);
  contactSection.appendChild(projets);
  contactSection.appendChild(form);
  main.appendChild(contactSection);
}
