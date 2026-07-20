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

   const image = document.createElement("img");
   image.src = character.imagePath;
   image.alt = character.name;

   const name = document.createElement("h3");
   name.textContent = character.name;

   const heroClass = document.createElement("p");
   heroClass.textContent = `Class: ${character.className}`;

   const hp = document.createElement("p");
   hp.textContent = `HP: ${character.currentHP}/${character.hp}`;

   const attack = document.createElement("p");
   attack.textContent = `Attack: ${character.attack}`;

   const defense = document.createElement("p");
   defense.textContent = `Defense: ${character.defense}`;

   const mana = document.createElement("p");
   mana.textContent = `Mana: ${character.mana}`;

   const rarity = document.createElement("p");
   rarity.textContent = `Rarity: ${character.rarity}`;

   info.append(
      image,
      name,
      heroClass,
      hp,
      attack,
      defense,
      mana,
      rarity
   );

   heroInfo.appendChild(info);
}

function renderGold(){
   getGold.textContent=`Gold: ${game.gold}`
};

renderGold();
renderCharacters();