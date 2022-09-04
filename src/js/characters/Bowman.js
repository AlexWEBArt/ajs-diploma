import Character from '../Character';

export class Bowman extends Character {
    constructor(name) {
      super(name,'bowman');
      this.attack = 25;
      this.defence = 25;
    }
}
  