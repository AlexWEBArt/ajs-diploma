import { generateTeam } from './generators';
import cursors from './cursors';
import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import PlayerTeam from './team/PlayerTeam';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;

    this.playerTeam = generateTeam([Bowman, Swordsman, Magician], 4, 3).createPlayerTeam();;
    this.computerTeam = generateTeam([Vampire, Undead, Daemon], 4, 3).createComputerTeam();
    this.players = [];
    this.activePlayer = null;
    this.onCellEnter = this.onCellEnter.bind(this);
    this.onCellLeave = this.onCellLeave.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
  }

  init() {
    this.gamePlay.drawUi('prairie');

    for (const hero of this.playerTeam.characters) {
      this.players.push(hero)
    }
    for (const enemy of this.computerTeam.characters) {
      this.players.push(enemy)
    }

    this.gamePlay.redrawPositions(this.players);

    this.gamePlay.addCellEnterListener(this.onCellEnter);
    this.gamePlay.addCellLeaveListener(this.onCellLeave);
    this.gamePlay.addCellClickListener(this.onCellClick);
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    const selectedCharacterIndex = this.gamePlay.cells.findIndex(item => item.classList.contains('selected-yellow'));
    
    if (this.playerTeam.findHero(index) && this.activePlayer === null) {
      this.activePlayer = this.playerTeam.activateHero(index);;
      this.gamePlay.selectCell(this.activePlayer.position);
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
        this.gamePlay.deselectCell(selectedCharacterIndex);
        this.activePlayer = null;
    }
    
    if (this.activePlayer != null && this.gamePlay.cells[index].classList.contains('selected-red')) {
      const enemy = this.computerTeam.characters.find((item) => item.position === index);
      const damage = Math.max(this.activePlayer.character.attack - enemy.character.defence, this.activePlayer.character.attack * 0.1);
      
      this.gamePlay.showDamage(index, damage)
        .then(() => {
          enemy.character.health -= damage;
          this.gamePlay.redrawPositions(this.players)
        });
    }
    // TODO: react to click
  }

  onCellEnter(index) {
    this.gamePlay.setCursor(cursors.auto);
    
    const player = this.players.find(item => item.position === index);
    const enemy = this.computerTeam.characters.find(item => item.position === index);
    
    if (player) {
      this.gamePlay.showCellTooltip(`${this.findShow(player)}`, index);
      this.gamePlay.setCursor(cursors.pointer);
    }
    if (!player
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
}
