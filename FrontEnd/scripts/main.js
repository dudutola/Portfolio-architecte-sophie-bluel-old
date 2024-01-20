import { generateWorks } from "./works.js";

// Retrieve data from the backend
const apiWorks = await fetch("http://localhost:5678/api/works");
const works = await apiWorks.json();
console.log(works)

generateWorks(works);

const filterButtons = document.querySelectorAll(".filterbar span");
filterButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    console.log(event)

    console.log(button);

    let filterTerm = button.textContent.trim();

    switch (filterTerm) {
      case "Objets":
        const worksObjets = works.filter((work) => work.category.name === "Objets");
        generateWorks(worksObjets)
        break;

      case "Appartements":
        const worksAppartements = works.filter((work) => work.category.name === "Appartements");
        generateWorks(worksAppartements)
        break;

      case "Hôtels & restaurants":
        const worksHotelsResto = works.filter((work) => work.category.name === "Hotels & restaurants");
        generateWorks(worksHotelsResto)
        break;

      default:
        generateWorks(works)
        break;
    }
  });
})
