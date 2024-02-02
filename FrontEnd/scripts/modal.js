//
let token;
if (window.localStorage.getItem("userData")) {
  token = JSON.parse(window.localStorage.getItem("userData")).token;
}

// Function to close the modal
function closeModal() {
  // modal.classList.add("hidden");
  // backdrop.classList.add("hidden");
  const backdrop = document.getElementById("backdrop");
  const modal = document.getElementById("modal");
  modal.remove();
  backdrop.remove();
}

// Function to generate the modal
export function generateModal(items) {
  // Create modal elements
  const backdrop = document.createElement("div");
  backdrop.id = "backdrop";

  const modal = document.createElement("section");
  modal.id = "modal";

  const positionIcons = document.createElement("div");
  positionIcons.id = "position";
  modal.appendChild(positionIcons);

  const closeButton = document.createElement("i");
  closeButton.className = "fa-solid fa-xmark";

  positionIcons.appendChild(closeButton);

  const modalContent = document.createElement("div");
  modalContent.id = "modal-content";
  const title = document.createElement("h2");
  title.innerText = "Galerie photo";
  modalContent.appendChild(title);

  const modalImages = document.createElement("div");
  modalImages.className = "modal-images";

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

    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();

      // Image id
      let id = items[i].id;
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
      location.reload();
    })
  }

  modalContent.appendChild(modalImages);
  // Button to add an image
  const addPhotoButton = document.createElement("button");
  addPhotoButton.className = "btn";
  addPhotoButton.innerText = "Ajouter une photo";
  modalContent.appendChild(addPhotoButton);

  modal.appendChild(modalContent);

  const body = document.querySelector("body");
  body.insertAdjacentElement("afterbegin", modal);
  body.insertAdjacentElement("afterbegin", backdrop);

  // Calling functions
  const backdropClose = document.getElementById("backdrop");
  backdropClose.addEventListener("click", closeModal);

  closeButton.addEventListener("click", closeModal);

  const buttonAddImage = document.querySelector(".btn");
  buttonAddImage.addEventListener("click", generateSecondModal);
}

// Function to go back
async function goBack(modal, backdrop) {
  // Retrieve data from the backend
  const apiWorks = await fetch("http://localhost:5678/api/works");
  const works = await apiWorks.json();

  closeModal();
  generateModal(works);
}

