export class Game {
   constructor() {
      this.gold = 5000;
      this.characters = [];
      this.selectedCharacter = null;
   }

   addGold(amount) {
      this.gold += amount;
   }

   buyCharacter(character) {
      const price = 100;
      if (this.gold < price) {
         return false;
      }
      this.gold -= price;
      this.characters.push(character);
      return true;
   }

   sellCharacter(character) {
      const characterExists = this.characters.includes(character);
      if (!characterExists) {
         return false;
      }
      this.characters = this.characters.filter(
         currentCharacter => currentCharacter !== character
      );
      this.gold += 100;
      return true;
   }
}

export const game = new Game();