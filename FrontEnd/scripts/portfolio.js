// Retrieve data from the backend
const apiWorks = await fetch("http://localhost:5678/api/works");
const works = await apiWorks.json();

// Select main
const main = document.querySelector("main");

//Create portfolio section
const portfolioSection = document.createElement("section");
portfolioSection.id = "portfolio";

export function generatePortfolio() {
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


  const filterButtons = document.querySelectorAll(".filterbar span");
  filterButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      console.log(event)
      console.log(button);

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

// Initialize gallery
const gallery = document.createElement("div");
gallery.className = "gallery";

export async function generateGallery(items) {
  // Remove the elements inside the gallery
  gallery.innerHTML = "";

  for (let i = 0; i < items.length; i++) {
    // Create the elements
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    img.src = items[i].imageUrl;
    let figcaption = document.createElement("figcaption");
    figcaption.innerHTML = items[i].title;

    // Add the elements to the gallery
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
    portfolioSection.appendChild(gallery);
  }
}
