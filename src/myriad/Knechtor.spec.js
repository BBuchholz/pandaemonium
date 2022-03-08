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

describe('selections', () => {



  it('should have valid selections', () => {

    let aewonicCross = ['9C','1C','8W','3C','5S','6C'];

    let currentQuadrant = 'Fire';

    let expectedSelections = 
      [
        ['6C', '5S'],
        ['6C', '8W'],
        ['6C', '9C'],
        ['3C', '5S'],
        ['3C', '8W'],
        ['3C', '9C'],
        ['1C', '5S'],
        ['1C', '8W'],
        ['1C', '9C'],
      ];

    let validSelections = magisterLudi.getAllValidSelections(aewonicCross, currentQuadrant);      

    for(const selection of expectedSelections){
      console.log(selection);
      expect(validSelections.includes(selection)).toBe(true);

    }

  });

});

