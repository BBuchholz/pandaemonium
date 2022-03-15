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

  // CASES GET ALL ////////////////////////////////////////////
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


  // CASES GET NEXT ////////////////////////////////////////////
  const casesGetNext = [
    ['6C', ['6C'], aewonicCross1, 'Fire', ['6C', '9C']],
    ['6C', ['6C', '9C'], aewonicCross1, 'Fire', ['6C', '8W']],
    ['6C', ['6C', '8W'], aewonicCross1, 'Fire', ['6C', '5S']],
    ['6C', ['6C', '5S'], aewonicCross1, 'Fire', []],
    ['3C', ['3C'], aewonicCross1, 'Fire', ['3C', '9C']],
    ['3C', ['3C', '9C'], aewonicCross1, 'Fire', ['3C', '8W']],
    ['3C', ['3C', '8W'], aewonicCross1, 'Fire', ['3C', '5S']],
    ['3C', ['3C', '5S'], aewonicCross1, 'Fire', []],
    ['1C', ['1C'], aewonicCross1, 'Fire', ['1C', '9C']],
    ['1C', ['1C', '9C'], aewonicCross1, 'Fire', ['1C', '8W']],
    ['1C', ['1C', '8W'], aewonicCross1, 'Fire', ['1C', '5S']],
    ['1C', ['1C', '5S'], aewonicCross1, 'Fire', []],
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

describe('resolutions', () => {

  // CASES RESOLVE FIRE ////////////////////////////
  // Fire should resolve to the lower if the suit 
  // is the same and the higher if the suit
  // is different
  const casesResolveFire = [
    ['8C', '1S', ['8C']],
    ['5C', '1S', ['5C']],
    ['2C', '1S', ['2C']],
    ['8C', '9W', ['9W']],
    ['5C', '9W', ['9W']],
    ['2C', '9W', ['9W']],
    ['8C', '6C', ['6C']],
    ['5C', '6C', ['5C']],
    ['2C', '6C', ['2C']],
  ];

  test.each(casesResolveFire)(
    "given daemon card %p and player card %p, returns %p",
    (daemonCardKey, playerCardKey, expectedResult) => {
      const result = 
        magisterLudi.resolveFireSelections(daemonCardKey, 
                                           playerCardKey);
      expect(result).toEqual(expectedResult);
    }
  );

});
