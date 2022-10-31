import Undead from '../characters/Undead';
import Vampire from '../characters/Vampire';
import Daemon from '../characters/Daemon';

export default class ComputerTeam {
  constructor(characters) {
    this.characters = characters;
    this.activeComputer = null;
    this.enemies = null;

    this.areaOfMovement = null;
    this.attackRadius = null;

    this.fd = [
      [0, 1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20, 21, 22, 23],
      [24, 25, 26, 27, 28, 29, 30, 31],
      [32, 33, 34, 35, 36, 37, 38, 39],
      [40, 41, 42, 43, 44, 45, 46, 47],
      [48, 49, 50, 51, 52, 53, 54, 55],
      [56, 57, 58, 59, 60, 61, 62, 63],
    ];
  }

  findVillain() {
    return this.characters.find((item) => item.character.health > 0);
  }

  activateComputer() {
    this.activeComputer = this.findVillain();
    this.activeComputer.character.areaOfMovement = this.calculationAreaOfMovement(this.activeComputer);
    this.activeComputer.character.attackRadius = this.calculationAttackRadius(this.activeComputer);
    return this.activeComputer;
  }

  findEnemy(enemies) {
    return enemies.find((item) => this.activeComputer.character.attackRadius.includes(item.position));
  }

  randomMove(enemies) {
    const characterPosition = [];
    enemies.forEach((index) => characterPosition.push(index.position));
    this.characters.forEach((index) => characterPosition.push(index.position));

    const availableMove = this.activeComputer.character.areaOfMovement
      .filter(Number).filter((item) => !characterPosition.includes(item));
    const randomPosition = Math.floor(Math.random() * availableMove.length);
    return availableMove[randomPosition];
  }

