const { Knechtor } = require('./Knechtor.js');
const magisterLudi = new Knechtor();


it('should have at least one spec', () => {

  expect(true).toBe(true);

});

// COPIED FROM KnechtController.spec.js in myriad-core
// TODO: uncomment as we implement in the new Knechtor class
// describe('delta utils', () => {

//   const suitToHDeltaCases = 
//     [
//       ['W', 1], 
//       ['C', -1], 
//       ['S', 1], 
//       ['D', -1], 
//       ['?', 0]
//     ];

//   test.each(suitToHDeltaCases)(
//     "given suit %p as arg, returns HDelta of %p",

// describe('deal function', () => {

//   it('should deal sequentially with a deal count parameter', () => {

//     const currentDeck = ['4D', '5W', '3C', '2S',
//                '6D', '5S', '3D', '2W',
//                '9D', '6W', '8C', '4S'];
               
//     const currentDeckLength = currentDeck.length;
               
//     var deal = magisterLudi.deal(currentDeck, 4);
//     const expectedFourCardDeal = ['4D', '5W', '3C', '2S'];
//     expect(expectedFourCardDeal).toStrictEqual(deal.dealtCards);
//     expect(deal.remainingDeck.length).toBe(currentDeckLength - 4);

//   });
// });

// describe('scenarios', () => {

//   const expectedScenarios = 
//     [
//       [0, '4D', '5W', '3C', '2S'],
//       [1, '6D', '5S', '3D', '2W'],
//       [2, '9D', '6W', '8C', '4S'],
//       [3, '5C', '8D', '3S', '2D'],
//       [4, '7D', '5D', '3W', '10S'],
//       [5, '7W', '8W', '6S', '9S'],
//       [6, '7C', '10D', '9W', '2C'],
//       [7, '10W', '10C', '9C', '4C'],
//       [8, '8S', '7S', '4W', '6C']
//     ];

//   var scenarios = magisterLudi.getScenarios();      

//   test.each(expectedScenarios)(
//     "given scenario index %p, returns four cards, %p, %p, %p, and %p",
//     (scenarioIndex, daemonCard, playerCardOne, playerCardTwo, playerCardThree) => {

//       var scenario = scenarios[scenarioIndex];
//       expect(scenario.daemonCard.power).toBe(daemonCard);
//       expect(scenario.daemonCard.description).toBe(magisterLudi.cardToDescription(scenario.daemonCard.power));
//       expect(scenario.playerCards[0].power).toBe(playerCardOne);
//       expect(scenario.playerCards[0].description).toBe(magisterLudi.cardToDescription(scenario.playerCards[0].power));
//       expect(scenario.playerCards[1].power).toBe(playerCardTwo);
//       expect(scenario.playerCards[1].description).toBe(magisterLudi.cardToDescription(scenario.playerCards[1].power));
//       expect(scenario.playerCards[2].power).toBe(playerCardThree);
//       expect(scenario.playerCards[2].description).toBe(magisterLudi.cardToDescription(scenario.playerCards[2].power));

//     }
//   );
// });

//     (suitArg, expectedResult) => {
//       const result  = magisterLudi.getHDeltaFromSuit(suitArg);
//       expect(result).toEqual(expectedResult);
//     }
//   );

//   const suitToMDeltaCases = 
//     [
//       ['W', -1], 
//       ['C', 1], 
//       ['S', 1], 
//       ['D', -1], 
//       ['?', 0]
//     ];

//   test.each(suitToMDeltaCases)(
//     "given suit %p as arg, returns MDelta of %p",
//     (suitArg, expectedResult) => {
//       const result  = magisterLudi.getMDeltaFromSuit(suitArg);
//       expect(result).toEqual(expectedResult);
//     }
//   );
// });
