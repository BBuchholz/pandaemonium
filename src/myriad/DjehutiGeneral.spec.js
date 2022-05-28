const { Djehuti } = require('./Djehuti.js');
const thothMagus = new Djehuti();

it('should generate names', () => {

  let adverbs = ['test1']
  let adjectives = ['test', 'test2'];
  let nouns = ['test', 'test2'];

  expect(thothMagus.generateName(adverbs, adjectives, nouns)).toBeDefined();
});
