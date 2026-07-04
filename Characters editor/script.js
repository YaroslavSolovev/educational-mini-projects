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

class Character {
   constructor(name, characterClass) {
      this.name = name;
      this.characterClass = characterClass;
   }
}

function createStats(character, characterClass) {
   character.hp =
      CHARACTER_CLASSES[characterClass].hp.min +
      Math.floor(
         Math.random() *
         (CHARACTER_CLASSES[characterClass].hp.max - CHARACTER_CLASSES[characterClass].hp.min + 1)
      );

   character.attack =
      CHARACTER_CLASSES[characterClass].attack.min +
      Math.floor(
         Math.random() *
         (CHARACTER_CLASSES[characterClass].attack.max - CHARACTER_CLASSES[characterClass].attack.min + 1)
      );

   character.defense =
      CHARACTER_CLASSES[characterClass].defense.min +
      Math.floor(
         Math.random() *
         (CHARACTER_CLASSES[characterClass].defense.max - CHARACTER_CLASSES[characterClass].defense.min + 1)
      );

   character.mana =
      CHARACTER_CLASSES[characterClass].mana.min +
      Math.floor(
         Math.random() *
         (CHARACTER_CLASSES[characterClass].mana.max - CHARACTER_CLASSES[characterClass].mana.min + 1)
      );
}

btn.addEventListener("click", () => {
   const name = nameInput.value;
   const characterClass = classSelect.value;
   const character = new Character(name, characterClass);
   createStats(character, characterClass);
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
      card.classList.add("card")
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Удалить персонажа";
      deleteBtn.addEventListener("click", () => {
         characters.splice(index,1);
         renderCharacters();
      });
      card.appendChild(deleteBtn);
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
}

