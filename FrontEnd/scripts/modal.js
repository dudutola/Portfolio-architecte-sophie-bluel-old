// Function to display the modal
function displayModal() {
  modal.classList.remove("hidden");
  console.log(modal);
  backdrop.classList.remove("hidden");
}
// Function to close the modal
function closeModal() {
  modal.classList.add("hidden");
  backdrop.classList.add("hidden");
  console.log(backdrop);
}

// Function to generate the modal
export function generateModal(items) {
  // Create modal elements
  const backdrop = document.createElement("div");
  backdrop.id = "backdrop";
  backdrop.className = "hidden";
  const modal = document.createElement("section");
  modal.id = "modal";
  modal.className = "hidden";
  const closeButton = document.createElement("i");
  closeButton.className = "fa-solid fa-xmark";

  const modalContent = document.createElement("div");
  modalContent.id = "modal-content";
  modalContent.innerHTML = `
    <h2>Galerie photo</h2>
    <button class="btn">Ajouter une photo</button>`;

  const modalImages = document.createElement("div");
  modalImages.className = "modal-images";

  // Append
  modal.appendChild(closeButton);
  modal.appendChild(modalContent);

  const body = document.querySelector("body");
  body.insertAdjacentElement("afterbegin", modal);
  body.insertAdjacentElement("afterbegin", backdrop);

  for (let i = 0; i < items.length; i++) {
    // Create the elements
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    img.src = items[i].imageUrl;
    const deleteButton = document.createElement("i");
    deleteButton.className = "fa-solid fa-trash-can";
    // Append the elements
    figure.appendChild(img);
    figure.appendChild(deleteButton);
    modalImages.appendChild(figure);
    modalContent.appendChild(modalImages);
  }

  // Calling functions
  const backdropClose = document.getElementById("backdrop");

  const modifyButton = document.querySelector(".modify");
  modifyButton.addEventListener("click", (e) => {
    displayModal();
  });
  closeButton.addEventListener("click", (e) => {
    closeModal();
  });
  backdropClose.addEventListener("click", (e) => {
    closeModal();
  });
}
