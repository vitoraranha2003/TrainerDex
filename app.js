const trainersData = [
  { id: 1, name: "Red", types: [{ type: { name: "champion" } }] },
  { id: 2, name: "Blue", types: [{ type: { name: "champion" } }] },
  { id: 3, name: "Brock", types: [{ type: { name: "rock" } }] },
  { id: 4, name: "Misty", types: [{ type: { name: "water" } }] },
  { id: 5, name: "Lt. Surge", types: [{ type: { name: "electric" } }] },
  { id: 6, name: "Erika", types: [{ type: { name: "grass" } }] },
  { id: 7, name: "Koga", types: [{ type: { name: "poison" } }] },
  { id: 8, name: "Sabrina", types: [{ type: { name: "psychic" } }] },
  { id: 9, name: "Blaine", types: [{ type: { name: "fire" } }] },
  { id: 10, name: "Giovanni", types: [{ type: { name: "teamRocket" } }] },
];

const generateTrainersPromises = () => trainersData;

const generateHTML = (trainers) => {
  return trainers.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map((typeInfo) => typeInfo.type.name);

    accumulator += `
      <li class="card ${elementTypes[0]}" data-id="${id}" data-name="${name}">
        <img class="card-image" alt="${name}" src="./images/${id}.png" />
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle">${elementTypes.join(" | ")}</p>
      </li>
    `;
    return accumulator;
  }, "");
};

const insertTrainersIntoPage = (trainers) => {
  const ul = document.querySelector('[data-js="trainerdex"]');
  ul.innerHTML = trainers;
};

const TrainersPromises = generateTrainersPromises();
const html = generateHTML(TrainersPromises);
insertTrainersIntoPage(html);

const menu = document.getElementById("trainer-menu");
const trainerName = document.getElementById("trainer-name");
const trainerInfo = document.getElementById("trainer-info");
const closeMenu = document.getElementById("close-menu");
const trainerImage = document.getElementById("trainer-image");

let currentTrainerId = null;

const showTrainerDetails = (id) => {
  const selectedTrainer = trainersData.find((trainer) => trainer.id == id);

  trainerName.textContent = selectedTrainer.name;
  trainerInfo.textContent = `Type: ${selectedTrainer.types
    .map((typeInfo) => typeInfo.type.name)
    .join(", ")}`;

  trainerImage.src = `./images/tc${selectedTrainer.id}.png`;
  trainerImage.alt = `${selectedTrainer.name}`;

  menu.classList.add("open");
  currentTrainerId = id;
};

const addClickEventToCards = () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = parseInt(card.getAttribute("data-id"));
      showTrainerDetails(id);
    });
  });
};

addClickEventToCards();

closeMenu.addEventListener("click", () => {
  menu.classList.remove("open");
});

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

previousButton.addEventListener("click", () => {
  if (currentTrainerId === null) return;

  if (currentTrainerId > 1) {
    currentTrainerId--;
  } else {
    currentTrainerId = trainersData.length;
  }
  showTrainerDetails(currentTrainerId);
});

nextButton.addEventListener("click", () => {
  if (currentTrainerId === null) return;

  if (currentTrainerId < trainersData.length) {
    currentTrainerId++;
  } else {
    currentTrainerId = 1;
  }
  showTrainerDetails(currentTrainerId);
});