export class Character{
   constructor(data){
      this.name = data.name;
      this.className = data.className;
      this.rarity = data.rarity;
      this.currentHP = data.currentHP;
      this.hp = data.hp;
      this.attack = data.attack;
      this.defense = data.defense;
      this.mana = data.mana;
      this.imagePath = data.imagePath;
   }
}
