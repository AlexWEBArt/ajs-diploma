import Team from '../js/Team';
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
  let randomLevel = Math.floor(1 + Math.random() * maxLevel - 1 + 1)
  console.log(allowedTypes)
  for(const hero of allowedTypes){
    yield new hero(randomLevel);
  }
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  let characters = [];
  let generator = characterGenerator(allowedTypes, maxLevel)
  console.log(generator)
  for (let i = 0; i < characterCount; i++) {
    characters.push(generator.next().value)
  }
  console.log(characters)
  return new Team(characters)
  // TODO: write logic here
}
