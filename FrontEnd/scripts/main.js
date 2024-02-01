import { generateIntroduction } from "./intro.js";
import { generatePortfolio, generateGallery } from "./portfolio.js";
import { generateContact } from "./contact.js";
import { generateModal } from "./modal.js";

// Retrieve data from the backend
const apiWorks = await fetch("http://localhost:5678/api/works");
const works = await apiWorks.json();

// Call the functions
generateIntroduction();
generatePortfolio();
generateGallery(works);
generateContact();

// Declare function users view
function verifyIfUserLogin() {
  let userLoginInfos = window.localStorage.getItem("portfolio");
  console.log(userLoginInfos)

  if (userLoginInfos) {
    const marginHeader = document.querySelector("header");
    marginHeader.style.margin = "100px 0 50px";

    // Create mode édition
    const edition = document.createElement("div");
    edition.className = "mode edition";
    edition.innerHTML = `
      <i class="fa-regular fa-pen-to-square"></i>
      <p>Mode édition</p>`;
    const body = document.querySelector("body");
    body.insertAdjacentElement("afterbegin", edition)

    // Create li logout
    const logout = document.createElement("li");
    logout.innerText = "logout";
    logout.className = "logout";

    const ul = document.querySelector("nav ul")
    const listItems = ul.getElementsByTagName("li");
    console.log(listItems)
    const logoutLi = listItems[listItems.length - 1];
    logoutLi.insertAdjacentElement("beforebegin", logout);

    // Not display login
    const loginLi = ul.querySelector("li:nth-child(3)");
    loginLi.style.display = "none";

    // Create modifier
    const mode = document.createElement("div");
    mode.className = "mode";
    mode.innerHTML = `
      <h2>Mes projets</h2>
      <div class="modify">
        <i class="fa-regular fa-pen-to-square"></i>
        <p>modifier</p>
      </div>`;

    const mesProjets = document.getElementById("projets");
    mesProjets.style.display = "none";

    const sectionPortfolio = document.getElementById("portfolio")
    sectionPortfolio.insertAdjacentElement("beforebegin", mode);

    // Not display filterBar
    const filterBar = document.querySelector(".filterbar");
    filterBar.style.display = "none";

    const modifyButton = document.querySelector(".modify");
    modifyButton.addEventListener("click", (e) => {
      // displayModal(modal);
      generateModal(works);
    });
  }
}
// execute function
verifyIfUserLogin()


const logout = document.querySelector(".logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  window.localStorage.removeItem("portfolio");

  location.reload();
})
