export default class PlayerTeam {
  constructor(characters) {
    this.characters = characters;

    this.activePlayer = null;

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

  findHero(index) {
    return this.characters.find((item) => item.position === index);
  }

  activateHero(index) {
    this.activePlayer = this.findHero(index);
    this.activePlayer.character.areaOfMovement = this.calculationAreaOfMovement(this.activePlayer);
    this.activePlayer.character.attackRadius = this.calculationAttackRadius(this.activePlayer);
    return this.activePlayer;
  }

  calculationAreaOfMovement(activePlayer) {
    let x; let
      y = 0;
    this.fd.forEach((item) => {
      if (item.includes(activePlayer.position)) {
        x = item.findIndex((num) => num === activePlayer.position);
        y = this.fd.findIndex((elem) => elem === item);
        if (activePlayer.character.type === 'magician') {
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
        if (activePlayer.character.type === 'bowman') {
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
        if (activePlayer.character.type === 'swordsman') {
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

  calculationAttackRadius(activePlayer) {
    let x; let
      y = 0;
    this.fd.forEach((item) => {
      if (item.includes(activePlayer.position)) {
        x = item.findIndex((num) => num === activePlayer.position);
        y = this.fd.findIndex((elem) => elem === item);
        if (activePlayer.character.type === 'swordsman') {
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
        if (activePlayer.character.type === 'bowman') {
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
        if (activePlayer.character.type === 'magician') {
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
