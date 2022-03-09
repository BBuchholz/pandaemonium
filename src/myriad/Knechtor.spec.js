const { Knechtor } = require('./Knechtor.js');
const magisterLudi = new Knechtor();

describe('selections', () => {

  const aewonicCross1 = ['9C','1C','8W','3C','5S','6C'];

  const expectedSelectionsAC1Fire = 
    [
      ['6C', '9C'],
      ['6C', '8W'],
      ['6C', '5S'],
      ['3C', '9C'],
      ['3C', '8W'],
      ['3C', '5S'],
      ['1C', '9C'],
      ['1C', '8W'],
      ['1C', '5S'],
    ];

  const casesGetAll = [
    [aewonicCross1, 'Fire', expectedSelectionsAC1Fire]
  ];

  test.each(casesGetAll)(
    "given aewonic cross %p and quadrant %p, returns %p",
    (aewonicCross, currentQuadrant, expectedSelections) => {
      const result = magisterLudi.getAllValidSelections(aewonicCross, currentQuadrant);
      expect(result).toEqual(expectedSelections);
    }
  );

  const casesGetNext = [
    ['6C', ['6C'], aewonicCross1, 'Fire', ['6C', '9C']],
    ['3C', ['3C'], aewonicCross1, 'Fire', ['3C', '9C']],
    ['1C', ['1C'], aewonicCross1, 'Fire', ['1C', '9C']],
  ];

  test.each(casesGetNext)(
    "given player card %p and selected cards %p and aewonic cross %p and quadrant %p, returns %p",
    (currentPlayerCardKey, selectedCards, aewonicCross, currentQuadrant, expectedResult) => {
      const result = 
        magisterLudi.getNextValidSelection(currentPlayerCardKey, 
                                           selectedCards, 
                                           aewonicCross, 
                                           currentQuadrant);
      expect(result).toEqual(expectedResult);
    }
  );

});

