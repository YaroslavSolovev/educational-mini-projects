const nameInput = document.querySelector("#name");
const classSelect = document.querySelector("#class");
const btn = document.querySelector("#generateBtn");
const charName = document.querySelector("#charName");
const charClass = document.querySelector("#charClass");
const hpEl = document.querySelector("#hp");
const attackEl = document.querySelector("#attack");
const defenseEl = document.querySelector("#defense");
const manaEl = document.querySelector("#mana");
const list = document.querySelector("#list");
const characters = [];


const CHARACTER_CLASSES = {
   Warrior: {
      hp: 1000,
      attack: 175,
      defense: 150,
      mana: 80
   },
   Mage: {
      hp: 700,
      attack: 275,
      defense: 70,
      mana: 100
   },
   Archer: {
      hp: 1500,
      attack: 60,
      defense: 230,
      mana: 40
   }
};

class Character {
   constructor(name, characterClass) {
      this.name = name;
      this.characterClass = characterClass;
      this.createStats();
   }
   createStats() {
      Object.assign(this, CHARACTER_CLASSES[this.characterClass]);
   }
}

btn.addEventListener("click", () => {
   const name = nameInput.value;
   const characterClass = classSelect.value;
   const character = new Character(name, characterClass);
   characters.push(character);
   renderCharacters();
});

function renderCharacters() {
   list.innerHTML = "";
   characters.forEach((character,index) => {
      const card = document.createElement("div");
      card.innerHTML = `
      <h3>${character.name}</h3>
      <p>Class: ${character.characterClass}</p>
      <p>HP: ${character.hp}</p>
      <p>Attack: ${character.attack}</p>
      <p>Defense: ${character.defense}</p>
      <p>Mana: ${character.mana}</p>
      `;
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Удалить персонажа";
      deleteBtn.addEventListener("click", () => {
         characters.splice(index,1);
         renderCharacters();
      });
      card.appendChild(deleteBtn);
      list.appendChild(card);
      console.log(character)
   });
}

