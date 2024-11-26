const sortPrice = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();
  displaySort(data.pets);
  pets = data.pets;
};

const displaySort = (pets) => {
  console.log(pets);
  const sortedPets = pets.sort((a, b) => b.price - a.price);
  displayAllPets(sortedPets);
};

const petsCategory = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayPetsCategory(data.categories))
    .catch((err) => console.log(err));
};

const loadAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      data.pets;

      document.getElementById("loader-spinner").classList.remove("hidden");

      setTimeout(() => {
        displayAllPets(data.pets);
        document.getElementById("loader-spinner").classList.add("hidden");
      }, 2000);
    })
    .catch((err) => console.log(err));
};

const loadPetCategory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClassList();
      const activeButton = document.getElementById(`btn-${id}`);
      activeButton.classList.add(
        "rounded-full",
        "border-primary_bg",
        "bg-cyan-50"
      );

      document.getElementById("loader-spinner").classList.remove("hidden");

      setTimeout(() => {
        displayAllPets(data.data);
        document.getElementById("loader-spinner").classList.add("hidden");
      }, 2000);
    })
    .catch((err) => console.log(err));
};

const removeActiveClassList = () => {
  const button = document.getElementsByClassName("category-btn");
  for (let btn of button) {
    btn.classList.remove("rounded-full", "border-primary_bg", "bg-cyan-50");
  }
};

const loadPetDetails = async (petId) => {
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayPetDetails(data.petData);
};

let countdownInterval;

function OpenModal() {
  document.getElementById("my-modal").classList.add("modal-open");
  let countdownValue = 3;
  const countdownElements = document.getElementById("countdown");

  // const countdownElements = document.getElementById("countdown");
  countdownElements.innerText = countdownValue;

  countdownInterval = setInterval(() => {
    countdownValue--;
    countdownElements.innerText = countdownValue;

    if (countdownValue === 0) {
      closeModal();
    }
  }, 1000);

  function closeModal() {
    clearInterval(countdownInterval);
    modal = document.getElementById("my-modal").classList.remove("modal-open");
  }
}
const likePet = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displayLikePet(data.petData))
    .catch((err) => console.log(err));
};

const displayLikePet = (pet) => {
  const imgSection = document.getElementById("img-section");
  const div = document.createElement("div");
  div.classList.add("rounded-md");
  div.innerHTML = `<img class="p-1 w-28 h-28 object-cover rounded-md" src="${pet.image}"/>`;
  imgSection.append(div);
};

const displayPetDetails = (pet) => {
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `<div class="flex flex-col gap-3">
  <img class="w-full h-80 object-cover rounded-md" src="${
    pet.image
  }"/> <h1 class="font-bold text-xl">${pet.pet_name}</h1>
      <div class="grid grid-cols-2 gap-2 pb-4">
      <div class="flex items-center gap-2">
        <img class="w-5" src="./images/breed.png" alt="">
        ${
          !pet.breed || null
            ? `<p class="text-secondary_text_color">Breed: Not Available</p>`
            : `<p class="text-secondary_text_color">Breed: ${pet.breed}</p>`
        }
      </div>
      <div class="flex items-center gap-2">
        <img class="w-5" src="./images/birth.png" alt="">
        ${
          !pet.date_of_birth || null
            ? `<p class="text-secondary_text_color">Birth: Not Found</p>`
            : `<p class="text-secondary_text_color">Birth: ${pet.date_of_birth}</p>`
        }
      </div>
      <div class="flex items-center gap-2">
        <img class="w-5" src="./images/gender.png" alt="">
        ${
          !pet.gender || null
            ? `<p class="text-secondary_text_color">Gender: Not Found</p>`
            : `<p class="text-secondary_text_color">Gender: ${pet.gender}</p>`
        }
      </div>
      <div class="flex items-center gap-2">
        <img class="w-5" src="./images/price.png" alt="">
        ${
          !pet.price || null
            ? `<p class="text-secondary_text_color">Price: Not Available</p>`
            : `<p class="text-secondary_text_color">Price: ${pet.price}$</p>`
        }
      </div>
            <div class="flex items-center gap-2">
        <img class="w-5" src="./images/icon.png" alt="">
        ${
          !pet.vaccinated_status || null
            ? `<p class="text-secondary_text_color">Vaccinated status: Not Found</p>`
            : `<p class="text-secondary_text_color">Vaccinated status: ${pet.vaccinated_status}</p>`
        }
      </div>
      </div>
      <div>
      <h1 class="font-bold text-lg text-primary_text_color">Details Information</h1>
      <p  class="text-secondary_text_color text-justify">${pet.pet_details}</p>
      </div>
      
      </div>`;
  document.getElementById("showModalData").click();
};