  calculationAreaOfMovement(activeComputer) {
    let x; let
      y = 0;
    this.fd.forEach((item) => {
      if (item.includes(activeComputer.position)) {
        x = item.findIndex((num) => num === activeComputer.position);
        y = this.fd.findIndex((elem) => elem === item);
        if (activeComputer.character instanceof Daemon) {
          if (y === 0) {
            this.areaOfMovement = [
              this.fd[y][x - 1], this.fd[y][x + 1],
              this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1],
            ];
          } else if (y === 7) {
            this.areaOfMovement = [
              this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1],
              this.fd[y][x - 1], this.fd[y][x + 1],
            ];
          } else {
            this.areaOfMovement = [
              this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1],
              this.fd[y][x - 1], this.fd[y][x + 1],
              this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1],
            ];
          }
        }
        if (activeComputer.character instanceof Vampire) {
          if (y === 0) {
            this.areaOfMovement = [
              this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2],
              this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1],
              this.fd[y + 2][x - 2], this.fd[y + 2][x], this.fd[y + 2][x + 2],
            ];
          } else if (y === 1) {
            this.areaOfMovement = [
              this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1],
              this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2],
              this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1],
              this.fd[y + 2][x - 2], this.fd[y + 2][x], this.fd[y + 2][x + 2],
            ];
          } else if (y === 6) {
            this.areaOfMovement = [
              this.fd[y - 2][x - 2], this.fd[y - 2][x], this.fd[y - 2][x + 2],
              this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1],
              this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2],
              this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1],
            ];
          } else if (y === 7) {
            this.areaOfMovement = [
              this.fd[y - 2][x - 2], this.fd[y - 2][x], this.fd[y - 2][x + 2],
              this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1],
              this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2],
            ];
          } else {
            this.areaOfMovement = [
              this.fd[y - 2][x - 2], this.fd[y - 2][x], this.fd[y - 2][x + 2],
              this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1],
              this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2],
              this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1],
              this.fd[y + 2][x - 2], this.fd[y + 2][x], this.fd[y + 2][x + 2],
            ];
          }
        }
        if (activeComputer.character instanceof Undead) {
          if (y === 0) {
            this.areaOfMovement = [
              this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
              this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1],
              this.fd[y + 2][x - 2], this.fd[y + 2][x], this.fd[y + 2][x + 2],
              this.fd[y + 3][x - 3], this.fd[y + 3][x], this.fd[y + 3][x + 3],
              this.fd[y + 4][x - 4], this.fd[y + 4][x], this.fd[y + 4][x + 4],
            ];
          } else if (y === 1) {
            this.areaOfMovement = [
              this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1],
              this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
              this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1],
              this.fd[y + 2][x - 2], this.fd[y + 2][x], this.fd[y + 2][x + 2],
              this.fd[y + 3][x - 3], this.fd[y + 3][x], this.fd[y + 3][x + 3],
              this.fd[y + 4][x - 4], this.fd[y + 4][x], this.fd[y + 4][x + 4],
            ];
          } else if (y === 2) {
            this.areaOfMovement = [
              this.fd[y - 2][x - 2], this.fd[y - 2][x], this.fd[y - 2][x + 2],
              this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1],
              this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
              this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1],
              this.fd[y + 2][x - 2], this.fd[y + 2][x], this.fd[y + 2][x + 2],
              this.fd[y + 3][x - 3], this.fd[y + 3][x], this.fd[y + 3][x + 3],
              this.fd[y + 4][x - 4], this.fd[y + 4][x], this.fd[y + 4][x + 4],
            ];
          } else if (y === 3) {
            this.areaOfMovement = [
              this.fd[y - 3][x - 3], this.fd[y - 3][x], this.fd[y - 3][x + 3],
              this.fd[y - 2][x - 2], this.fd[y - 2][x], this.fd[y - 2][x + 2],
              this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1],
              this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
              this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1],
              this.fd[y + 2][x - 2], this.fd[y + 2][x], this.fd[y + 2][x + 2],
              this.fd[y + 3][x - 3], this.fd[y + 3][x], this.fd[y + 3][x + 3],
              this.fd[y + 4][x - 4], this.fd[y + 4][x], this.fd[y + 4][x + 4],
            ];
          } else if (y === 4) {
            this.areaOfMovement = [
              this.fd[y - 4][x - 4], this.fd[y - 4][x], this.fd[y - 4][x + 4],
              this.fd[y - 3][x - 3], this.fd[y - 3][x], this.fd[y - 3][x + 3],
              this.fd[y - 2][x - 2], this.fd[y - 2][x], this.fd[y - 2][x + 2],
              this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1],
              this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
              this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1],
              this.fd[y + 2][x - 2], this.fd[y + 2][x], this.fd[y + 2][x + 2],
              this.fd[y + 3][x - 3], this.fd[y + 3][x], this.fd[y + 3][x + 3],
            ];
          } else if (y === 5) {
            this.areaOfMovement = [
              this.fd[y - 4][x - 4], this.fd[y - 4][x], this.fd[y - 4][x + 4],
              this.fd[y - 3][x - 3], this.fd[y - 3][x], this.fd[y - 3][x + 3],
              this.fd[y - 2][x - 2], this.fd[y - 2][x], this.fd[y - 2][x + 2],
              this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1],
              this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
              this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1],
              this.fd[y + 2][x - 2], this.fd[y + 2][x], this.fd[y + 2][x + 2],
            ];
          } else if (y === 6) {
            this.areaOfMovement = [
              this.fd[y - 4][x - 4], this.fd[y - 4][x], this.fd[y - 4][x + 4],
              this.fd[y - 3][x - 3], this.fd[y - 3][x], this.fd[y - 3][x + 3],
              this.fd[y - 2][x - 2], this.fd[y - 2][x], this.fd[y - 2][x + 2],
              this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1],
              this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
              this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1],
            ];
          } else if (y === 7) {
            this.areaOfMovement = [
              this.fd[y - 4][x - 4], this.fd[y - 4][x], this.fd[y - 4][x + 4],
              this.fd[y - 3][x - 3], this.fd[y - 3][x], this.fd[y - 3][x + 3],
              this.fd[y - 2][x - 2], this.fd[y - 2][x], this.fd[y - 2][x + 2],
              this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1],
              this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
            ];
          }
          // this.areaOfMovement = [
          //     this.fd[y - 4][x - 4], this.fd[y - 4][x], this.fd[y - 4][x + 4],
          //     this.fd[y - 3][x - 3], this.fd[y - 3][x], this.fd[y - 3][x + 3],
          //     this.fd[y - 2][x - 2], this.fd[y - 2][x], this.fd[y - 2][x + 2],
          //     this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1],
          //     this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
          //     this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1],
          //     this.fd[y + 2][x - 2], this.fd[y + 2][x], this.fd[y + 2][x + 2],
          //     this.fd[y + 3][x - 3], this.fd[y + 3][x], this.fd[y + 3][x + 3],
          //     this.fd[y + 4][x - 4], this.fd[y + 4][x], this.fd[y + 4][x + 4],
          // ]
        }
      }
    });

    return this.areaOfMovement;
  }

  calculationAttackRadius(activeComputer) {
    let x; let
      y = 0;
    this.fd.forEach((item) => {
      if (item.includes(activeComputer.position)) {
        x = item.findIndex((num) => num === activeComputer.position);
        y = this.fd.findIndex((elem) => elem === item);
        if (activeComputer.character instanceof Undead) {
          if (y === 0) {
            this.attackRadius = [
              this.fd[y][x - 1], this.fd[y][x + 1],
              this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1],
            ];
          } else if (y === 7) {
            this.attackRadius = [
              this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1],
              this.fd[y][x - 1], this.fd[y][x + 1],
            ];
          } else {
            this.attackRadius = [
              this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1],
              this.fd[y][x - 1], this.fd[y][x + 1],
              this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1],
            ];
          }
        }
        if (activeComputer.character instanceof Vampire) {
          if (y === 0) {
            this.attackRadius = [
              this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2],
              this.fd[y + 1][x - 2], this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1], this.fd[y + 1][x + 2],
              this.fd[y + 2][x - 2], this.fd[y + 2][x - 1], this.fd[y + 2][x], this.fd[y + 2][x + 1], this.fd[y + 2][x + 2],
            ];
          } else if (y === 1) {
            this.attackRadius = [
              this.fd[y - 1][x - 2], this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1], this.fd[y - 1][x + 2],
              this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2],
              this.fd[y + 1][x - 2], this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1], this.fd[y + 1][x + 2],
              this.fd[y + 2][x - 2], this.fd[y + 2][x - 1], this.fd[y + 2][x], this.fd[y + 2][x + 1], this.fd[y + 2][x + 2],
            ];
          } else if (y === 6) {
            this.attackRadius = [
              this.fd[y - 2][x - 2], this.fd[y - 2][x - 1], this.fd[y - 2][x], this.fd[y - 2][x + 1], this.fd[y - 2][x + 2],
              this.fd[y - 1][x - 2], this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1], this.fd[y - 1][x + 2],
              this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2],
              this.fd[y + 1][x - 2], this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1], this.fd[y + 1][x + 2],
            ];
          } else if (y === 7) {
            this.attackRadius = [
              this.fd[y - 2][x - 2], this.fd[y - 2][x - 1], this.fd[y - 2][x], this.fd[y - 2][x + 1], this.fd[y - 2][x + 2],
              this.fd[y - 1][x - 2], this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1], this.fd[y - 1][x + 2],
              this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2],
            ];
          } else {
            this.attackRadius = [
              this.fd[y - 2][x - 2], this.fd[y - 2][x - 1], this.fd[y - 2][x], this.fd[y - 2][x + 1], this.fd[y - 2][x + 2],
              this.fd[y - 1][x - 2], this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1], this.fd[y - 1][x + 2],
              this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2],
              this.fd[y + 1][x - 2], this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1], this.fd[y + 1][x + 2],
              this.fd[y + 2][x - 2], this.fd[y + 2][x - 1], this.fd[y + 2][x], this.fd[y + 2][x + 1], this.fd[y + 2][x + 2],
            ];
          }
        }
        if (activeComputer.character instanceof Daemon) {
          // this.areaOfMovement = [
          //     this.fd[y - 4][x - 4], this.fd[y - 4][x - 3], this.fd[y - 4][x - 2], this.fd[y - 4][x - 1], this.fd[y - 4][x], this.fd[y - 4][x + 1], this.fd[y - 4][x + 2], this.fd[y - 4][x + 3], this.fd[y - 4][x + 4],
          //     this.fd[y - 3][x - 4], this.fd[y - 3][x - 3], this.fd[y - 3][x - 2], this.fd[y - 3][x - 1], this.fd[y - 3][x], this.fd[y - 3][x + 1], this.fd[y - 3][x + 2], this.fd[y - 3][x + 3], this.fd[y - 3][x + 4],
          //     this.fd[y - 2][x - 4], this.fd[y - 2][x - 3], this.fd[y - 2][x - 2], this.fd[y - 2][x - 1], this.fd[y - 2][x], this.fd[y - 2][x + 1], this.fd[y - 2][x + 2], this.fd[y - 2][x + 3], this.fd[y - 2][x + 4],
          //     this.fd[y - 1][x - 4], this.fd[y - 1][x - 3], this.fd[y - 1][x - 2], this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1], this.fd[y - 1][x + 2], this.fd[y - 1][x + 3], this.fd[y - 1][x + 4],
          //     this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
          //     this.fd[y + 1][x - 4], this.fd[y + 1][x - 3], this.fd[y + 1][x - 2], this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1], this.fd[y + 1][x + 2], this.fd[y + 1][x + 3], this.fd[y + 1][x + 4],
          //     this.fd[y + 2][x - 4], this.fd[y + 2][x - 3], this.fd[y + 2][x - 2], this.fd[y + 2][x - 1], this.fd[y + 2][x], this.fd[y + 2][x + 1], this.fd[y + 2][x + 2], this.fd[y + 2][x + 3], this.fd[y + 2][x + 4],
          //     this.fd[y + 3][x - 4], this.fd[y + 3][x - 3], this.fd[y + 3][x - 2], this.fd[y + 3][x - 1], this.fd[y + 3][x], this.fd[y + 3][x + 1], this.fd[y + 3][x + 2], this.fd[y + 3][x + 3], this.fd[y + 3][x + 4],
          //     this.fd[y + 4][x - 4], this.fd[y + 4][x - 3], this.fd[y + 4][x - 2], this.fd[y + 4][x - 1], this.fd[y + 4][x], this.fd[y + 4][x + 1], this.fd[y + 4][x + 2], this.fd[y + 4][x + 3], this.fd[y + 4][x + 4],
          // ]
          if (y === 0) {
            this.attackRadius = [
              this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
              this.fd[y + 1][x - 4], this.fd[y + 1][x - 3], this.fd[y + 1][x - 2], this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1], this.fd[y + 1][x + 2], this.fd[y + 1][x + 3], this.fd[y + 1][x + 4],
              this.fd[y + 2][x - 4], this.fd[y + 2][x - 3], this.fd[y + 2][x - 2], this.fd[y + 2][x - 1], this.fd[y + 2][x], this.fd[y + 2][x + 1], this.fd[y + 2][x + 2], this.fd[y + 2][x + 3], this.fd[y + 2][x + 4],
              this.fd[y + 3][x - 4], this.fd[y + 3][x - 3], this.fd[y + 3][x - 2], this.fd[y + 3][x - 1], this.fd[y + 3][x], this.fd[y + 3][x + 1], this.fd[y + 3][x + 2], this.fd[y + 3][x + 3], this.fd[y + 3][x + 4],
              this.fd[y + 4][x - 4], this.fd[y + 4][x - 3], this.fd[y + 4][x - 2], this.fd[y + 4][x - 1], this.fd[y + 4][x], this.fd[y + 4][x + 1], this.fd[y + 4][x + 2], this.fd[y + 4][x + 3], this.fd[y + 4][x + 4],
            ];
          } else if (y === 1) {
            this.attackRadius = [
              this.fd[y - 1][x - 4], this.fd[y - 1][x - 3], this.fd[y - 1][x - 2], this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1], this.fd[y - 1][x + 2], this.fd[y - 1][x + 3], this.fd[y - 1][x + 4],
              this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
              this.fd[y + 1][x - 4], this.fd[y + 1][x - 3], this.fd[y + 1][x - 2], this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1], this.fd[y + 1][x + 2], this.fd[y + 1][x + 3], this.fd[y + 1][x + 4],
              this.fd[y + 2][x - 4], this.fd[y + 2][x - 3], this.fd[y + 2][x - 2], this.fd[y + 2][x - 1], this.fd[y + 2][x], this.fd[y + 2][x + 1], this.fd[y + 2][x + 2], this.fd[y + 2][x + 3], this.fd[y + 2][x + 4],
              this.fd[y + 3][x - 4], this.fd[y + 3][x - 3], this.fd[y + 3][x - 2], this.fd[y + 3][x - 1], this.fd[y + 3][x], this.fd[y + 3][x + 1], this.fd[y + 3][x + 2], this.fd[y + 3][x + 3], this.fd[y + 3][x + 4],
              this.fd[y + 4][x - 4], this.fd[y + 4][x - 3], this.fd[y + 4][x - 2], this.fd[y + 4][x - 1], this.fd[y + 4][x], this.fd[y + 4][x + 1], this.fd[y + 4][x + 2], this.fd[y + 4][x + 3], this.fd[y + 4][x + 4],
            ];
          } else if (y === 2) {
            this.attackRadius = [
              this.fd[y - 2][x - 4], this.fd[y - 2][x - 3], this.fd[y - 2][x - 2], this.fd[y - 2][x - 1], this.fd[y - 2][x], this.fd[y - 2][x + 1], this.fd[y - 2][x + 2], this.fd[y - 2][x + 3], this.fd[y - 2][x + 4],
              this.fd[y - 1][x - 4], this.fd[y - 1][x - 3], this.fd[y - 1][x - 2], this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1], this.fd[y - 1][x + 2], this.fd[y - 1][x + 3], this.fd[y - 1][x + 4],
              this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
              this.fd[y + 1][x - 4], this.fd[y + 1][x - 3], this.fd[y + 1][x - 2], this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1], this.fd[y + 1][x + 2], this.fd[y + 1][x + 3], this.fd[y + 1][x + 4],
              this.fd[y + 2][x - 4], this.fd[y + 2][x - 3], this.fd[y + 2][x - 2], this.fd[y + 2][x - 1], this.fd[y + 2][x], this.fd[y + 2][x + 1], this.fd[y + 2][x + 2], this.fd[y + 2][x + 3], this.fd[y + 2][x + 4],
              this.fd[y + 3][x - 4], this.fd[y + 3][x - 3], this.fd[y + 3][x - 2], this.fd[y + 3][x - 1], this.fd[y + 3][x], this.fd[y + 3][x + 1], this.fd[y + 3][x + 2], this.fd[y + 3][x + 3], this.fd[y + 3][x + 4],
              this.fd[y + 4][x - 4], this.fd[y + 4][x - 3], this.fd[y + 4][x - 2], this.fd[y + 4][x - 1], this.fd[y + 4][x], this.fd[y + 4][x + 1], this.fd[y + 4][x + 2], this.fd[y + 4][x + 3], this.fd[y + 4][x + 4],
            ];
          } else if (y === 3) {
            this.attackRadius = [
              this.fd[y - 3][x - 4], this.fd[y - 3][x - 3], this.fd[y - 3][x - 2], this.fd[y - 3][x - 1], this.fd[y - 3][x], this.fd[y - 3][x + 1], this.fd[y - 3][x + 2], this.fd[y - 3][x + 3], this.fd[y - 3][x + 4],
              this.fd[y - 2][x - 4], this.fd[y - 2][x - 3], this.fd[y - 2][x - 2], this.fd[y - 2][x - 1], this.fd[y - 2][x], this.fd[y - 2][x + 1], this.fd[y - 2][x + 2], this.fd[y - 2][x + 3], this.fd[y - 2][x + 4],
              this.fd[y - 1][x - 4], this.fd[y - 1][x - 3], this.fd[y - 1][x - 2], this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1], this.fd[y - 1][x + 2], this.fd[y - 1][x + 3], this.fd[y - 1][x + 4],
              this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
              this.fd[y + 1][x - 4], this.fd[y + 1][x - 3], this.fd[y + 1][x - 2], this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1], this.fd[y + 1][x + 2], this.fd[y + 1][x + 3], this.fd[y + 1][x + 4],
              this.fd[y + 2][x - 4], this.fd[y + 2][x - 3], this.fd[y + 2][x - 2], this.fd[y + 2][x - 1], this.fd[y + 2][x], this.fd[y + 2][x + 1], this.fd[y + 2][x + 2], this.fd[y + 2][x + 3], this.fd[y + 2][x + 4],
              this.fd[y + 3][x - 4], this.fd[y + 3][x - 3], this.fd[y + 3][x - 2], this.fd[y + 3][x - 1], this.fd[y + 3][x], this.fd[y + 3][x + 1], this.fd[y + 3][x + 2], this.fd[y + 3][x + 3], this.fd[y + 3][x + 4],
              this.fd[y + 4][x - 4], this.fd[y + 4][x - 3], this.fd[y + 4][x - 2], this.fd[y + 4][x - 1], this.fd[y + 4][x], this.fd[y + 4][x + 1], this.fd[y + 4][x + 2], this.fd[y + 4][x + 3], this.fd[y + 4][x + 4],
            ];
          } else if (y === 4) {
            this.attackRadius = [
              this.fd[y - 4][x - 4], this.fd[y - 4][x - 3], this.fd[y - 4][x - 2], this.fd[y - 4][x - 1], this.fd[y - 4][x], this.fd[y - 4][x + 1], this.fd[y - 4][x + 2], this.fd[y - 4][x + 3], this.fd[y - 4][x + 4],
              this.fd[y - 3][x - 4], this.fd[y - 3][x - 3], this.fd[y - 3][x - 2], this.fd[y - 3][x - 1], this.fd[y - 3][x], this.fd[y - 3][x + 1], this.fd[y - 3][x + 2], this.fd[y - 3][x + 3], this.fd[y - 3][x + 4],
              this.fd[y - 2][x - 4], this.fd[y - 2][x - 3], this.fd[y - 2][x - 2], this.fd[y - 2][x - 1], this.fd[y - 2][x], this.fd[y - 2][x + 1], this.fd[y - 2][x + 2], this.fd[y - 2][x + 3], this.fd[y - 2][x + 4],
              this.fd[y - 1][x - 4], this.fd[y - 1][x - 3], this.fd[y - 1][x - 2], this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1], this.fd[y - 1][x + 2], this.fd[y - 1][x + 3], this.fd[y - 1][x + 4],
              this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
              this.fd[y + 1][x - 4], this.fd[y + 1][x - 3], this.fd[y + 1][x - 2], this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1], this.fd[y + 1][x + 2], this.fd[y + 1][x + 3], this.fd[y + 1][x + 4],
              this.fd[y + 2][x - 4], this.fd[y + 2][x - 3], this.fd[y + 2][x - 2], this.fd[y + 2][x - 1], this.fd[y + 2][x], this.fd[y + 2][x + 1], this.fd[y + 2][x + 2], this.fd[y + 2][x + 3], this.fd[y + 2][x + 4],
              this.fd[y + 3][x - 4], this.fd[y + 3][x - 3], this.fd[y + 3][x - 2], this.fd[y + 3][x - 1], this.fd[y + 3][x], this.fd[y + 3][x + 1], this.fd[y + 3][x + 2], this.fd[y + 3][x + 3], this.fd[y + 3][x + 4],
            ];
          } else if (y === 5) {
            this.attackRadius = [
              this.fd[y - 4][x - 4], this.fd[y - 4][x - 3], this.fd[y - 4][x - 2], this.fd[y - 4][x - 1], this.fd[y - 4][x], this.fd[y - 4][x + 1], this.fd[y - 4][x + 2], this.fd[y - 4][x + 3], this.fd[y - 4][x + 4],
              this.fd[y - 3][x - 4], this.fd[y - 3][x - 3], this.fd[y - 3][x - 2], this.fd[y - 3][x - 1], this.fd[y - 3][x], this.fd[y - 3][x + 1], this.fd[y - 3][x + 2], this.fd[y - 3][x + 3], this.fd[y - 3][x + 4],
              this.fd[y - 2][x - 4], this.fd[y - 2][x - 3], this.fd[y - 2][x - 2], this.fd[y - 2][x - 1], this.fd[y - 2][x], this.fd[y - 2][x + 1], this.fd[y - 2][x + 2], this.fd[y - 2][x + 3], this.fd[y - 2][x + 4],
              this.fd[y - 1][x - 4], this.fd[y - 1][x - 3], this.fd[y - 1][x - 2], this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1], this.fd[y - 1][x + 2], this.fd[y - 1][x + 3], this.fd[y - 1][x + 4],
              this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
              this.fd[y + 1][x - 4], this.fd[y + 1][x - 3], this.fd[y + 1][x - 2], this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1], this.fd[y + 1][x + 2], this.fd[y + 1][x + 3], this.fd[y + 1][x + 4],
              this.fd[y + 2][x - 4], this.fd[y + 2][x - 3], this.fd[y + 2][x - 2], this.fd[y + 2][x - 1], this.fd[y + 2][x], this.fd[y + 2][x + 1], this.fd[y + 2][x + 2], this.fd[y + 2][x + 3], this.fd[y + 2][x + 4],
            ];
          } else if (y === 6) {
            this.attackRadius = [
              this.fd[y - 4][x - 4], this.fd[y - 4][x - 3], this.fd[y - 4][x - 2], this.fd[y - 4][x - 1], this.fd[y - 4][x], this.fd[y - 4][x + 1], this.fd[y - 4][x + 2], this.fd[y - 4][x + 3], this.fd[y - 4][x + 4],
              this.fd[y - 3][x - 4], this.fd[y - 3][x - 3], this.fd[y - 3][x - 2], this.fd[y - 3][x - 1], this.fd[y - 3][x], this.fd[y - 3][x + 1], this.fd[y - 3][x + 2], this.fd[y - 3][x + 3], this.fd[y - 3][x + 4],
              this.fd[y - 2][x - 4], this.fd[y - 2][x - 3], this.fd[y - 2][x - 2], this.fd[y - 2][x - 1], this.fd[y - 2][x], this.fd[y - 2][x + 1], this.fd[y - 2][x + 2], this.fd[y - 2][x + 3], this.fd[y - 2][x + 4],
              this.fd[y - 1][x - 4], this.fd[y - 1][x - 3], this.fd[y - 1][x - 2], this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1], this.fd[y - 1][x + 2], this.fd[y - 1][x + 3], this.fd[y - 1][x + 4],
              this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
              this.fd[y + 1][x - 4], this.fd[y + 1][x - 3], this.fd[y + 1][x - 2], this.fd[y + 1][x - 1], this.fd[y + 1][x], this.fd[y + 1][x + 1], this.fd[y + 1][x + 2], this.fd[y + 1][x + 3], this.fd[y + 1][x + 4],
            ];
          } else if (y === 7) {
            this.attackRadius = [
              this.fd[y - 4][x - 4], this.fd[y - 4][x - 3], this.fd[y - 4][x - 2], this.fd[y - 4][x - 1], this.fd[y - 4][x], this.fd[y - 4][x + 1], this.fd[y - 4][x + 2], this.fd[y - 4][x + 3], this.fd[y - 4][x + 4],
              this.fd[y - 3][x - 4], this.fd[y - 3][x - 3], this.fd[y - 3][x - 2], this.fd[y - 3][x - 1], this.fd[y - 3][x], this.fd[y - 3][x + 1], this.fd[y - 3][x + 2], this.fd[y - 3][x + 3], this.fd[y - 3][x + 4],
              this.fd[y - 2][x - 4], this.fd[y - 2][x - 3], this.fd[y - 2][x - 2], this.fd[y - 2][x - 1], this.fd[y - 2][x], this.fd[y - 2][x + 1], this.fd[y - 2][x + 2], this.fd[y - 2][x + 3], this.fd[y - 2][x + 4],
              this.fd[y - 1][x - 4], this.fd[y - 1][x - 3], this.fd[y - 1][x - 2], this.fd[y - 1][x - 1], this.fd[y - 1][x], this.fd[y - 1][x + 1], this.fd[y - 1][x + 2], this.fd[y - 1][x + 3], this.fd[y - 1][x + 4],
              this.fd[y][x - 4], this.fd[y][x - 3], this.fd[y][x - 2], this.fd[y][x - 1], this.fd[y][x + 1], this.fd[y][x + 2], this.fd[y][x + 3], this.fd[y][x + 4],
            ];
          }
        }
      }
    });

    return this.attackRadius;
  }
}
