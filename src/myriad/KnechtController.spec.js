import KnechtController from './KnechtController.js';
const magisterLudi = KnechtController();

it('should parse suit', () => {

  expect('W').toEqual(magisterLudi.parseSuit('5W'));
});


//////////////////////////////////////////////////
// SELECTION RESOLUTION VALUE VOID
//////////////////////////////////////////////////
describe('selResValVoid', () => {

  const selResValVoidCases = [

    [['6C'], [], []],
    [['6C'], ['8C'], ['6C', '8C']],
    [[], ['8W'], []],
  
  ];

  test.each(selResValVoidCases)(

    "given selected Daemon cards %p " +
    "and selected Player cards %p, " + 
    "returns %p",
    
    (

      selectedCardsDaemon, 
      selectedCardsPlayer, 
      expectedResult

    ) => {

      const result = 
        magisterLudi.selResValVoid(
          selectedCardsDaemon, selectedCardsPlayer);

      expect(result).toEqual(expectedResult);

    }
  );

});

// //////////////////////////////////////////////////
// // SELECTION RESOLUTION VALUE AIR
// //////////////////////////////////////////////////
// describe('selResValAir', () => {

//   // FROM SPEC DOC
//   // WITHIN SAME SUIT: Higher "Wins" and is reused, Lower collected
//   // WITHIN DIFFERING SUITS: Astrological order (rock paper scissors style)
//   // air trumps earth
//   // water trumps air
//   // fire trumps water
//   // earth trumps fire
//   // water and earth harmonize (treat as same suit, tie goes to water, earth is collected)
//   // fire and air fuel/consume (treat as same suit, tie goes to fire, air is collected)

//   const selResValAirCases = [

//     //TODO AIR: More Cases Needed, esp. Multi Selects
//     //JUST GENERATING THESE RANDOMLY
//     [['6C'], ['8W'], ['6C']], 
//     [['2C'], ['6C'], []], 
//     [['2C'], ['4D'], []],
//     [['2C'], ['8S'], []],
  
//   ];

//   test.each(selResValAirCases)(

//     "given selected Daemon cards %p " +
//     "and selected Player cards %p, " + 
//     "returns %p",
    
//     (

//       selectedCardsDaemon, 
//       selectedCardsPlayer, 
//       expectedResult

//     ) => {

//       const result = 
//         magisterLudi.selResValAir(
//           selectedCardsDaemon, selectedCardsPlayer);

//       expect(result).toEqual(expectedResult);

//     }
//   );

// });

//////////////////////////////////////////////////
// SELECTION RESOLUTION VALUE EARTH
//////////////////////////////////////////////////
describe('selResValEarth', () => {

  const selResValEarthCases = [

    [['6C'], ['8W'], []],
    [['6C'], ['8C'], ['6C', '8C']],
    [['6W'], ['8W'], ['6W', '8W']],
  
  ];

  test.each(selResValEarthCases)(

    "given selected Daemon cards %p " +
    "and selected Player cards %p, " + 
    "returns %p",
    
    (

      selectedCardsDaemon, 
      selectedCardsPlayer, 
      expectedResult

    ) => {

      const result = 
        magisterLudi.selResValEarth(
          selectedCardsDaemon, selectedCardsPlayer);

      expect(result).toEqual(expectedResult);

    }
  );

});
