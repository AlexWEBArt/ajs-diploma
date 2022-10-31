import Team from './Team';
/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  // let randomIndex = Math.floor(1 + Math.random() * allowedTypes.length - 2 + 1)
  let randomLevel = 0;
  let count = 0;
  // for (count; count < allowedTypes.length + 1; count += 1) {
  //   if (count === allowedTypes.length) {
  //     count = 0;
  //   }
  //   count = Math.floor(1 + Math.random() * allowedTypes.length - 1 - 1 + 1);
  //   randomLevel = Math.floor(1 + Math.random() * maxLevel - 1 + 1);
  //   yield new allowedTypes[count](randomLevel);
  // }
  while (true) {
    count = Math.floor(1 + Math.random() * allowedTypes.length - 1 - 1 + 1);
    randomLevel = Math.floor(1 + Math.random() * maxLevel - 1 + 1);
    yield new allowedTypes[count](randomLevel);
  }
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей.
 * Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const characters = [];
  const generator = characterGenerator(allowedTypes, maxLevel);
  for (let i = 0; i < characterCount; i += 1) {
    characters.push(generator.next().value);
  }
  return new Team(characters);
  // TODO: write logic here
}
