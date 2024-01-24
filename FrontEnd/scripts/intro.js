// Select main
const main = document.querySelector("main");

// Create introduction section
export function generateIntroduction() {
  // Create intro elements
  const introSection = document.createElement("section");
  introSection.id = "introduction";
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = "./assets/images/sophie-bluel.png";
  img.alt = "Photo de Sophie Bluel";

  let article = document.createElement("article");
  article.innerHTML = `
    <h2>Designer d'espace</h2>
    <p>Je raconte votre histoire, je valorise vos idées. Je vous accompagne de la conception à la livraison finale du chantier.</p>
    <p>Chaque projet sera étudié en commun, de façon à mettre en valeur les volumes, les matières et les couleurs dans le respect de l’esprit des lieux et le choix adapté des matériaux. Le suivi du chantier sera assuré dans le souci du détail, le respect du planning et du budget.</p>
    <p>En cas de besoin, une équipe pluridisciplinaire peut-être constituée : architecte DPLG, décorateur(trice)</p>`;

  // Append elements to the main
  figure.appendChild(img);
  introSection.appendChild(figure);
  introSection.appendChild(article);
  main.appendChild(introSection);
}
