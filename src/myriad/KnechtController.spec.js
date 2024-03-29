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
// NEW DEAL ELIGIBLE WATER
//////////////////////////////////////////////////
describe('newDealEligibleWater', () => {

  const newDealEligibleWaterCases = [

    [['9C', '6C', '3C'], ['3W','6W','9W'], false],
    [['9C', '6C'], ['3W','6W'], false],
    [['9C'], ['3W'], true],
    [[], [], true],
  
  ];

  test.each(newDealEligibleWaterCases)(

    "given selected Daemon cards %p " +
    "and selected Player cards %p, " + 
    "returns %p",
    
    (

      daemonCards, 
      playerCards, 
      expectedResult,

    ) => {

      const result = 
        magisterLudi.newDealEligibleWater(
          daemonCards, playerCards);

      expect(result).toEqual(expectedResult);

    }
  );

});

//////////////////////////////////////////////////
// NEW DEAL ELIGIBLE AIR
//////////////////////////////////////////////////
describe('newDealEligibleAir', () => {

  // ALL MOVES ARE ELIGIBLE IN Air
  // ONLY EMPTY CARD SETS QUALIFY FOR NEW DEAL
  const newDealEligibleAirCases = [

    [['9C', '6C', '3C'], ['3W','6W','9W'], false],
    [['9C', '6C'], ['3W','6W'], false],
    [['9C'], ['3W'], false],
    [[], [], true],
  
  ];

  test.each(newDealEligibleAirCases)(

    "given selected Daemon cards %p " +
    "and selected Player cards %p, " + 
    "returns %p",
    
    (

      daemonCards, 
      playerCards, 
      expectedResult,

    ) => {

      const result = 
        magisterLudi.newDealEligibleAir(
          daemonCards, playerCards);

      expect(result).toEqual(expectedResult);

    }
  );

});

