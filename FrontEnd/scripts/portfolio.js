// Select main
const main = document.querySelector("main");

// Initialize gallery
const gallery = document.createElement("div");
gallery.className = "gallery";

//Create portfolio section
const portfolioSection = document.createElement("section");
portfolioSection.id = "portfolio";

function generateGallery(works) {
  // Remove the elements inside the gallery
  gallery.innerHTML = "";

  // Remove the empty message
  const emptyMessage = document.querySelector(".filter-empty");
  if (emptyMessage) { emptyMessage.remove()};

  // when filter is empty
  if (works.length < 1) {
    const emptyGallery = document.createElement("p");
    emptyGallery.innerText = "La galerie est vide pour le moment.";
    emptyGallery.className = "filter-empty";
    gallery.insertAdjacentElement("beforebegin", emptyGallery);
  } else {
    for (let i = 0; i < works.length; i++) {
      // Create the elements
      let figure = document.createElement("figure");
      figure.id = `works-${works[i].id}`;
      let img = document.createElement("img");
      img.src = works[i].imageUrl;
      let figcaption = document.createElement("figcaption");
      figcaption.innerHTML = works[i].title;

      // Add the elements to the gallery
      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
      portfolioSection.appendChild(gallery);
    }
  }
}

export function generatePortfolio(works) {
  // Create portfolio elements
  const mesProjets = document.createElement("h2");
  mesProjets.innerText = "Mes projets";
  mesProjets.id = "projets";

  const filterBar = document.createElement("div");
  filterBar.className = "filterbar";
  filterBar.innerHTML = `
    <span>Tous</span>
    <span>Objets</span>
    <span>Appartements</span>
    <span>Hôtels & restaurants</span>`;

  // Append elements to the main
  portfolioSection.appendChild(mesProjets);
  portfolioSection.appendChild(filterBar);
  main.appendChild(portfolioSection);

  generateGallery(works);

  const filterButtons = document.querySelectorAll(".filterbar span");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      let filterTerm = button.textContent.trim();

      switch (filterTerm) {
        case "Objets":
          const worksObjets = works.filter((work) => work.category.name === "Objets");
          generateGallery(worksObjets);
          break;

        case "Appartements":
          const worksAppartements = works.filter((work) => work.category.name === "Appartements");
          generateGallery(worksAppartements);
          break;

        case "Hôtels & restaurants":
          const worksHotelsResto = works.filter((work) => work.category.name === "Hotels & restaurants");
          generateGallery(worksHotelsResto);
          break;

        default:
          generateGallery(works);
          break;
      }
    });
  })
}
