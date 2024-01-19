import { generateWorks } from "./works.js";

// Retrieve data from the backend
const apiWorks = await fetch("http://localhost:5678/api/works");
const works = await apiWorks.json();
console.log(works)

generateWorks(works);
