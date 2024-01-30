//
// const token = JSON.parse(window.localStorage.getItem("portfolio")).token;
let token;
if (window.localStorage.getItem("portfolio")) {
  token = JSON.parse(window.localStorage.getItem("portfolio")).token;
}

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
  // const back = document.createElement("i");
  // back.className = "fa-solid fa-arrow-left hidden";

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

    deleteButton.addEventListener("click", (e) => {
      console.log(e);
      e.preventDefault();

      // Image id
      let id = items[i].id;
      console.log(id);

      const url = `http://localhost:5678/api/works/${id}`;

      // Remove image
      const requestInfos = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*",
          "Authorization": `Bearer ${token}`
        }
      };

      fetch(url, requestInfos)
      .then(response => {
        if (response.ok)
        {
          console.log('Work deleted')
        } else {
          throw new Error(`Http error: ${response.status}`)
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
    })
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

  generateSecondModal();
}

function checkFormValidity() {
  const form = document.getElementById("form");
  const validateButton = document.getElementById("submit");
  validateButton.setAttribute("disabled", "true");

  form.addEventListener("input", (e) =>  {
    if (form.checkValidity()) {
      validateButton.classList.add("valid");
      validateButton.removeAttribute("disabled");
    } else {
      validateButton.classList.remove("valid");
      // validateButton.setAttribute("disabled", "true");
    }
  })
}

async function sendImage(e) {
  e.preventDefault();

  const url = "http://localhost:5678/api/works";
  // recup valeurs
  const image = document.getElementById("image").files[0];
  const title = document.getElementById("title").value;
  const category = document.getElementById("category-select").value;
  console.log(category)

  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", category);

  const requestInfos = {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: formData
  }
  try {
    const response = await fetch(url, requestInfos);
    const data = await response.json();
    console.log(data)

    if (data.hasOwnProperty("title") && data.hasOwnProperty("imageUrl") && data.hasOwnProperty("categoryId")) {
      console.log("hellooooooo");
      checkFormValidity()

      location.reload();
    } else {
      const errorMessage = document.getElementById("wrongPassword");
      errorMessage.innerText = "Veuillez remplir correctement le formulaire.";
      errorMessage.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function generateSecondModal() {
  const buttonAddImage = document.querySelector(".btn");
  buttonAddImage.addEventListener("click",(e) => {
    e.preventDefault();
    // Remove everything from the modal-conten
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = "";

    const back = document.createElement("i");
    back.className = "fa-solid fa-arrow-left";

    const title = document.createElement("h2");
    title.innerText = "Ajout photo";

    // Create form element
    const form = document.createElement("form");
    form.action = "http://localhost:5678/api/works";
    form.method = "post";
    form.id = "form";
    form.innerHTML = `
      <input type="file" name="image" id="image">
      <label for="title">Titre</label>
      <input type="text" name="title" id="title" required>
      <label for="category">Catégorie</label>
      <select name="category" id="category-select" required>
      <select/>
      <p id="wrongPassword"></p>
      <input type="submit" value="Valider" id="submit" class="submit-btn">`;

    modal.appendChild(back);
    modalContent.appendChild(title);
    modalContent.appendChild(form);

    const formValidation = document.getElementById("form");
    formValidation.addEventListener("submit", sendImage);

    // Call the function to populate options
    selectOptions()
  });
}

async function selectOptions() {
  try {
    const apiCategory = await fetch("http://localhost:5678/api/categories");
    const categories = await apiCategory.json();

    const categorySelect = document.getElementById("category-select");

    // Clear existing options
    categorySelect.innerHTML = "";

    // Loop through categories and create options
    categories.forEach(category => {
      const categoryOption = document.createElement("option");
      categoryOption.id = "option";
      categoryOption.value = category.id;
      categoryOption.innerText = category.name;

      categorySelect.appendChild(categoryOption);
    });
  } catch (error) {
    console.error("Error fetching or parsing categories:", error);
  }
}
