import { generateTeam } from '../js/generators';
import PositionedCharacter from '../js/PositionedCharacter';
import { Bowman } from './characters/Bowman';
import { Daemon } from './characters/Daemon';
import { Magician } from './characters/Magician';
import { Swordsman } from './characters/Swordsman';
import { Undead } from './characters/Undead';
import { Vampire } from './characters/Vampire';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.gamePlay.drawUi('prairie');
    
    let players = [];

    // definition player Team
    const playerTypes = [Bowman, Swordsman, Magician]
    const playerTeam = generateTeam(playerTypes, 4, 3)
    // generated player position number
    const position = new Set();

    const validPlayerPosition = [0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57]
    let positionPlayerCounter = 0;
    for (let i = 0; i <= validPlayerPosition.length - 1; i++) {
      position.add(validPlayerPosition[Math.floor(1 + Math.random() * 15 - 1 + 1)])
    }
    // added player Team
    for (const character of playerTeam.characters) {
      players.push(new PositionedCharacter(character, Array.from(position)[positionPlayerCounter]))
      positionPlayerCounter += 1
    }

    // definition computer Team
    const computerTypes = [Vampire, Undead, Daemon]
    const computerTeam = generateTeam(computerTypes, 4, 3)
    // generated computer position number
    let positionComputerCounter = 0;
    const validComputerPosition = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63]
    position.clear()
    for (let i = 0; i <= validComputerPosition.length - 1; i++) {
      position.add(validComputerPosition[Math.floor(1 + Math.random() * 15 - 1 + 1)])
    }
    // added computer Team
    for (const character of computerTeam.characters) {
      players.push(new PositionedCharacter(character, Array.from(position)[positionComputerCounter]))
      positionComputerCounter += 1
    }

    // rendering players Team
    this.gamePlay.redrawPositions(players)
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