async function sendImage(e) {
  e.preventDefault();

  const url = "http://localhost:5678/api/works";
  // recup valeurs
  const image = document.getElementById("image").files[0];
  const title = document.getElementById("title").value;
  const category = document.getElementById("category-select").value;

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

    if (data.hasOwnProperty("title") && data.hasOwnProperty("imageUrl") && data.hasOwnProperty("categoryId")) {
      location.reload();
    } else {
      const categoryMargin = document.getElementById("category-select");
      categoryMargin.style.marginBottom = "12px";

      const errorMessage = document.getElementById("wrongPassword");
      errorMessage.innerText = "Veuillez remplir correctement le formulaire.";
      errorMessage.style.color = "red";
      errorMessage.style.marginBottom = "30px";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function generateSecondModal(e) {
  e.preventDefault();
  // Remove everything from the modal-conten
  const backdrop = document.createElement("div");
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = "";

  const backButton = document.createElement("i");
  backButton.className = "fa-solid fa-arrow-left";
  backButton.id = "arrow-left";

  const positionIcons = document.getElementById('position')
  positionIcons.appendChild(backButton);

  const title = document.createElement("h2");
  title.innerText = "Ajout photo";

  // Create form element
  const form = document.createElement("form");
  form.action = "http://localhost:5678/api/works";
  form.method = "post";
  form.id = "form";
  form.innerHTML = `
    <div class="modal-files">
      <i class="fa-regular fa-image"></i>
      <label for="image" id="add-file">+ Ajouter photo</label>
      <input type="file" name="image" id="image" class="hidden">
      <p>jpg, png : 4mo max</p>
    </div>
    <label for="title">Titre</label>
    <input type="text" name="title" id="title" required>
    <label for="category" id="category">Catégorie</label>
    <select name="category" id="category-select" required>
    <select/>
    <p id="wrongPassword"></p>
    <div class="modal-btn">
      <input type="submit" value="Valider" id="submit" class="submit-btn">
    </div>`;

  modalContent.appendChild(title);
  modalContent.appendChild(form);

  // Image preview
  const image = document.getElementById("image");
  image.onchange = (e) => {
    const [file] = image.files;
    if (file) {
      const imagePreview = document.createElement("img");
      imagePreview.style.maxWidth = "32%";
      imagePreview.src = URL.createObjectURL(file);

      const modalFiles = document.querySelector(".modal-files");
      const iconFile = document.querySelector(".fa-image");
      iconFile.style.display = "none";
      const addFile = document.getElementById("add-file");
      addFile.style.display = "none";
      const text = document.querySelector("p");
      text.style.display = "none";
      modalFiles.style.padding = "0";

      modalFiles.appendChild(imagePreview);
      form.insertAdjacentElement("afterbegin", modalFiles);
    }
  };
  const formValidation = document.getElementById("form");
  formValidation.addEventListener("submit", sendImage);

  selectOptions();

  const backModal = document.getElementById("arrow-left");
  backModal.addEventListener("click", (e) => {
    goBack(modal, backdrop);
  });

  // Check form elements validity
  let checks = {
    imageElementIsFilled: false,
    titleElementIsFilled: false,
    categoryElementIsFilled: false,
  };
  // Check the image
  const imageElement = document.getElementById("image");
  imageElement.addEventListener("change", (e) => {
    const inputImage = imageElement.files[0];
    if (inputImage) {
      checks["imageElementIsFilled"] = true;
      checkFormValidity(checks);
    }
  });
  // Check the title
  const titleElement = document.getElementById("title");
  titleElement.addEventListener("change", (e) => {
    const inputTitle = titleElement.value;
    console.log({inputTitle});
    if (inputTitle.length > 1) {
      checks["titleElementIsFilled"] = true;
      checkFormValidity(checks);
    } else {
      checks["titleElementIsFilled"] = false;
      checkFormValidity(checks);
    }
  });
  // Check the category
  const categoryElement = document.getElementById("category-select");
  categoryElement.addEventListener("change", (e) => {
    const categoryList = ["Objets", "Appartements", "Hotels & restaurants"];

    const categoriesAllowed = {
      1: "Objets",
      2: "Appartements",
      3: "Hotels & restaurants"
    };
    const selectCategory = categoryElement.value;

    if (categoryList.includes(categoriesAllowed[parseInt(selectCategory)])) {
      checks["categoryElementIsFilled"] = true;
      checkFormValidity(checks);
    } else {
      checks["categoryElementIsFilled"] = false;
      checkFormValidity(checks);
    }
  });
}

async function selectOptions() {
  try {
    const apiCategory = await fetch("http://localhost:5678/api/categories");
    const categories = await apiCategory.json();

    const categorySelect = document.getElementById("category-select");
    // Clear existing options
    categorySelect.innerHTML = "";

    // Empty option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    categorySelect.appendChild(defaultOption);

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

function checkFormValidity(checks) {
  const buttonElement = document.getElementById("submit");
  // Read the keys inside checks
  if (checks.imageElementIsFilled && checks.titleElementIsFilled && checks.categoryElementIsFilled) {
    buttonElement.style.backgroundColor = "#1D6154";

    const selectMargin = document.getElementById("category-select");
    selectMargin.style.marginBottom = "47px";
    const errorMessage = document.getElementById("wrongPassword");
    errorMessage.style.display = "none";
  } else {
    buttonElement.style.backgroundColor = "#A7A7A7";
  }
}
