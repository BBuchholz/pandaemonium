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

it('should prune completed tasks', () => {

  const textToPrune = 
`

- [ ] [[PND]] should have an option to "prune" which creates a new item that has it's own uuid (ONLY IF AN EXISTING UUID IS FOUND) and all completed tasks removed (a nice side effect of this in obsidian is that we can flag whole paragraphs for removal by clicking the task button, turning it into a checklist item, and crossing it off (ADDENDUM: COPY THIS EXACT SLIP INTO THE UNIT TESTS, EXPECTED OUTPUT SHOULD ONLY LEAVE THIS ONE)
- [x] [[PND]] should have an option for copy to clipboard for current active item in oproom 
- [x] use the YYYY-MM-DD_HH-mm-ss format for default alias when creating wxrds in toolset in [[PND]]
- [x] create unit test for djehuti method parse preferred alias
- [x] create unit test for djehuti method parse uuid 
- [x] work bench items text should cascade display preferred alias, if found in front matter, else uuid, if alias not found, else "no uuid found" if uuid not present

`;

  const expectedTextAfterPruning = 
`

- [ ] [[PND]] should have an option to "prune" which creates a new item that has it's own uuid (ONLY IF AN EXISTING UUID IS FOUND) and all completed tasks removed (a nice side effect of this in obsidian is that we can flag whole paragraphs for removal by clicking the task button, turning it into a checklist item, and crossing it off (ADDENDUM: COPY THIS EXACT SLIP INTO THE UNIT TESTS, EXPECTED OUTPUT SHOULD ONLY LEAVE THIS ONE)

`;

  const processedText =
    thothMagus.pruneTasks(textToPrune);

  expect(processedText).toBe(expectedTextAfterPruning);
  
});

it('should create new uuid if found when pruning', () => {

  const textToPrune = 
`
---

uuid: someValue

---

- [ ] [[PND]] should have an option to "prune" which creates a new item that has it's own uuid (ONLY IF AN EXISTING UUID IS FOUND) and all completed tasks removed (a nice side effect of this in obsidian is that we can flag whole paragraphs for removal by clicking the task button, turning it into a checklist item, and crossing it off (ADDENDUM: COPY THIS EXACT SLIP INTO THE UNIT TESTS, EXPECTED OUTPUT SHOULD ONLY LEAVE THIS ONE)
- [x] [[PND]] should have an option for copy to clipboard for current active item in oproom 
- [x] use the YYYY-MM-DD_HH-mm-ss format for default alias when creating wxrds in toolset in [[PND]]
- [x] create unit test for djehuti method parse preferred alias
- [x] create unit test for djehuti method parse uuid 
- [x] work bench items text should cascade display preferred alias, if found in front matter, else uuid, if alias not found, else "no uuid found" if uuid not present

`;

  const processedText =
    thothMagus.pruneTasks(textToPrune);

  expect(processedText).not.toContain('uuid: someValue');
  
});

// it('should generate praxis instance templates', () => {


//   //KEEP THIS AS WE IMPLEMENT, BUT THEN FLIP TEST TO MAKE SURE
//   //IT HAS ALL THESE VALUES BUT THAT THEY DIFFER WHERE
//   //THEY SHOULD
//   const templateText =
// `
// ---

// wxrdUuid: replaceThisValue
// wxrdType: praxisInstance
// wxrdCreatedOn: 2022-08-29
// wxrdCreatedAt: 10-53-23
// wxrdSpecVersion: 1.0

// ---



// `;

//   const generatedTemplate =
//     thothMagus.generatePraxisTemplate();


//   expect(generatedTemplate).toBe(templateText);

//   //AFTER THAT LINE IS WORKING, CHANGE IT TO THIS
//   // expect(generatedTemplate).not.toBe(templateText);

  
// });



