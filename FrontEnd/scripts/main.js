import { generateIntroduction } from "./intro.js";
import { generatePortfolio, generateGallery } from "./portfolio.js";
import { generateContact } from "./contact.js";

// Retrieve data from the backend
const apiWorks = await fetch("http://localhost:5678/api/works");
const works = await apiWorks.json();

export function generateMainPages() {
  generateIntroduction();
  generatePortfolio();
  generateGallery(works);
  generateContact();
}

generateMainPages();
