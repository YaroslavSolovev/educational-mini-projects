const nameInput = document.querySelector("#name");
const createBtn = document.querySelector("#generateBtn");
const charName = document.querySelector("#charName");
const charClass = document.querySelector("#charClass");
const hpEl = document.querySelector("#hp");
const attackEl = document.querySelector("#attack");
const defenseEl = document.querySelector("#defense");
const manaEl = document.querySelector("#mana");
const heroCards = document.querySelector("#heroCards");
const infoCards = document.querySelector("#heroInfo")
const getGold = document.querySelector("#gold");
const addGoldBtn = document.querySelector("#addGold");

heroCards.addEventListener("sell", (event) => {
   const character = event.detail.character;
   console.log(character);
});


addGoldBtn.addEventListener("click", ()=>{
   game.gold += 100;
   renderGold();
})

createBtn.addEventListener("click", () => {
   if (game.gold >=100){
      game.gold -=100;
      const name = nameInput.value;
      const character = CharacterFactory.create(name);
      game.characters.push(character);
      renderGold();
      renderCharacters();
   }
   else{
      alert("Недостаточно золота")
   }
});

function renderCharacters() {
   game.characters.forEach((character,index) => {
      heroCards.innerHTML = "";
      const card = document.createElement("hero-card");
      card.character = character;
      heroCards.appendChild(card);
   });
   renderGold();
};

function renderGold(){
   getGold.textContent=`Gold: ${game.gold}`
};