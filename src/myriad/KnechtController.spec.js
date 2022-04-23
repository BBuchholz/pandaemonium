import KnechtController from './KnechtController.js';
const magisterLudi = KnechtController();

it('should parse suit', () => {

  expect('W').toEqual(magisterLudi.parseSuit('5W'));
});

//////////////////////////////////////////////////
// NEW DEAL ELIGIBLE VOID
//////////////////////////////////////////////////
describe('newDealEligibleVoid', () => {

  const newDealEligibleVoidCases = [

    [['9C', '6C', '3C'], ['3W','6W','9W'], true],
  
  ];

  test.each(newDealEligibleVoidCases)(

    "given selected Daemon cards %p " +
    "and selected Player cards %p, " + 
    "returns %p",
    
    (

      daemonCards, 
      playerCards, 
      expectedResult,

    ) => {

      const result = 
        magisterLudi.newDealEligibleVoid(
          daemonCards, playerCards);

      expect(result).toEqual(expectedResult);

    }
  );

});

//////////////////////////////////////////////////
// NEW DEAL ELIGIBLE Earth
//////////////////////////////////////////////////
describe('newDealEligibleEarth', () => {

  // ALL MOVES ARE ELIGIBLE IN Earth
  // ONLY EMPTY CARD SETS QUALIFY FOR NEW DEAL
  const newDealEligibleEarthCases = [

    // TODO R5: these are copied from fire and are not verified
    [['9C', '6C', '3C'], ['3W','6W','9W'], false],
    [['9C', '6C'], ['3W','6W'], false],
    [['9C'], ['3W'], false],
    [[], [], true],
  
  ];

  test.each(newDealEligibleEarthCases)(

    "given selected Daemon cards %p " +
    "and selected Player cards %p, " + 
    "returns %p",
    
    (

      daemonCards, 
      playerCards, 
      expectedResult,

    ) => {

      const result = 
        magisterLudi.newDealEligibleEarth(
          daemonCards, playerCards);

      expect(result).toEqual(expectedResult);

    }
  );

});

//////////////////////////////////////////////////
// NEW DEAL ELIGIBLE FIRE
//////////////////////////////////////////////////
describe('newDealEligibleFire', () => {

  // ALL MOVES ARE ELIGIBLE IN FIRE
  // ONLY EMPTY CARD SETS QUALIFY FOR NEW DEAL
  const newDealEligibleFireCases = [

    [['9C', '6C', '3C'], ['3W','6W','9W'], false],
    [['9C', '6C'], ['3W','6W'], false],
    [['9C'], ['3W'], false],
    [[], [], true],
  
  ];

  test.each(newDealEligibleFireCases)(

    "given selected Daemon cards %p " +
    "and selected Player cards %p, " + 
    "returns %p",
    
    (

      daemonCards, 
      playerCards, 
      expectedResult,

    ) => {

      const result = 
        magisterLudi.newDealEligibleFire(
          daemonCards, playerCards);

      expect(result).toEqual(expectedResult);

    }
  );

});

//////////////////////////////////////////////////
// SELECTION RESOLUTION VALUE VOID
//////////////////////////////////////////////////
describe('selResValVoid', () => {

  const selResValVoidCases = [

    [['6C'], [], ['6C']],
    [['6C'], ['8C'], ['6C', '8C']],
    [[], ['8W'], ['8W']],
  
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

//////////////////////////////////////////////////
// SELECTION RESOLUTION VALUE AIR
//////////////////////////////////////////////////
describe('selResValAir', () => {

  // FROM SPEC DOC
  // WITHIN SAME SUIT: Higher "Wins" and is reused,
  // Lower collected
  // WITHIN DIFFERING SUITS: Astrological order
  // (rock paper scissors style)
  // air trumps earth
  // water trumps air
  // fire trumps water
  // earth trumps fire
  // water and earth harmonize (treat as same suit,
  // tie goes to water, earth is collected)
  // fire and air fuel/consume (treat as same suit,
  // tie goes to fire, air is collected)

  const selResValAirCases = [

    //COPIED FROM TEST CASES SPREADSHEET SPEC
    [['9C'], ['1C'], ['1C']],
    [['1C'], ['9C'], ['1C']],
    [['6S'], ['6C'], ['6S']],
    [['7D'], ['6C'], ['6C']],
    [['6D'], ['6C'], ['6D']],
    [['5D'], ['6C'], ['5D']],
    [['6W'], ['6C'], ['6C']],
    [['6C'], ['6S'], ['6S']],
    [['9S'], ['1S'], ['1S']],
    [['1S'], ['9S'], ['1S']],
    [['6D'], ['6S'], ['6D']],
    [['7W'], ['6S'], ['6S']],
    [['6W'], ['6S'], ['6S']],
    [['5W'], ['6S'], ['5W']],
    [['7C'], ['6D'], ['6D']],
    [['6C'], ['6D'], ['6D']],
    [['5C'], ['6D'], ['5C']],
    [['6S'], ['6D'], ['6D']],
    [['9D'], ['1D'], ['1D']],
    [['1D'], ['9D'], ['1D']],
    [['6W'], ['6D'], ['6W']],
    [['6C'], ['6W'], ['6C']],
    [['7S'], ['6W'], ['6W']],
    [['6S'], ['6W'], ['6S']],
    [['5S'], ['6W'], ['5S']],
    [['6D'], ['6W'], ['6W']],
    [['9W'], ['1W'], ['1W']],
    [['1W'], ['9W'], ['1W']],
  
  ];

  test.each(selResValAirCases)(

    "given selected Daemon cards %p " +
    "and selected Player cards %p, " + 
    "returns %p",
    
    (

      selectedCardsDaemon, 
      selectedCardsPlayer, 
      expectedResult

    ) => {

      const result = 
        magisterLudi.selResValAir(
          selectedCardsDaemon, selectedCardsPlayer);

      expect(result).toEqual(expectedResult);

    }
  );

});

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

//////////////////////////////////////////////////
// VALIDATE SELECTION VOID
//////////////////////////////////////////////////
describe('validateSelectionVoid', () => {

  const validateSelectionVoidCases = [

    [['6C'], [], true],
    [['6C'], ['8C'], true],
    [[], ['8W'], true],
  
  ];

  test.each(validateSelectionVoidCases)(

    "given selected Daemon cards %p " +
    "and selected Player cards %p, " + 
    "returns %p",
    
    (

      selectedCardsDaemon, 
      selectedCardsPlayer, 
      expectedResult,

    ) => {

      const result = 
        magisterLudi.validateSelectionVoid(
          selectedCardsDaemon, selectedCardsPlayer);

      expect(result).toEqual(expectedResult);

    }
  );

});

//////////////////////////////////////////////////
// VALIDATE SELECTION WATER
//////////////////////////////////////////////////
describe('validateSelectionWater', () => {

  const validateSelectionWaterCases = [

    [['6C'], [], false],
    [['6C'], ['8C'], true],
    [['6C', '6S'], ['8D', '8W'], true],
    [['6C', '6S', '6D'], ['8S', '8D', '8W'], true],
    [[], ['8W'], false],
  
  ];

  test.each(validateSelectionWaterCases)(

    "given selected Daemon cards %p " +
    "and selected Player cards %p, " + 
    "returns %p",
    
    (

      selectedCardsDaemon, 
      selectedCardsPlayer, 
      expectedResult,

    ) => {

      const result = 
        magisterLudi.validateSelectionWater(
          selectedCardsDaemon, selectedCardsPlayer);

      expect(result).toEqual(expectedResult);

    }
  );

});