const { Knechtor } = require('./Knechtor.js');
const magisterLudi = new Knechtor();

it('should parse suit', () => {

  expect('W').toEqual(magisterLudi.parseSuit('5W'));
});
