// const apiWorks = await fetch("http://localhost:5678/api/works");
// const works = await apiWorks.json();

const gallery = document.querySelector(".gallery");
console.log(gallery);


// Initialize gallery
export async function generateWorks(items) {
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
  }
}