//////////////////////////////////////////////////
// NEW DEAL ELIGIBLE EARTH
//////////////////////////////////////////////////
describe('newDealEligibleEarth', () => {

  const newDealEligibleEarthCases = [

    [['9C', '6C', '3C'], ['3W','6W','9W'], false],
    [['9C', '6C'], ['3W','6W'], false],
    [['9C'], ['3W'], true],
    [[], [], true],
    [['1C', '8S', '2C'], ['3W','6W','9W'], true],
  
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
// SELECTION RESOLUTION VALUE WATER
//////////////////////////////////////////////////
describe('selResValWater', () => {

  const selResValWaterCases = [

    // TODO WATER: NEED MORE CASES, ADD AS WE GO
    // (ESP. ONCE LOAD GAME IS REFACTORED INTO LOAD TABLE)
    [["6S","5S"], ["2D","4D","6D","9D"], ["6S","5S"]],
    [["1W","2W"], ["4C","3S","3C","7S"], ["1W","2W"]],
  ];

  test.each(selResValWaterCases)(

    "given unselected cards %p " +
    "and selected cards %p, " + 
    "returns %p",
    
    (

      unselectedCards, 
      selectedCards, 
      expectedResult

    ) => {

      const result = 
        magisterLudi.selResValWater(
          unselectedCards, selectedCards);

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
// SELECTION RESOLUTION VALUE FIRE
//////////////////////////////////////////////////
describe('selResValFire', () => {

  const selResValFireCases = [

    [['9C'], ['1C'], ['9C']],
    [['9S'], ['1C'], ['1C']],
    [['6S'], ['6C'], ['6S']],
    [['6C'], ['6S'], ['6C']],
    [['9D'], ['1C'], ['1C']],
    [['9W'], ['1C'], ['1C']],
    [['9C'], ['1S'], ['1S']],
    [['9S'], ['1S'], ['9S']],
    [['9D'], ['1S'], ['1S']],
    [['9W'], ['1S'], ['1S']],
    [['9C'], ['1D'], ['1D']],
    [['9S'], ['1D'], ['1D']],
    [['9D'], ['1D'], ['9D']],
    [['9W'], ['1D'], ['1D']],
    [['9C'], ['1W'], ['1W']],
    [['9S'], ['1W'], ['1W']],
    [['9D'], ['1W'], ['1W']],
    [['9W'], ['1W'], ['9W']],
  
  ];

  test.each(selResValFireCases)(

    "given selected Daemon cards %p " +
    "and selected Player cards %p, " + 
    "returns %p",
    
    (

      selectedCardsDaemon, 
      selectedCardsPlayer, 
      expectedResult

    ) => {

      const result = 
        magisterLudi.selResValFire(
          selectedCardsDaemon, selectedCardsPlayer);

      expect(result).toEqual(expectedResult);

    }
  );

});

//////////////////////////////////////////////////
// SELECTION RESOLUTION VALUE WATER TEXT
//////////////////////////////////////////////////
describe('selResValWaterText', () => {

  const selResValWaterTextCases = [

    // TODO WATER: NEED MORE CASES, ADD AS WE GO
    // (ESP. ONCE LOAD GAME IS REFACTORED INTO LOAD TABLE)
    // [["6S","5S"], ["2D","4D","6D","9D"], "Air Dragon captured by Earth Dragon through Virtue of Dignity, 17 over 11"],
    // [["1W","2W"], ["4C","3S","3C","7S"], "Fire Dragon captured by Mist Dragon through Virtue of Dignity, 17 over 3"],
    [[], [], "Dragons Nowhere To Be Seen"],
  ];

  test.each(selResValWaterTextCases)(

    "given unselected cards %p " +
    "and selected cards %p, " + 
    "returns %p",
    
    (

      unselectedCards, 
      selectedCards, 
      expectedResult

    ) => {

      const result = 
        magisterLudi.selResValWaterText(
          unselectedCards, selectedCards);

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


//////////////////////////////////////////////////
// VALIDATE SELECTION AIR
//////////////////////////////////////////////////
describe('validateSelectionAir', () => {

  const validateSelectionAirCases = [

    [['6C'], [], false],
    [['6C'], ['8C'], true],
    [['6C', '6S'], ['8D', '8W'], true],
    [['6C', '6S', '6D'], ['8S', '8D', '8W'], true],
    [[], ['8W'], false],
    [[], [], false],
  
  ];

  test.each(validateSelectionAirCases)(

    "given selected Daemon cards %p " +
    "and selected Player cards %p, " + 
    "returns %p",
    
    (

      selectedCardsDaemon, 
      selectedCardsPlayer, 
      expectedResult,

    ) => {

      const result = 
        magisterLudi.validateSelectionAir(
          selectedCardsDaemon, selectedCardsPlayer);

      expect(result).toEqual(expectedResult);

    }
  );

});

//////////////////////////////////////////////////
// VALIDATE SELECTION EARTH 
//////////////////////////////////////////////////
describe('validateSelectionEarth', () => {

  const validateSelectionEarthCases = [

    [[], [], false],
    [['6C'], [], false],
    [[], ['6W'], false],
    [['6C'], ['6W'], true],
    [['7C'], ['4W'], false],
    [['7W'], ['4W'], true],  
  
  ];

  test.each(validateSelectionEarthCases)(

    "given selected Daemon cards %p " +
    "and selected Player cards %p, " + 
    "returns %p",
    
    (

      selectedCardsDaemon, 
      selectedCardsPlayer, 
      expectedResult,

    ) => {

      const result = 
        magisterLudi.validateSelectionEarth(
          selectedCardsDaemon, selectedCardsPlayer);

      expect(result).toEqual(expectedResult);

    }
  );

});

//////////////////////////////////////////////////
// VALIDATE SELECTION FIRE 
//////////////////////////////////////////////////
describe('validateSelectionFire', () => {

  const validateSelectionFireCases = [

    [[], [], false],
    [['6C'], [], false],
    [[], ['6W'], false],
    [['6C'], ['6W'], true],
    [['7C'], ['4W'], true],
    [['7W'], ['4W'], true],  
  
  ];

  test.each(validateSelectionFireCases)(

    "given selected Daemon cards %p " +
    "and selected Player cards %p, " + 
    "returns %p",
    
    (

      selectedCardsDaemon, 
      selectedCardsPlayer, 
      expectedResult,

    ) => {

      const result = 
        magisterLudi.validateSelectionFire(
          selectedCardsDaemon, selectedCardsPlayer);

      expect(result).toEqual(expectedResult);

    }
  );

});

//////////////////////////////////////////////////
// PARSE DRAGON TYPE 
//////////////////////////////////////////////////
describe('parseDragonType', () => {

  const parseDragonTypeCases = [

    [[], 'Zero'],
    [['6C'], 'Water'],
    [['6S'], 'Air'],
    [['7D'], 'Earth'],
    [['7W'], 'Fire'],  
  
  ];

  test.each(parseDragonTypeCases)(

    "given card keys %p " +
    "returns %p",
    
    (
      cardKeys, 
      expectedResult,

    ) => {

      const result = magisterLudi.parseDragonType(cardKeys);

      expect(result).toEqual(expectedResult);

    }
  );

});

//////////////////////////////////////////////////
// COMBINE ELEMENTS 
//////////////////////////////////////////////////
describe('combineElements', () => {

  const combineElementsCases = [

    // PREVIOUS, REMOVE THESE AS LOWER '?' ARE FILLED IN
    // ['Water', 'Water', 'Water'],
    // ['Air', 'Air', 'Air'],
    // ['Earth', 'Earth', 'Earth'],
    // ['Fire', 'Fire', 'Fire'],

    // NEW, EVERY COMBINATION POSSIBLE, CHANGE '?' TO EXPECTED
    ['Water', 'Water ', 'Water'],
    // ['Water', 'Air', '?'],
    // ['Water', 'Earth', '?'],
    // ['Water', 'Fire', '?'],
    // ['Water', 'Mist', '?'],
    // ['Water', 'Clay', '?'],
    // ['Water', 'Steam', '?'],
    // ['Water', 'Dust', '?'],
    // ['Water', 'Kiln', '?'],
    // ['Water', 'Ember', '?'],
    // ['Water', 'Sauna', '?'],
    // ['Water', 'Tar', '?'],
    // ['Water', 'Tempest', '?'],
    // ['Water', 'Ash', '?'],

    // ['Air', 'Water ', '?'],
    // ['Air', 'Air', '?'],
    // ['Air', 'Earth', '?'],
    // ['Air', 'Fire', '?'],
    // ['Air', 'Mist', '?'],
    // ['Air', 'Clay', '?'],
    // ['Air', 'Steam', '?'],
    // ['Air', 'Dust', '?'],
    // ['Air', 'Kiln', '?'],
    // ['Air', 'Ember', '?'],
    // ['Air', 'Sauna', '?'],
    // ['Air', 'Tar', '?'],
    // ['Air', 'Tempest', '?'],
    // ['Air', 'Ash', '?'],

    // ['Earth', 'Water ', '?'],
    // ['Earth', 'Air', '?'],
    // ['Earth', 'Earth', '?'],
    // ['Earth', 'Fire', '?'],
    // ['Earth', 'Mist', '?'],
    // ['Earth', 'Clay', '?'],
    // ['Earth', 'Steam', '?'],
    // ['Earth', 'Dust', '?'],
    // ['Earth', 'Kiln', '?'],
    // ['Earth', 'Ember', '?'],
    // ['Earth', 'Sauna', '?'],
    // ['Earth', 'Tar', '?'],
    // ['Earth', 'Tempest', '?'],
    // ['Earth', 'Ash', '?'],

    // ['Fire', 'Water ', '?'],
    // ['Fire', 'Air', '?'],
    // ['Fire', 'Earth', '?'],
    // ['Fire', 'Fire', '?'],
    // ['Fire', 'Mist', '?'],
    // ['Fire', 'Clay', '?'],
    // ['Fire', 'Steam', '?'],
    // ['Fire', 'Dust', '?'],
    // ['Fire', 'Kiln', '?'],
    // ['Fire', 'Ember', '?'],
    // ['Fire', 'Sauna', '?'],
    // ['Fire', 'Tar', '?'],
    // ['Fire', 'Tempest', '?'],
    // ['Fire', 'Ash', '?'],

    // ['Mist', 'Water ', '?'],
    // ['Mist', 'Air', '?'],
    // ['Mist', 'Earth', '?'],
    // ['Mist', 'Fire', '?'],
    // ['Mist', 'Mist', '?'],
    // ['Mist', 'Clay', '?'],
    // ['Mist', 'Steam', '?'],
    // ['Mist', 'Dust', '?'],
    // ['Mist', 'Kiln', '?'],
    // ['Mist', 'Ember', '?'],
    // ['Mist', 'Sauna', '?'],
    // ['Mist', 'Tar', '?'],
    // ['Mist', 'Tempest', '?'],
    // ['Mist', 'Ash', '?'],

    // ['Clay', 'Water ', '?'],
    // ['Clay', 'Air', '?'],
    // ['Clay', 'Earth', '?'],
    // ['Clay', 'Fire', '?'],
    // ['Clay', 'Mist', '?'],
    // ['Clay', 'Clay', '?'],
    // ['Clay', 'Steam', '?'],
    // ['Clay', 'Dust', '?'],
    // ['Clay', 'Kiln', '?'],
    // ['Clay', 'Ember', '?'],
    // ['Clay', 'Sauna', '?'],
    // ['Clay', 'Tar', '?'],
    // ['Clay', 'Tempest', '?'],
    // ['Clay', 'Ash', '?'],

    // ['Steam', 'Water ', '?'],
    // ['Steam', 'Air', '?'],
    // ['Steam', 'Earth', '?'],
    // ['Steam', 'Fire', '?'],
    // ['Steam', 'Mist', '?'],
    // ['Steam', 'Clay', '?'],
    // ['Steam', 'Steam', '?'],
    // ['Steam', 'Dust', '?'],
    // ['Steam', 'Kiln', '?'],
    // ['Steam', 'Ember', '?'],
    // ['Steam', 'Sauna', '?'],
    // ['Steam', 'Tar', '?'],
    // ['Steam', 'Tempest', '?'],
    // ['Steam', 'Ash', '?'],

    // ['Dust', 'Water ', '?'],
    // ['Dust', 'Air', '?'],
    // ['Dust', 'Earth', '?'],
    // ['Dust', 'Fire', '?'],
    // ['Dust', 'Mist', '?'],
    // ['Dust', 'Clay', '?'],
    // ['Dust', 'Steam', '?'],
    // ['Dust', 'Dust', '?'],
    // ['Dust', 'Kiln', '?'],
    // ['Dust', 'Ember', '?'],
    // ['Dust', 'Sauna', '?'],
    // ['Dust', 'Tar', '?'],
    // ['Dust', 'Tempest', '?'],
    // ['Dust', 'Ash', '?'],

    // ['Kiln', 'Water ', '?'],
    // ['Kiln', 'Air', '?'],
    // ['Kiln', 'Earth', '?'],
    // ['Kiln', 'Fire', '?'],
    // ['Kiln', 'Mist', '?'],
    // ['Kiln', 'Clay', '?'],
    // ['Kiln', 'Steam', '?'],
    // ['Kiln', 'Dust', '?'],
    // ['Kiln', 'Kiln', '?'],
    // ['Kiln', 'Ember', '?'],
    // ['Kiln', 'Sauna', '?'],
    // ['Kiln', 'Tar', '?'],
    // ['Kiln', 'Tempest', '?'],
    // ['Kiln', 'Ash', '?'],

    // ['Ember', 'Water ', '?'],
    // ['Ember', 'Air', '?'],
    // ['Ember', 'Earth', '?'],
    // ['Ember', 'Fire', '?'],
    // ['Ember', 'Mist', '?'],
    // ['Ember', 'Clay', '?'],
    // ['Ember', 'Steam', '?'],
    // ['Ember', 'Dust', '?'],
    // ['Ember', 'Kiln', '?'],
    // ['Ember', 'Ember', '?'],
    // ['Ember', 'Sauna', '?'],
    // ['Ember', 'Tar', '?'],
    // ['Ember', 'Tempest', '?'],
    // ['Ember', 'Ash', '?'],

    // ['Sauna', 'Water ', '?'],
    // ['Sauna', 'Air', '?'],
    // ['Sauna', 'Earth', '?'],
    // ['Sauna', 'Fire', '?'],
    // ['Sauna', 'Mist', '?'],
    // ['Sauna', 'Clay', '?'],
    // ['Sauna', 'Steam', '?'],
    // ['Sauna', 'Dust', '?'],
    // ['Sauna', 'Kiln', '?'],
    // ['Sauna', 'Ember', '?'],
    // ['Sauna', 'Sauna', '?'],
    // ['Sauna', 'Tar', '?'],
    // ['Sauna', 'Tempest', '?'],
    // ['Sauna', 'Ash', '?'],

    // ['Tar', 'Water ', '?'],
    // ['Tar', 'Air', '?'],
    // ['Tar', 'Earth', '?'],
    // ['Tar', 'Fire', '?'],
    // ['Tar', 'Mist', '?'],
    // ['Tar', 'Clay', '?'],
    // ['Tar', 'Steam', '?'],
    // ['Tar', 'Dust', '?'],
    // ['Tar', 'Kiln', '?'],
    // ['Tar', 'Ember', '?'],
    // ['Tar', 'Sauna', '?'],
    // ['Tar', 'Tar', '?'],
    // ['Tar', 'Tempest', '?'],
    // ['Tar', 'Ash', '?'],

    // ['Tempest', 'Water ', '?'],
    // ['Tempest', 'Air', '?'],
    // ['Tempest', 'Earth', '?'],
    // ['Tempest', 'Fire', '?'],
    // ['Tempest', 'Mist', '?'],
    // ['Tempest', 'Clay', '?'],
    // ['Tempest', 'Steam', '?'],
    // ['Tempest', 'Dust', '?'],
    // ['Tempest', 'Kiln', '?'],
    // ['Tempest', 'Ember', '?'],
    // ['Tempest', 'Sauna', '?'],
    // ['Tempest', 'Tar', '?'],
    // ['Tempest', 'Tempest', '?'],
    // ['Tempest', 'Ash', '?'],

    // ['Ash', 'Water ', '?'],
    // ['Ash', 'Air', '?'],
    // ['Ash', 'Earth', '?'],
    // ['Ash', 'Fire', '?'],
    // ['Ash', 'Mist', '?'],
    // ['Ash', 'Clay', '?'],
    // ['Ash', 'Steam', '?'],
    // ['Ash', 'Dust', '?'],
    // ['Ash', 'Kiln', '?'],
    // ['Ash', 'Ember', '?'],
    // ['Ash', 'Sauna', '?'],
    // ['Ash', 'Tar', '?'],
    // ['Ash', 'Tempest', '?'],
    // ['Ash', 'Ash', '?'],
  
  ];

  test.each(combineElementsCases)(

    "given element %p " +
    "and element %p " + 
    "returns %p",
    
    (
      elementOne,
      elementTwo, 
      expectedResult,

    ) => {


      // console.log('elementOne: ' + elementOne);
      // console.log('elementTwo: ' + elementTwo);

      const result = 
        magisterLudi.combineElements(elementOne, elementTwo);

      // TEMPORARILY DISABLED
      // expect(result).toEqual(expectedResult);

    }
  );

});