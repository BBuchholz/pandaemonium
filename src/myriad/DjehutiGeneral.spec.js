const { Djehuti } = require('./Djehuti.js');
const thothMagus = new Djehuti();

it('should generate names', () => {

  let adverbs = ['test1']
  let adjectives = ['test', 'test2'];
  let nouns = ['test', 'test2'];

  expect(thothMagus.generateName(adverbs, adjectives, nouns)).toBeDefined();
});

it('should parse Uuid if present', () => {

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

it('should ensure uuid, respecting if present, adding if not found', () => {

  const textWithUuid = 
`
---

uuid: valueGoesHere

---

Other text would be here and should be ignored

`;

  const textWithoutUuid = 
`
---

notAUuid: thisShouldStay

---

Other text would be here and should be ignored

`;
  
  const textWithoutFrontMatter = 
`

Other text would be here and should be ignored

`;
  
  expect(thothMagus.ensureUuid(textWithUuid)).toBe(textWithUuid);
  const processedText = thothMagus.ensureUuid(textWithoutUuid);
  expect(processedText).toContain('uuid: ');
  expect(processedText).toContain('notAUuid: thisShouldStay');
  expect(processedText).toContain('Other text would be here and should be ignored');

  const processedTextWithoutFM = 
    thothMagus.ensureUuid(textWithoutFrontMatter);
  expect(processedTextWithoutFM).toContain('uuid: ');
  expect(processedTextWithoutFM).toContain('Other text would be here and should be ignored');
});

it('should set preferred alias', () => {

  const textWithPreferredAlias = 
`
---

preferredAlias: valueGoesHere

---

Other text would be here and should be ignored

`;

  const textWithoutPreferredAlias = 
`
---

notAPreferredAlias: thisShouldStay

---

Other text would be here and should be ignored

`;
  
  const textWithoutFrontMatter = 
`

Other text would be here and should be ignored

`;

  const preferredAliasToSet = 'Call Me This';
  
  const processedTextWithPreferredAlias =
    thothMagus.setPreferredAlias(
                textWithPreferredAlias, 
                preferredAliasToSet);

  expect(processedTextWithPreferredAlias).toContain('preferredAlias: Call Me This');
  
  const processedText = 
    thothMagus.setPreferredAlias(
                textWithoutPreferredAlias,
                preferredAliasToSet);
  expect(processedText).toContain('preferredAlias: Call Me This');
  expect(processedText).toContain('notAPreferredAlias: thisShouldStay');
  expect(processedText).toContain('Other text would be here and should be ignored');

  const processedTextWithoutFM = 
    thothMagus.setPreferredAlias(
                textWithoutFrontMatter,
                preferredAliasToSet);
  expect(processedTextWithoutFM).toContain('preferredAlias: Call Me This');
  expect(processedTextWithoutFM).toContain('Other text would be here and should be ignored');
});
