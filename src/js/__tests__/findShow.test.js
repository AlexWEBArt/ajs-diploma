import GameController from '../GameController';

test('should a correct output of characteristics', () => {
  const check = `\u{1F396} ${3} \u{2694} ${20} \u{1F6E1} ${20} \u{2764} ${50}`;
  const Controller = new GameController();
  const player = {
    character: {
      level: 3,
      attack: 20,
      defence: 20,
      health: 50,
    },
  };

  expect(Controller.findShow(player)).toEqual(check);
});
