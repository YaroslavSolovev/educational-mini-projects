import { game } from "./Game/Game.js";
import { CharacterFactory } from "./models/CharacterFactory.js";
import "./components/HeroCard.js";

const nameInput = document.querySelector("#name");
const createBtn = document.querySelector("#generateBtn");
const heroCards = document.querySelector("#heroCards");
const getGold = document.querySelector("#gold");
const addGoldBtn = document.querySelector("#addGold");

heroCards.addEventListener("sell", (event) => {
   const character = event.detail.character;
   game.sellCharacter(character);;
   renderCharacters();
   renderGold();
});


addGoldBtn.addEventListener("click", ()=>{
   game.addGold(100);
   renderGold();
})

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
      heroCards.appendChild(card);
   });
}

function renderGold(){
   getGold.textContent=`Gold: ${game.gold}`
};

renderGold();
renderCharacters();