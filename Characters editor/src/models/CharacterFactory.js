import { Character } from "./Character.js";

const RARITIES= {
   "Common": {probability: 65, factor: 1 },
   "Rare": {probability: 94, factor: 1.15},
   "Epic": { probability: 99, factor: 1.3},
   "Legendary": {probability: 100, factor: 1.5}
}

const classes= ["Warrior", "Mage", "Archer"]



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

class CharacterFactory{

   static create(name){
      const className = this.generateClassName();
      const rarity = this.generateRarity();
      const hp = this.generateHP(className, rarity);
      const currentHP = hp;
      const attack = this.generateAttack(className, rarity);
      const defense = this.generateDefense(className, rarity);
      const mana = this.generateMana(className, rarity);
      const imagePath = this.generateImagePath(className, rarity);

      
      
      return new Character({name: name, className: className, rarity: rarity, hp: hp, currentHP: currentHP,
         attack: attack, defense: defense, mana: mana, imagePath: imagePath});

   }

   static generateClassName(){
      return classes[Math.floor(Math.random()*3)]
   }

   static generateRarity(){
      const rand = Math.floor(Math.random() * 100) + 1;
      for ( let key in RARITIES){
         if (rand <= RARITIES[key].probability){
            return key
         }
      }
   };

   static generateHP(className, rarity){
      return (Math.floor((CHARACTER_CLASSES[className].hp.min +
      Math.floor(
         Math.random() *
         (CHARACTER_CLASSES[className].hp.max - CHARACTER_CLASSES[className].hp.min + 1)
      )) * RARITIES[rarity].factor));
   };

   static generateAttack(className, rarity){
      return (Math.floor((CHARACTER_CLASSES[className].attack.min +
      Math.floor(
         Math.random() *
         (CHARACTER_CLASSES[className].attack.max - CHARACTER_CLASSES[className].attack.min + 1)
      )) * RARITIES[rarity].factor));
   }

   static generateDefense(className, rarity){
      return (Math.floor((CHARACTER_CLASSES[className].defense.min +
      Math.floor(
         Math.random() *
         (CHARACTER_CLASSES[className].defense.max - CHARACTER_CLASSES[className].defense.min + 1)
      )) * RARITIES[rarity].factor));
   }

   static generateMana(className, rarity){
      return (Math.floor((CHARACTER_CLASSES[className].mana.min +
      Math.floor(
         Math.random() *
         (CHARACTER_CLASSES[className].mana.max - CHARACTER_CLASSES[className].mana.min + 1)
      )) * RARITIES[rarity].factor));
   }

   static generateImagePath(className, rarity){
      return "src/photos/" + className.toLowerCase() + "/" + rarity.toLowerCase() +".png"
   }

}

export { CharacterFactory };