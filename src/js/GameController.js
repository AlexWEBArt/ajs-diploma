import GamePlay from './GamePlay';
import GameStateService from './GameStateService';

import PlayerTeam from './team/PlayerTeam';
import ComputerTeam from './team/ComputerTeam';

import { generateTeam } from './generators';
import cursors from './cursors';
import themes from './themes';
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
    this.startThemes = 'prairie';
    this.turn = 'player';
    this.onCellEnter = this.onCellEnter.bind(this);
    this.onCellLeave = this.onCellLeave.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
    this.onNewGameClick = this.onNewGameClick.bind(this);
    this.onSaveGameClick = this.onSaveGameClick.bind(this);
    this.onLoadGameClick = this.onLoadGameClick.bind(this);
  }

  init() {
    this.gamePlay.drawUi(this.startThemes);

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
    this.gamePlay.addNewGameListener(this.onNewGameClick);
    this.gamePlay.addSaveGameListener(this.onSaveGameClick);
    this.gamePlay.addLoadGameListener(this.onLoadGameClick);
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

    if (!this.computerTeam.characters[0]) {
      this.levelUp();
      let nextIndexThemes = Object.values(themes).findIndex((item) => item === document.querySelector('#game-container').querySelector('[data-id=board]').classList[1]) + 1;

      if (nextIndexThemes > Object.values(themes).length - 1) {
        nextIndexThemes = 0;
      }
      this.startThemes = Object.values(themes)[nextIndexThemes];
      this.gamePlay.drawUi(this.startThemes);

      this.computerTeam = generateTeam([Vampire, Undead, Daemon], 4, 3).createTeam();
      for (const villain of this.computerTeam.characters) {
        this.players.push(villain);
      }

      const position = new Set();
      // position.clear();
      for (let i = 0; i <= 16 - 1; i += 1) {
        position.add([0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57][Math.floor(1 + Math.random() * 15 - 1 + 1)]);
      }
      this.playerTeam.characters.forEach((item, i) => {
        item.position = Array.from(position)[i];
      });

      this.activePlayer = null;
      this.turn = 'player';

      this.gamePlay.redrawPositions(this.players);
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

  onNewGameClick() {
    this.gamePlay = new GamePlay();
    this.gamePlay.bindToDOM(document.querySelector('#game-container'));

    this.stateService = new GameStateService(localStorage);
    this.playerTeam = generateTeam([Bowman, Swordsman, Magician], 4, 3).createTeam();
    this.computerTeam = generateTeam([Vampire, Undead, Daemon], 4, 3).createTeam();
    this.players = [];
    this.activePlayer = null;
    this.heroTarget = null;
    this.villainTarget = null;
    this.target = null;
    this.startThemes = 'prairie';
    this.turn = 'player';

    this.init();
  }

  onLoadGameClick() {
    const loadGame = this.stateService.load();

    this.gamePlay = new GamePlay();
    this.gamePlay.bindToDOM(document.querySelector('#game-container'));

    this.stateService = loadGame.stateService;

    this.playerTeam = new PlayerTeam(loadGame.playerTeam.characters);
    this.computerTeam = new ComputerTeam(loadGame.computerTeam.characters);
    this.players = [];
    this.activePlayer = null;
    this.heroTarget = null;
    this.villainTarget = null;
    this.target = null;
    this.startThemes = loadGame.startThemes;
    this.turn = loadGame.turn;

    this.init();
  }

  onSaveGameClick() {
    const state = {
      gamePlay: this.gamePlay,
      stateService: this.stateService,
      playerTeam: this.playerTeam,
      computerTeam: this.computerTeam,
      startThemes: this.startThemes,
      turn: this.turn,
    };
    this.stateService.save(state);
  }

  levelUp() {
    this.playerTeam.characters.forEach((item) => {
      item.character.level += 1;
      item.character.health += 80;
      if (item.character.health > 100) {
        item.character.health = 100;
      }
      item.character.attack = Math.max(item.character.attack, (item.character.attack * (80 + item.character.health)) / 100);
    });
  }

  static findShow(player) {
    const { character } = player;
    return `\u{1F396} ${character.level} \u{2694} ${character.attack} \u{1F6E1} ${character.defence} \u{2764} ${character.health}`;
  }
}
