import { game } from "./Game/Game.js";
import { CharacterFactory } from "./models/CharacterFactory.js";
import "./components/HeroCard.js";

const nameInput = document.querySelector("#name");
const createBtn = document.querySelector("#generateBtn");
const heroCards = document.querySelector("#heroCards");
const getGold = document.querySelector("#gold");
const addGoldBtn = document.querySelector("#addGold");
const heroInfo = document.querySelector("#heroInfo");

heroCards.addEventListener("sell", (event) => {
   const character = event.detail.character;
   const wasSold = game.sellCharacter(character);
   if (!wasSold) {
      return;
   }
   renderCharacters();
   renderGold();
   renderSelectedCharacter();
});


addGoldBtn.addEventListener("click", ()=>{
   game.addGold(100);
   renderGold();
})

heroCards.addEventListener("select-character", (event) => {
   const character = event.detail.character;
   const wasSelected = game.selectCharacter(character);
   if (!wasSelected) {
      return;
   }
   renderCharacters();
   renderSelectedCharacter();
});

createBtn.addEventListener("click", () => {
   const name = nameInput.value;
   const character = CharacterFactory.create(name);
   const wasPurchased = game.buyCharacter(character);
   if (!wasPurchased) {
      alert("Недостаточно золота");
      return;
   }
   renderGold();
   renderCharacters();
});

function renderCharacters() {
   heroCards.innerHTML = "";
   game.characters.forEach((character) => {
      const card = document.createElement("hero-card");
      card.character = character;
      card.selected = character === game.selectedCharacter;
      heroCards.appendChild(card);
   });
}

function renderSelectedCharacter() {
   const character = game.selectedCharacter;
   heroInfo.innerHTML = "";
   if (!character) {
      return;
   }
   const info = document.createElement("div");
   info.classList.add("info");
   info.innerHTML = `
      <img src="${character.imagePath}" alt="${character.name}">
      <h3>${character.name}</h3>
      <p>Class: ${character.className}</p>
      <p>HP: ${character.currentHP}/${character.hp}</p>
      <p>Attack: ${character.attack}</p>
      <p>Defense: ${character.defense}</p>
      <p>Mana: ${character.mana}</p>
      <p>Rarity: ${character.rarity}</p>
   `;
   heroInfo.appendChild(info);
}

function renderGold(){
   getGold.textContent=`Gold: ${game.gold}`
};

renderGold();
renderCharacters();