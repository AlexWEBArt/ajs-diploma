import Character from '../Character';
import Bowman from '../characters/Bowman';

test('checking the class Character for throw Error', () => {
  expect(() => new Character()).toThrow();
});

test('checking the class Bowman for creation', () => {
  const checkHero = {
    areaOfMovement: null,
    attackRadius: null,
    attack: 25,
    defence: 25,
    health: 50,
    level: 1,
    type: 'bowman',
  };
  expect(new Bowman(1)).toEqual(checkHero);
});