const displayPetsCategory = (categories) => {
  const bestDeal = document.getElementById("best-deal");
  bestDeal.innerHTML = `        <h3 class="font-black md:text-2xl text-primary_text_color">Best Deal For you</h3>
        <button onclick="sortPrice()" class="btn bg-primary_bg hover:bg-cyan-800 text-white">Sort by Price</button>`;
  const categoriesButton = document.getElementById("categories-btn");
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `<button id="btn-${item.category}" onclick="loadPetCategory('${item.category}')" class="lg:text-2xl font-bold py-4 px-8 flex items-center text-primary_text_color border-2 border-cyan-50 rounded-md category-btn"><img class="w-14 pr-3" src="${item.category_icon}"/> <p>${item.category}</p></button>`;

    categoriesButton.append(buttonContainer);
  });
};

const displayAllPets = (pets) => {
  const cardDetails = document.getElementById("card");
  const imgSection = document.getElementById("img-section");
  cardDetails.innerHTML = "";

  if (pets.length === 0) {
    imgSection.classList.add("hide");
    cardDetails.classList.remove("grid");
    cardDetails.innerHTML = `<div class="flex flex-col justify-center items-center">
    <img src="./images/error.webp" class="w-40"/>
    <h1 class="py-5 font-bold text-xl lg:text-3xl text-primary_text_color">No Information Available</h1>
    <p class="text-center text-secondary_text_color">It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br/> 
      its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>`;
  } else {
    cardDetails.classList.add("grid");
  }
  pets.forEach((pet) => {
    const card = document.createElement("div");
    card.innerHTML = `<div class="p-5 flex flex-col gap-2 border-2 rounded-md">
      <img class="w-full h-40 object-cover rounded-md" src="${pet.image}"/>
      <h1 class="font-bold text-xl">${pet.pet_name}</h1>
      <div class="flex items-center gap-2">
        <img class="w-5" src="./images/breed.png" alt="">
        ${
          !pet.breed || null
            ? `<p class="text-secondary_text_color">Breed: Not Available</p>`
            : `<p class="text-secondary_text_color">Breed: ${pet.breed}</p>`
        }
      </div>
      <div class="flex items-center gap-2">
        <img class="w-5" src="./images/birth.png" alt="">
        ${
          !pet.date_of_birth || null
            ? `<p class="text-secondary_text_color">Birth: Not Found</p>`
            : `<p class="text-secondary_text_color">Birth: ${pet.date_of_birth}</p>`
        }
      </div>
      <div class="flex items-center gap-2">
        <img class="w-5" src="./images/gender.png" alt="">
        ${
          !pet.gender || null
            ? `<p class="text-secondary_text_color">Gender: Not Found</p>`
            : `<p class="text-secondary_text_color">Gender: ${pet.gender}</p>`
        }
      </div>
      <div class="flex items-center gap-2">
        <img class="w-5" src="./images/price.png" alt="">
        ${
          !pet.price || null
            ? `<p class="text-secondary_text_color">Price: Not Available</p>`
            : `<p class="text-secondary_text_color">Price: ${pet.price}$</p>`
        }
      </div>
      <hr/>
      <div class="flex justify-between gap-2">
      <button onclick="likePet(${
        pet.petId
      })" class="btn bg-transparent border-2 border-cyan-50 hover:bg-transparent hover:border-cyan-100">
      <img class="w-5" src="./images/like.png" alt=""></button>
      <button onclick="OpenModal()" class="btn bg-transparent border-2 border-cyan-50 hover:bg-transparent hover:border-cyan-100 font-bold text-lg text-primary_bg">Adopt</button>
      <button onclick="loadPetDetails(${
        pet.petId
      })" class="btn bg-transparent border-2 border-cyan-50 hover:bg-transparent hover:border-cyan-100 font-bold text-lg text-primary_bg">Details</button>
              
            </div>
    </div>`;
    cardDetails.append(card);
  });
};

petsCategory();
loadAllPets();