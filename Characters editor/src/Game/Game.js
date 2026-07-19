import { Character } from '../models/Character.js';
import { CharacterFactory } from '../models/CharacterFactory.js';

const game ={
   gold: 5000,
   characters: [],
   selectedCharacter: null
};
getGold.textContent=`Gold: ${game.gold}`

export { game, renderCharacters, renderGold, renderRightPanel };