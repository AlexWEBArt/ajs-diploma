import { generateTeam } from './generators';
import cursors from './cursors';
import PositionedCharacter from './PositionedCharacter';
import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;

    this.players = [];
    this.activePlayer = null;
    this.onCellEnter = this.onCellEnter.bind(this);
    this.onCellLeave = this.onCellLeave.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
  }

  init() {
    this.gamePlay.drawUi('prairie');

    // definition player Team
    const playerTypes = [Bowman, Swordsman, Magician];
    const playerTeam = generateTeam(playerTypes, 4, 3);
    // generated player position number
    const position = new Set();

    const validPlayerPosition = [0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57];
    let positionPlayerCounter = 0;
    for (let i = 0; i <= validPlayerPosition.length - 1; i += 1) {
      position.add(validPlayerPosition[Math.floor(1 + Math.random() * 15 - 1 + 1)]);
    }
    // added player Team
    for (const character of playerTeam.characters) {
      this.players.push(new PositionedCharacter(character, Array.from(position)[positionPlayerCounter]));
      positionPlayerCounter += 1;
    }

    // definition computer Team
    const computerTypes = [Vampire, Undead, Daemon];
    const computerTeam = generateTeam(computerTypes, 4, 3);
    // generated computer position number
    let positionComputerCounter = 0;
    const validComputerPosition = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
    position.clear();
    for (let i = 0; i <= validComputerPosition.length - 1; i += 1) {
      position.add(validComputerPosition[Math.floor(1 + Math.random() * 15 - 1 + 1)]);
    }
    // added computer Team
    for (const hero of computerTeam.characters) {
      this.players.push(new PositionedCharacter(hero, Array.from(position)[positionComputerCounter]));
      positionComputerCounter += 1;
    }

    // rendering players Team
    this.gamePlay.redrawPositions(this.players);

    this.gamePlay.addCellEnterListener(this.onCellEnter);
    this.gamePlay.addCellLeaveListener(this.onCellLeave);
    this.gamePlay.addCellClickListener(this.onCellClick);
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    const player = this.players.find(
      (item) => item.position === index 
      && (item.character instanceof Bowman 
        || item.character instanceof Swordsman 
        || item.character instanceof Magician)
    );
    
    const selectedCharacterIndex = this.gamePlay.cells.findIndex(item => item.classList.contains('selected-yellow'));
    
    if (player && this.activePlayer === null) {
      this.activePlayer = player;
      this.gamePlay.selectCell(this.activePlayer.position);
      this.calculationAreaOfMovement(this.activePlayer.position);
      this.calculationAttackRadius(this.activePlayer.position);
    } 
    // else {
    //   // GamePlay.showError('Это не твой игрок');
    // }
    if (selectedCharacterIndex === index) {
      this.gamePlay.deselectCell(selectedCharacterIndex);
      this.activePlayer = null;
    }
    if (this.activePlayer != null && this.gamePlay.cells[index].classList.contains('selected-green')) {
        this.activePlayer.position = index;
        this.gamePlay.redrawPositions(this.players);
        // this.movingCharacter(index, selectedCharacterIndex);
        this.gamePlay.deselectCell(selectedCharacterIndex);
        this.activePlayer = null;
    }
    
    if (this.activePlayer != null && this.gamePlay.cells[index].classList.contains('selected-red')) {
      const enemy = this.players.find((item) => item.position === index);
      const damage = Math.max(this.activePlayer.character.attack - enemy.character.defence, this.activePlayer.character.attack * 0.1);
      
      this.gamePlay.showDamage(index, damage)
        .then(() => {
          enemy.character.health -= damage;
          this.gamePlay.redrawPositions(this.players)
        });
    }



    // if (event.currentTarget === notallowed) {
    //   this.gamePlay.setCursor(cursors.notallowed);
    //   GamePlay.showError('Недопустимый ход');
    // }
    // TODO: react to click
  }

  onCellEnter(index) {
    this.gamePlay.setCursor(cursors.auto);
    
    const player = this.players.find((item) => item.position === index);
    const enemy = this.players.find((item) => item.position === index 
      && (item.character instanceof Vampire 
        || item.character instanceof Undead 
        || item.character instanceof Daemon)
    );
    
    if (player) {
      this.gamePlay.showCellTooltip(`${this.findShow(player)}`, index);
      this.gamePlay.setCursor(cursors.pointer);
    }
    if (!player && !enemy
      && this.activePlayer != null 
      && this.activePlayer.position !== index
      && this.activePlayer.character.areaOfMovement.includes(index)) {
        this.gamePlay.selectCell(index, 'green');
        this.gamePlay.setCursor(cursors.pointer);
    } 
    if (enemy && this.activePlayer != null && this.activePlayer.character.attackRadius.includes(index)) {
      this.gamePlay.selectCell(index, 'red');
      this.gamePlay.setCursor(cursors.crosshair);
    }
    if (this.activePlayer != null && !this.activePlayer.character.areaOfMovement.includes(index) 
      && !this.activePlayer.character.attackRadius.includes(index)) {
        this.gamePlay.setCursor(cursors.notallowed);
        // GamePlay.showError('Недопустимый ход');
    }

    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    const player = this.players.find((item) => item.position === index);
    if (player) {
      this.gamePlay.hideCellTooltip(index);
    }
    if (this.gamePlay.cells[index].classList.contains('selected-green')) {
      this.gamePlay.deselectCell(index);
    }
    if (this.gamePlay.cells[index].classList.contains('selected-red')) {
      this.gamePlay.deselectCell(index);
    }
    // TODO: react to mouse leave
  }

  findShow(player) {
    const { character } = player;
    return `\u{1F396} ${character.level} \u{2694} ${character.attack} \u{1F6E1} ${character.defence} \u{2764} ${character.health}`;
  }

  calculationAreaOfMovement(index) {
    const borderField = [0, 1, 2, 3, 4, 5, 6, 7, 8, 15, 16, 23, 24, 31, 32, 39, 40, 47, 48, 55, 56, 57, 58, 59, 60, 61, 62, 63]
    const characterTile = Array.from(this.gamePlay.cells)[index];
    if (this.activePlayer.character instanceof Bowman) {
      this.activePlayer.character.areaOfMovement = [
        index - 1, index - 2, index - 18, index - 16, 
        index - 14, index - 9, index - 8, index - 7, 
        index + 1, index + 2, index + 18, index + 16, 
        index + 14, index + 9, index + 8, index + 7
      ]
    }
    if (this.activePlayer.character instanceof Swordsman) {
      this.activePlayer.character.areaOfMovement = [
        index - 1, index - 2, index - 3, index - 4, index - 9,  index - 18,
        index - 27, index - 36, index - 32, index - 24, index - 16, index - 8,
        index - 7, index - 14, index - 21, index - 28, index + 1, index + 2, 
        index + 3, index + 4, index + 9, index + 18, index + 27, index + 36, 
        index + 8, index + 16, index + 24, index + 32, index + 7, index + 14,
        index + 21, index + 28
      ]
    }
    if (this.activePlayer.character instanceof Magician) {
      this.activePlayer.character.areaOfMovement = [
        index - 1, index - 9, index - 8, 
        index - 7, index + 1, index + 9, 
        index + 8, index + 7
      ]
    }
  }

  calculationAttackRadius(index) {
    if (this.activePlayer.character instanceof Bowman) {
      this.activePlayer.character.attackRadius = [
        index - 1, index - 2, index - 6, index - 7, index - 8, index - 9,
        index - 10, index - 14, index - 15, index - 16, index - 17, index - 18,
        index + 1, index + 2, index + 6, index + 7, index + 8, index + 9,
        index + 10, index + 14, index + 15, index + 16, index + 17, index + 18,
      ]
    }
    if (this.activePlayer.character instanceof Swordsman) {
      this.activePlayer.character.attackRadius = [
        index - 1, index - 9, index - 8, 
        index - 7, index + 1, index + 9, 
        index + 8, index + 7
      ]
    }
    if (this.activePlayer.character instanceof Magician) {
      this.activePlayer.character.attackRadius = [
        index - 1, index - 2, index - 3, index - 4, 
        index - 5, index - 6, index - 7, index - 8, index - 9, index - 10, index - 11, index - 12, index - 13, 
        index - 14, index - 15, index - 16, index - 17, index - 18, index - 19, index - 20, index - 21, index - 22, 
        index - 23, index - 24, index - 25, index - 26, index - 27, index - 28, index - 29, index - 30, index - 31,
        index - 32, index - 33, index - 34, index - 35, index - 36, index - 37, index - 38, index - 39, index - 40,
        index + 1, index + 2, index + 3, index + 4, 
        index + 5, index + 6, index + 7, index + 8, index + 9, index + 10, index + 11, index + 12, index + 13, 
        index + 14, index + 15, index + 16, index + 17, index + 18, index + 19, index + 20, index + 21, index + 22, 
        index + 23, index + 24, index + 25, index + 26, index + 27, index + 28, index + 29, index + 30, index + 31,
        index + 32, index + 33, index + 34, index + 35, index + 36, index + 37, index + 38, index + 39, index + 40,
      ]
    }
  }

  movingCharacter(pointIndex, characterIndex) {
    // const positionCharacter = character.position;
    const tileCharacter = Array.from(this.gamePlay.cells)[characterIndex];
    const movingPoint = Array.from(this.gamePlay.cells)[pointIndex];
    // if (tileCharacter.parentNode.classList.contains('selected')) {
    
      movingPoint.innerHTML = tileCharacter.innerHTML;
      tileCharacter.innerHTML = '';

      
    // }
    


  }
}
