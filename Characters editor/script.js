const nameInput = document.querySelector("#name");
const btn = document.querySelector("#generateBtn");
const charName = document.querySelector("#charName");
const charClass = document.querySelector("#charClass");
const hpEl = document.querySelector("#hp");
const attackEl = document.querySelector("#attack");
const defenseEl = document.querySelector("#defense");
const manaEl = document.querySelector("#mana");
const list = document.querySelector("#list");
const getGold = document.querySelector("#gold");
const addGoldBtn = document.querySelector("#addGold");
const game ={
   gold: 5000,
   characters: [],
}

const RARITIES= {
   "Common": {probability: 65, factor: 1 },
   "Rare": {probability: 94, factor: 1.15},
   "Epic": { probability: 99, factor: 1.3},
   "Legendary": {probability: 100, factor: 1.5}
}

const classes= ["Warrior", "Mage", "Archer"]

getGold.textContent=`Gold: ${game.gold}`

const CHARACTER_CLASSES = {
   Warrior: {
      hp:{
         max:1150,
         min: 850
      },
      attack: {
         max:200,
         min: 150
      },
      defense: {
         max:175,
         min: 125
      },
      mana: {
         max:100,
         min: 60
      }
   },
   Mage: {
      hp: {
         max: 900,
         min: 500
      },
      attack: {
         max: 325,
         min: 275
      },
      defense: {
         max: 90,
         min: 50
      },
      mana: {
         max: 125,
         min: 75
      }
   },
   Archer: {
      hp: {
         max: 1800,
         min: 1200
      },
      attack: {
         max: 70,
         min: 50
      },
      defense: {
         max: 250,
         min: 200
      },
      mana: {
         max: 50,
         min: 30
      }
   }
};

function selectRarity(){
   let rand = Math.floor(Math.random()* 100)
   for ( let key in RARITIES){
      if (rand <= RARITIES[key].probability){
         return key
      }
   }
}

class Character {
   constructor(name, characterClass) {
      this.name = name;
      this.characterClass = characterClass;
   }
}

function renderGold(){
   getGold.textContent=`Gold: ${game.gold}`
}

function createStats(character, characterClass) {
   character.rarity = selectRarity();
   character.hp =
      Math.floor((CHARACTER_CLASSES[characterClass].hp.min +
      Math.floor(
         Math.random() *
         (CHARACTER_CLASSES[characterClass].hp.max - CHARACTER_CLASSES[characterClass].hp.min + 1)
      )) * RARITIES[character.rarity].factor);

   character.currentHP = character.hp   

   character.attack =
      Math.floor((CHARACTER_CLASSES[characterClass].attack.min +
      Math.floor(
         Math.random() *
         (CHARACTER_CLASSES[characterClass].attack.max - CHARACTER_CLASSES[characterClass].attack.min + 1)
      )) * RARITIES[character.rarity].factor);

   character.defense =
      Math.floor((CHARACTER_CLASSES[characterClass].defense.min +
      Math.floor(
         Math.random() *
         (CHARACTER_CLASSES[characterClass].defense.max - CHARACTER_CLASSES[characterClass].defense.min + 1)
      )) * RARITIES[character.rarity].factor);

   character.mana =
      Math.floor((CHARACTER_CLASSES[characterClass].mana.min +
      Math.floor(
         Math.random() *
         (CHARACTER_CLASSES[characterClass].mana.max - CHARACTER_CLASSES[characterClass].mana.min + 1)
      )) * RARITIES[character.rarity].factor);
}

addGoldBtn.addEventListener("click", ()=>{
   game.gold += 100;
   renderGold();
})

btn.addEventListener("click", () => {
   if (game.gold >=100){
      game.gold -=100;
      const name = nameInput.value;
      const characterClass = classes[Math.floor(Math.random()*3)]
      const character = new Character(name, characterClass);
      createStats(character, characterClass);
      game.characters.push(character);
      renderGold();
      renderCharacters();
   }
   else{
      alert("Недостаточно золота")
   }
});

function renderCharacters() {
   list.innerHTML = "";

   game.characters.forEach((character,index) => {
      const card = document.createElement("div");
      card.innerHTML = `
      <h3>${character.name}</h3>
      <p>Class: ${character.characterClass}</p>
      <p class="HP">HP: ${character.currentHP}/${character.hp}</p>
      <p>Attack: ${character.attack}</p>
      <p>Defense: ${character.defense}</p>
      <p>Mana: ${character.mana}</p>
      <p>Rarity: ${character.rarity}</p>
      `;
      card.classList.add("card")
      const sellBtn = document.createElement("button");
      const fightBtn = document.createElement("button")
      sellBtn.textContent = "Продать персонажа";
      fightBtn.textContent = "Бой"
      sellBtn.addEventListener("click", () => {
         game.gold += 10;
         game.characters.splice(index,1);
         renderCharacters();
      });
      fightBtn.addEventListener("click", () => {
         if (character.currentHP>150){
            character.currentHP-=150
            renderCharacters()
         }
      });
      card.appendChild(sellBtn);
      card.appendChild(fightBtn);
      const hr = document.createElement("hr");
      card.appendChild(hr);
      list.appendChild(card);
      card.addEventListener("click", () => {
         const allCard=document.querySelectorAll(".card")
         allCard.forEach(cards => {
            cards.classList.remove("selected");
         });
         card.classList.add("selected");
      });
   });
   renderGold();
}

