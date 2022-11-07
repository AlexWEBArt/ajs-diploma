import { generateTeam, characterGenerator } from '../generators';
import Bowman from '../characters/Bowman';
import Magician from '../characters/Magician';
import Swordsman from '../characters/Swordsman';

test('checking whether the character Generator infinitely new characters from the list', () => {
  const countIterations = 15;

  const characters = [];
  const playerTypes = [Bowman, Swordsman, Magician];
  const generator = characterGenerator(playerTypes, 4);
  for (let i = 0; i < countIterations; i += 1) {
    characters.push(generator.next().value);
  }
  expect(characters.length).toBe(countIterations);
});

test('checking whether playerTeam are created in the right number and range of levels', () => {
  const characterCount = 5;
  const maxLevel = 4;

  const playerTypes = [Bowman, Swordsman, Magician];
  const generator = generateTeam(playerTypes, maxLevel, characterCount);

  const filter = generator.playerTeam.filter((item) => item.level <= maxLevel && item.level >= 0);

  expect(generator.playerTeam.length).toBe(characterCount);
  expect(generator.playerTeam.length).toBe(filter.length);
});
