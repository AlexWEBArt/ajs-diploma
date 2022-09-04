import Character from '../Character';

export class Vampire extends Character {
    constructor(name) {
      super(name, 'vampire');
      this.attack = 25;
      this.defence = 25;
    }
}