import Character from '../Character';

export class Undead extends Character {
    constructor(name) {
      super(name, 'undead');
      this.attack = 40;
      this.defence = 10;
    }
}
  