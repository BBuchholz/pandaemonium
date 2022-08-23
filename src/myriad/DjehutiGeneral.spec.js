const { Djehuti } = require('./Djehuti.js');
const thothMagus = new Djehuti();

it('should generate names', () => {

  let adverbs = ['test1']
  let adjectives = ['test', 'test2'];
  let nouns = ['test', 'test2'];

  expect(thothMagus.generateName(adverbs, adjectives, nouns)).toBeDefined();
});

it('should parse uuid if present', () => {

  const textWithUuid = 
`
---

uuid: valueGoesHere

---

Other text would be here and should be ignored

`;

  
  expect(thothMagus.parseUuid(textWithUuid)).toBe('valueGoesHere');
});

it('should parse preferred alias if present', () => {

  const textWithAlias = 
`
---

uuid: valueGoesHere
preferredAlias: Call Me This

---

Other text would be here and should be ignored

`;

  
  expect(thothMagus.parsePreferredAlias(textWithAlias)).toBe('Call Me This');
});