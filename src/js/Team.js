import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import PlayerTeam from './team/PlayerTeam';
import ComputerTeam from './team/ComputerTeam';
import PositionedCharacter from './PositionedCharacter';

/**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */
export default class Team {
  constructor(сharacters) {
    this.playerTeam = [];
    this.positionedPlayerTeam = [];
    this.computerTeam = [];
    this.positionedComputerTeam = [];
    this.position = new Set();
    сharacters.forEach((item) => {
      if (item instanceof Bowman 
        || item instanceof Swordsman 
        || item instanceof Magician) {
          this.playerTeam.push(item)
      }
      if (item instanceof Vampire 
        || item instanceof Undead 
        || item instanceof Daemon) {
          this.computerTeam.push(item)
      }
    });
  }

  createRandomPosition(validPosition) {
    let team, positionedTeam;
    if (validPosition[0] === 0) {
      team = this.playerTeam;
      positionedTeam = this.positionedPlayerTeam;
    } else {
      team = this.computerTeam;
      positionedTeam = this.positionedComputerTeam;
    }

    this.position.clear();

    for (let i = 0; i <= validPosition.length - 1; i += 1) {
      this.position.add(validPosition[Math.floor(1 + Math.random() * 15 - 1 + 1)]);
    }

    let positionPlayerCounter = 0;
    for (const character of team) {
      positionedTeam.push(new PositionedCharacter(character, Array.from(this.position)[positionPlayerCounter]));
      positionPlayerCounter += 1;
    }
  }

  createPlayerTeam() {
    const validPlayerPosition = [0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57];
    this.createRandomPosition(validPlayerPosition)

    return new PlayerTeam(this.positionedPlayerTeam)
  }

  createComputerTeam() {
    const validComputerPosition = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
    this.createRandomPosition(validComputerPosition)

    return new ComputerTeam(this.positionedComputerTeam)
  }
  // TODO: write your logic here
}
