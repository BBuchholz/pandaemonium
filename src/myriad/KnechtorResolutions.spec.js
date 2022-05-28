const { Knechtor } = require('./Knechtor.js');
const magisterLudi = new Knechtor();

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
