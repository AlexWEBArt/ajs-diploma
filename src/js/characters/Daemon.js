import Character from '../Character';

export class Daemon extends Character {
    constructor(name) {
      super(name, 'daemon');
      this.attack = 10;
      this.defence = 10;
    }
}
  