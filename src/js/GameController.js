import { generateTeam } from './generators';
import cursors from './cursors';
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

    this.playerTeam = generateTeam([Bowman, Swordsman, Magician], 4, 3).createTeam();
    this.computerTeam = generateTeam([Vampire, Undead, Daemon], 4, 3).createTeam();
    this.players = [];
    this.activePlayer = null;
    this.heroTarget = null;
    this.villainTarget = null;
    this.target = null;
    this.turn = 'player';
    this.onCellEnter = this.onCellEnter.bind(this);
    this.onCellLeave = this.onCellLeave.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
  }

  init() {
    this.gamePlay.drawUi('prairie');

    for (const hero of this.playerTeam.characters) {
      this.players.push(hero);
    }
    for (const villain of this.computerTeam.characters) {
      this.players.push(villain);
    }

    this.gamePlay.redrawPositions(this.players);

    this.gamePlay.addCellEnterListener(this.onCellEnter);
    this.gamePlay.addCellLeaveListener(this.onCellLeave);
    this.gamePlay.addCellClickListener(this.onCellClick);
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    const selectedCharacterIndex = this.gamePlay.cells.findIndex((item) => item.classList.contains('selected-yellow'));

    if (this.playerTeam.findHero(index) && this.activePlayer === null) {
      this.activePlayer = this.playerTeam.activateHero(index);
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
      this.turn = 'computer';
    }

    if (this.activePlayer != null && this.gamePlay.cells[index].classList.contains('selected-red')) {
      this.heroTarget = this.computerTeam.characters.find((item) => item.position === index);
      const damage = Math.max(this.activePlayer.character.attack - this.heroTarget.character.defence, this.activePlayer.character.attack * 0.1);

      setTimeout(() => {
        this.gamePlay.showDamage(index, damage)
          .then(() => {
            this.heroTarget.character.health -= damage;

            if (this.heroTarget.character.health < 1 && this.players.findIndex((item) => item.character.health < 1) !== -1) {
              this.computerTeam.characters.splice(this.computerTeam.characters.findIndex((item) => item.character.health < 1), 1);
              this.players.splice(this.players.findIndex((item) => item.character.health < 1), 1);
              this.heroTarget = null;
            }

            this.gamePlay.redrawPositions(this.players);
          });
      }, 200);

      this.gamePlay.deselectCell(selectedCharacterIndex);
      this.turn = 'computer';
    }

    if (this.turn === 'computer') {
      this.activePlayer = this.computerTeam.activateComputer(this.playerTeam.characters);
      this.villainTarget = this.computerTeam.findEnemy(this.playerTeam.characters);

      if (this.villainTarget !== undefined && this.villainTarget !== null) {
        const computerDamage = Math.max(this.activePlayer.character.attack - this.villainTarget.character.defence, this.activePlayer.character.attack * 0.1);
        setTimeout(() => {
          this.gamePlay.showDamage(this.villainTarget.position, computerDamage)
            .then(() => {
              this.villainTarget.character.health -= computerDamage;

              if (this.villainTarget.character.health < 1 && this.players.findIndex((item) => item.character.health < 1) !== -1) {
                this.playerTeam.characters.splice(this.playerTeam.characters.findIndex((item) => item.character.health < 1), 1);
                this.players.splice(this.players.findIndex((item) => item.character.health < 1), 1);
                this.villainTarget = null;
              }

              this.gamePlay.redrawPositions(this.players);
            });
        }, 300);
      } else {
        this.activePlayer.position = this.computerTeam.randomMove(this.playerTeam.characters);
      }

      this.activePlayer = null;
      this.turn = 'player';
    }

    // TODO: react to click
  }

  onCellEnter(index) {
    this.gamePlay.setCursor(cursors.auto);

    const player = this.players.find((item) => item.position === index);
    this.target = this.computerTeam.characters.find((item) => item.position === index);

    if (player) {
      this.gamePlay.showCellTooltip(`${GameController.findShow(player)}`, index);
      this.gamePlay.setCursor(cursors.pointer);
    }
    if (!player
      && this.activePlayer != null
      && this.activePlayer.position !== index
      && this.activePlayer.character.areaOfMovement.includes(index)) {
      this.gamePlay.selectCell(index, 'green');
      this.gamePlay.setCursor(cursors.pointer);
    }
    if (this.target && this.activePlayer != null && this.activePlayer.character.attackRadius.includes(index)) {
      this.gamePlay.selectCell(index, 'red');
      this.gamePlay.setCursor(cursors.crosshair);
      this.target = null;
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

  static findShow(player) {
    const { character } = player;
    return `\u{1F396} ${character.level} \u{2694} ${character.attack} \u{1F6E1} ${character.defence} \u{2764} ${character.health}`;
  }
}
