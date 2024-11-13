const trainersData = [
  { id: 1, name: "Red", types: [{ type: { name: "champion" } }] },
  { id: 2, name: "Blue", types: [{ type: { name: "champion" } }] },
  { id: 3, name: "Brock", types: [{ type: { name: "rock" } }] },
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

const menu = document.getElementById('trainer-menu');
const trainerName = document.getElementById('trainer-name');
const trainerInfo = document.getElementById('trainer-info');
const closeMenu = document.getElementById('close-menu');
const trainerImage = document.getElementById('trainer-image');

const addClickEventToCards = () => {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const selectedTrainer = trainersData.find(trainer => trainer.id == id);
      
      trainerName.textContent = selectedTrainer.name;
      trainerInfo.textContent = `Type: ${selectedTrainer.types.map(typeInfo => typeInfo.type.name).join(", ")}`;
      
      trainerImage.src = `./images/tc${selectedTrainer.id}.png`;
      trainerImage.alt = `${selectedTrainer.name}`;

      menu.classList.add('open');
    });
  });
};

addClickEventToCards();

closeMenu.addEventListener('click', () => {
  menu.classList.remove('open');
});