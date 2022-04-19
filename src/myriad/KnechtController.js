
// //FOR SOME REASON IT BREAKS IF I DO IT THIS WAY, INVESTIGATE?
// import { keysElemental } from '../constants.js';

const KnechtController = () => {

  const self = {

    getScenarios: () => {

      if(self.useHardCodedScenarios){

        return self.getHardCodedScenarios();

      }else{

        return self.getDynamicScenarios();
      }
    },

    getNextValidSelection: (currentPlayerCardKey, selectedCards, daemonCards, currentQuadrant) => {

      let returnSet = [];

      if(selectedCards.length === 1){
        returnSet = [currentPlayerCardKey];
      }

      if(currentQuadrant === 'Fire'){
        // let i = 0;
        // let found = false;
        // while(!found){
        //   if(selectedCards.includes(daemonCards[i])){
        //     found = true;

        //   }
        // }
        //TODO: SETUP A TEST SPEC FOR THIS
      }

      return returnSet;
    },    

    allPossibleCombos: (setOne, setTwo) => {

      let allPossible = [];

      //make the magick happen here :)

      for(let i = 0; i < setOne.length; i++){

        for(let j = 0; j < setTwo.length; j++){

          allPossible.push([setOne[i], setTwo[j]]);
        }
      }


      return allPossible;
    },

    deal: (currentDeck, numberToDeal) => {


      // const theseCardsDealt = ['4D', '5W', '3C', '2S'];
      const theseCardsDealt = currentDeck.splice(0, numberToDeal);
      // const thisRemainingDeck = currentDeck;
      const thisRemainingDeck = currentDeck;

      const newDeal = {
        dealtCards: theseCardsDealt, 
        remainingDeck: thisRemainingDeck
      };

      return newDeal;
    },

    parseSuit: (cardValue) => {

      if(cardValue && cardValue.endsWith("D")){
        return "D";
      }

      if(cardValue && cardValue.endsWith("C")){
        return "C";
      }

      if(cardValue && cardValue.endsWith("S")){
        return "S";
      } 

      if(cardValue && cardValue.endsWith("W")){
        return "W";
      }

      return '?';
    },
    
    shuffle: (array) => {
      // An implementation of the Fisher-Yates (aka Knuth) Shuffle
      // from: https://stackoverflow.com/a/2450976/670768

      let currentIndex = array.length, randomIndex;

      //while there remains elements to shuffle...
      while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // and swap it with the current element.
        [array[currentIndex], array[randomIndex]] =
          [array[randomIndex], array[currentIndex]];
      }

      return array;
    },

    dealTwelveTrees: () => {
      let seed = [
        '4D', '5W', '3C', '2S',
        '6D', '5S', '3D', '2W',
        '9D', '6W', '8C', '4S',
        '5C', '8D', '3S', '2D',
        '7D', '5D', '3W', '1S',
        '7W', '8W', '6S', '9S',
        '7C', '1D', '9W', '2C',
        '1W', '1C', '9C', '4C',
        '8S', '7S', '4W', '6C',
      ];

      // //FOR SOME REASON IT BREAKS IF I DO IT THIS WAY, INVESTIGATE?
      // let seed = keysElemental;

      self.shuffle(seed);
      return seed;
    },

    parseRank: (cardValue, suitKey) => {
      let rank = '';
      if(cardValue){
        rank = parseInt(cardValue.replace(suitKey, ''))
      }
      return rank;
    },

    suitKeyToName: (suitKey) => {

      var suitName = '?';

      switch(suitKey) {
        case 'W':
          suitName = 'Wands';
          break;
        case 'S':
          suitName = 'Swords';
          break;
        case 'D':
          suitName = 'Disks';
          break;
        case 'C':
          suitName = 'Cups';
          break;
      }

      return suitName;
    },

    rankValueToName: (rankValue) => {

      var rankName = '?';

      switch(rankValue) {
        case 2:
          rankName = 'Two';
          break;
        case 3:
          rankName = 'Three';
          break;
        case 4:
          rankName = 'Four';
          break;
        case 5:
          rankName = 'Five';
          break;
        case 6:
          rankName = 'Six';
          break;
        case 7:
          rankName = 'Seven';
          break;
        case 8:
          rankName = 'Eight';
          break;
        case 9:
          rankName = 'Nine';
          break;
        case 10:
          rankName = 'Ten';
          break;

      }


      return rankName;
    },

    getDynamicScenarios: () => {

      var scenarios = [];
      var cardSets = [
        ['4D', '5W', '3C', '2S'],
        ['6D', '5S', '3D', '2W'],
        ['9D', '6W', '8C', '4S'],
        ['5C', '8D', '3S', '2D'],
        ['7D', '5D', '3W', '10S'],
        ['7W', '8W', '6S', '9S'],
        ['7C', '10D', '9W', '2C'],
        ['10W', '10C', '9C', '4C'],
        ['8S', '7S', '4W', '6C']
      ];

      //TODO: working on deal function, then should mod these to 
      // be truly dynamic (shuffled), will have to change tests
      // to take hardCoded switch as a parameter or something,
      // original tests were to verify completeness of coverage

      // try to write NEW tests instead of changing OLD ones

      for(const cardSet of cardSets){
        scenarios.push(self.createScenario(cardSet));
      }

      return scenarios;

    },

    cardToDescription: (cardValue) => {

      const suit = self.parseSuit(cardValue);

      const rank = self.parseRank(cardValue, suit);

      const suitName = self.suitKeyToName(suit);
      const rankName = self.rankValueToName(rank);

      return rankName + ' of ' + suitName;
    },

    createScenario: (fourCardKeyArray) => {

      const cardOneKey = fourCardKeyArray[0];
      const cardOneDescription = self.cardToDescription(cardOneKey);

      const cardTwoKey = fourCardKeyArray[1];
      const cardTwoDescription = self.cardToDescription(cardTwoKey);

      const cardThreeKey = fourCardKeyArray[2];
      const cardThreeDescription = self.cardToDescription(cardThreeKey);

      const cardFourKey = fourCardKeyArray[3];
      const cardFourDescription = self.cardToDescription(cardFourKey);

      var scenario = {
        daemonCard: {
          description: cardOneDescription,
          power: cardOneKey,
        },
        playerCards: [
          {
            description: cardTwoDescription,
            power: cardTwoKey,
          },
          {
            description: cardThreeDescription,
            power: cardThreeKey,
          },
          {
            description: cardFourDescription,
            power: cardFourKey,
          },
        ]
      }

      return scenario;
    },

    getHardCodedScenarios: () => {

      // You can add new scenarios, but make sure that there is exactly...
      // * 1 daemonCard per scenario
      // * 3 playerCards per scenario

      var scenarios = [
        {
          daemonCard : {
            description : "Four of Disks",
            power : "4D",
          },
          playerCards : [
            {
              description : "Five of Wands",
              power : "5W",
            },
            {
              description : "Three of Cups",
              power : "3C",
            },
            {
              description : "Two of Swords",
              power : "2S",
            }
          ]
        },
        {
          daemonCard : {
            description : "Six of Disks",
            power : "6D",
          },
          playerCards : [
            {
              description : "Five of Swords",
              power : "5S",
            },
            {
              description : "Three of Disks",
              power : "3D",
            },
            {
              description : "Two of Wands",
              power : "2W",
            }
          ]
        },
        {
          daemonCard : {
            description : "Nine of Disks",
            power : "9D",
          },
          playerCards : [
            {
              description : "Six of Wands",
              power : "6W",
            },
            {
              description : "Eight of Cups",
              power : "8C",
            },
            {
              description : "Four of Swords",
              power : "4S",
            }
          ]
        },
        {
          daemonCard : {
            description : "Five of Cups",
            power : "5C",
          },
          playerCards : [
            {
              description : "Eight of Disks",
              power : "8D",
            },
            {
              description : "Three of Swords",
              power : "3S",
            },
            {
              description : "Two of Disks",
              power : "2D",
            }
          ]
        },
        {
          daemonCard : {
            description : "Seven of Disks",
            power : "7D",
          },
          playerCards : [
            {
              description : "Five of Disks",
              power : "5D",
            },
            {
              description : "Three of Wands",
              power : "3W",
            },
            {
              description : "Ten of Swords",
              power : "10S",
            }
          ]
        },
        {
          daemonCard : {
            description : "Seven of Wands",
            power : "7W",
          },
          playerCards : [
            {
              description : "Eight of Wands",
              power : "8W",
            },
            {
              description : "Six of Swords",
              power : "6S",
            },
            {
              description : "Nine of Swords",
              power : "9S",
            }
          ]
        },
        {
          daemonCard : {
            description : "Seven of Cups",
            power : "7C",
          },
          playerCards : [
            {
              description : "Ten of Disks",
              power : "10D",
            },
            {
              description : "Nine of Wands",
              power : "9W",
            },
            {
              description : "Two of Cups",
              power : "2C",
            }
          ]
        },
        {
          daemonCard : {
            description : "Ten of Wands",
            power : "10W",
          },
          playerCards : [
            {
              description : "Ten of Cups",
              power : "10C",
            },
            {
              description : "Nine of Cups",
              power : "9C",
            },
            {
              description : "Four of Cups",
              power : "4C",
            }
          ]
        },
        {
          daemonCard : {
            description : "Eight of Swords",
            power : "8S",
          },
          playerCards : [
            {
              description : "Seven of Swords",
              power : "7S",
            },
            {
              description : "Four of Wands",
              power : "4W",
            },
            {
              description : "Six of Cups",
              power : "6C",
            }
          ]
        }
      ];

      return scenarios;
    },

    getHDeltaFromSuit: (suit) => {
    
      switch (suit) {      

        case 'D':
          // console.log("disks found");
          return -1;
       
        case 'C':
          // console.log("cups found");
          return -1;
       
        case 'S':
          // console.log("swords found");
          return 1;
        
        case 'W':
          // console.log("wands found");
          return 1;
        
        default:
          return 0;
      }
    },

    getMDeltaFromSuit: (suit) => {
      
      switch (suit) {      

        case 'D':
          // console.log("disks found");
          return -1;
       
        case 'C':
          // console.log("cups found");
          return 1;
       
        case 'S':
          // console.log("swords found");
          return 1;
        
        case 'W':
          // console.log("wands found");
          return -1;
        
        default:
          return 0;
      }
    },

    validateSelectionVoid: (selectedCardsForDaemon,
                            selectedCardsForPlayer) => {

      let outcome = true;

      // VOID allows all possible combinations, requiring
      // only that there be one from each tree, which is
      // a base level commonality to all elements

      outcome = 
        selectedCardsForDaemon.length > 0 ||
        selectedCardsForPlayer.length > 0;

      return outcome;

    },

    validateSelectionWater: (selectedCardsForDaemon,
                             selectedCardsForPlayer) => {

      //assume true
      let outcome = true;

      const affinityMap = new Map();

      // water treats all as one group, so consolidate
      const allCardKeys = 
        [
          ...selectedCardsForPlayer, 
          ...selectedCardsForDaemon
        ];

      if(allCardKeys.length < 2){
        outcome = false;
      }

      for(const cardKey of allCardKeys){

        const cardSuit = self.parseSuit(cardKey);
        const cardRank = self.parseRank(cardKey, cardSuit);

        if(!affinityMap.has(cardSuit)){
          affinityMap.set(cardSuit, 1);
        } else {
          affinityMap.set(cardSuit, affinityMap.get(cardSuit) + 1);
        }

        if(!affinityMap.has(cardRank)){
          affinityMap.set(cardRank, 1);
        } else {
          affinityMap.set(cardRank, affinityMap.get(cardRank) + 1);
        }
      }

      // a broken chain can be detected by one card
      // having no other cards sharing an affinity
      for(const cardKey of allCardKeys){

        const cardSuit = self.parseSuit(cardKey);
        const cardRank = self.parseRank(cardKey, cardSuit);

        if(affinityMap.get(cardSuit) < 2 &&
           affinityMap.get(cardRank) < 2){
          // no connections, broken chain
          outcome = false;
        }
      }

      return outcome;

    },

    validateSelectionAir: (selectedCardsForDaemon,
                           selectedCardsForPlayer) => {

      const affinityMapPlayer = new Map();
      const affinityMapDaemon = new Map();

      //assume true, we will test for validity violations
      //and flip this flag if any are found
      let outcome = true;

      if(selectedCardsForPlayer.length < 1 || 
         selectedCardsForDaemon.length < 1){
        outcome = false;
      }

      for(const cardKey of selectedCardsForPlayer){

        const cardSuit = self.parseSuit(cardKey);
        const cardRank = self.parseRank(cardKey, cardSuit);

        if(!affinityMapPlayer.has(cardSuit)){
          affinityMapPlayer.set(cardSuit, 1);
        } else {
          affinityMapPlayer.set(cardSuit, affinityMapPlayer.get(cardSuit) + 1);
        }

        if(!affinityMapPlayer.has(cardRank)){
          affinityMapPlayer.set(cardRank, 1);
        } else {
          affinityMapPlayer.set(cardRank, affinityMapPlayer.get(cardRank) + 1);
        }
      }

      for(const cardKey of selectedCardsForDaemon){

        const cardSuit = self.parseSuit(cardKey);
        const cardRank = self.parseRank(cardKey, cardSuit);

        if(!affinityMapDaemon.has(cardSuit)){
          affinityMapDaemon.set(cardSuit, 1);
        } else {
          affinityMapDaemon.set(cardSuit, affinityMapDaemon.get(cardSuit) + 1);
        }

        if(!affinityMapDaemon.has(cardRank)){
          affinityMapDaemon.set(cardRank, 1);
        } else {
          affinityMapDaemon.set(cardRank, affinityMapDaemon.get(cardRank) + 1);
        }
      }

      for(const [key, value] of affinityMapDaemon){

        if(value > 1){
          outcome = false;
        }
      }

      for(const [key, value] of affinityMapPlayer){

        if(value > 1){
          outcome = false;
        }
      }

      return outcome;
    },

    validateSelectionEarth: (selectedCardsForDaemon,
                             selectedCardsForPlayer) => {

      let outcome = false;

      let isSolitary = 
        selectedCardsForPlayer.length === 1 &&
        selectedCardsForDaemon.length === 1;

      if(isSolitary){

        let playerCardKey = selectedCardsForPlayer[0];
        let daemonCardKey = selectedCardsForDaemon[0];

        let daemonSuit = self.parseSuit(daemonCardKey);
        let playerSuit = self.parseSuit(playerCardKey);
       

        if(daemonSuit === playerSuit){

          outcome = true;

        } else {

          let daemonRank = self.parseRank(daemonCardKey, daemonSuit);
          let playerRank = self.parseRank(playerCardKey, playerSuit);

          if(playerRank === daemonRank){

            outcome = true;
          }
        }

      }

      return outcome;
    },

    validateSelectionFire: (selectedCardsForPlayer,
                            selectedCardsForDaemon) => {

      // COPIED FROM EARTH (MODIFY)
      // Expanding and Solitary (Hot and Dry)
      // one card from each tree
      // valid selection is neither sharing suit or rank

      let outcome = false;
      
      if(!selectedCardsForPlayer || !selectedCardsForDaemon){

        return outcome;
      }

      let isSolitary = selectedCardsForPlayer.length === 1 &&
                         selectedCardsForDaemon.length === 1;

      if(isSolitary){

        let playerCardKey = selectedCardsForPlayer[0];
        let daemonCardKey = selectedCardsForDaemon[0];

        let daemonSuit = self.parseSuit(daemonCardKey);
        let playerSuit = self.parseSuit(playerCardKey);

        let daemonRank = self.parseRank(daemonCardKey, daemonSuit);
        let playerRank = self.parseRank(playerCardKey, playerSuit);

        outcome = 
          daemonSuit != playerSuit &&
          daemonRank != playerRank;
      }

      return outcome;
    },

    newDealEligibleVoid: (daemonCards, playerCards) => {

      return daemonCards.length > 0 && playerCards.length > 0;
    },

    newDealEligibleWater: (daemonCards, playerCards) => {
      
      //copied from boardCE, not fully tested

      if(!playerCards || !daemonCards){
        return true;
      }

      const allPossible = 
        self.allPossibleCombos(playerCards, daemonCards);

      //card selection will be single, so we just need to find one
      // pairing that shares either a suit or a rank
      for(const keyPair of allPossible){
        
        const pCardKey = keyPair[0];
        const dCardKey = keyPair[1];
        
        const dSuit = self.parseSuit(dCardKey);
        const pSuit = self.parseSuit(pCardKey);

        if(dSuit === pSuit){

          // newDealEligible is false
          return false;
        }

        const dRank = self.parseRank(dCardKey, dSuit);
        const pRank = self.parseRank(pCardKey, pSuit);

        if(dRank === pRank){

          // newDealEligible is false
          return false;
        }

      }

      return true;
    },

    newDealEligibleAir: (daemonCards, playerCards) => {
      
      //copied from boardCE, not fully tested

      if(!playerCards || !daemonCards){
        return true;
      }

      const allPossible = 
        self.allPossibleCombos(daemonCards, playerCards);

      //card selection will be single, so we just need to find one
      // pairing that shares neither a suit or a rank
      for(const keyPair of allPossible){
        
        const pCardKey = keyPair[0];
        const dCardKey = keyPair[1];
        
        const dSuit = self.parseSuit(dCardKey);
        const pSuit = self.parseSuit(pCardKey);

        const dRank = self.parseRank(dCardKey, dSuit);
        const pRank = self.parseRank(pCardKey, pSuit);

        if(dSuit != pSuit && dRank != pRank){

          // newDealEligible is false
          return false;
        }
      }
    },

    newDealEligibleEarth: (daemonCards, playerCards) => {
      
      //copied from boardCE, not fully tested

      if(!playerCards || !daemonCards){
        return true;
      }


      const allPossible = 
        self.allPossibleCombos(daemonCards, playerCards);

      //card selection will be single, so we just need to find one
      // pairing that shares either a suit or a rank
      for(const keyPair of allPossible){
        
        const pCardKey = keyPair[0];
        const dCardKey = keyPair[1];
        
        const dSuit = self.parseSuit(dCardKey);
        const pSuit = self.parseSuit(pCardKey);

        if(dSuit === pSuit){

          // newDealEligible is false
          return false;
        }

        const dRank = self.parseRank(dCardKey, dSuit);
        const pRank = self.parseRank(pCardKey, pSuit);

        if(dRank === pRank){

          // newDealEligible is false
          return false;
        }
      }


    },

    newDealEligibleFire: (daemonCards, playerCards) => {
      
      //copied from boardCE, not fully tested

      if(!playerCards || !daemonCards){
        return true;
      }

      const allPossible = 
        self.allPossibleCombos(playerCards, daemonCards);

      //card selection will be single, so we just need to find one
      // pairing that shares either a suit or a rank
      for(const keyPair of allPossible){
        
        const pCardKey = keyPair[0];
        const dCardKey = keyPair[1];
        
        const dSuit = self.parseSuit(dCardKey);
        const pSuit = self.parseSuit(pCardKey);

        if(dSuit === pSuit){

          // newDealEligible is false
          return false;
        }

        const dRank = self.parseRank(dCardKey, dSuit);
        const pRank = self.parseRank(pCardKey, pSuit);

        if(dRank === pRank){

          // newDealEligible is false
          return false;
        }
      }


    },

    selResValVoid: (selectedCardsForPlayer, 
                    selectedCardsForDaemon) => {
      
      //copied from boardCE, not fully tested
            
      let outcome = [];

      if(selectedCardsForDaemon.length == 0 && 
         selectedCardsForPlayer.length == 0){

        return outcome;
      }

      // void allows all selections, consolidate into one group
      const allCardKeys = 
        [
          ...selectedCardsForPlayer, 
          ...selectedCardsForDaemon
        ];

      for(const cardKey of allCardKeys){
        outcome.push(cardKey);
      }

      return outcome;
    },

    selResValWater: (selectedCardsForPlayer, 
                     selectedCardsForDaemon) => {
      
      //copied from boardCE, not fully tested
            
      let outcome = [];

      // water treats all as one group, so consolidate
      const allCardKeys = 
        [
          ...selectedCardsForPlayer, 
          ...selectedCardsForDaemon
        ];

      for(const cardKey of allCardKeys){
        outcome.push(cardKey);
      }

      return outcome;
    },

    selResValAir: (selectedCardsForPlayer, 
                   selectedCardsForDaemon) => {
      
      //copied from boardCE, not fully tested
            
      let outcome = [];

      for(let i = 0; i < 3; i++){

        const pCardKey = selectedCardsForPlayer[i];
        const dCardKey = selectedCardsForDaemon[i];

        if(pCardKey && dCardKey){
          
          

          const dSuit = self.parseSuit(dCardKey);
          const pSuit = self.parseSuit(pCardKey);

          const dRank = self.parseRank(dCardKey, dSuit);
          const pRank = self.parseRank(pCardKey, pSuit);

          if(dRank > pRank){
            outcome.push(dCardKey);
          }else{
            outcome.push(pCardKey);
          }
        }
      }

      return outcome;
    },

    selResValEarth: (selectedCardsForDaemon, 
                     selectedCardsForPlayer) => {
      
      let outcome = [];

      if(!self.validateSelectionEarth(
          selectedCardsForDaemon, selectedCardsForPlayer)){

        return outcome;

      }

      let playerCardKey = selectedCardsForPlayer[0];
      let daemonCardKey = selectedCardsForDaemon[0];
      
      outcome.push(daemonCardKey);
      outcome.push(playerCardKey);

      return outcome;
    },

    selResValFire: (selectedCardsForPlayer, 
                     selectedCardsForDaemon) => {
      
      //copied from boardCE, not fully tested
            
      let outcome = [];
            
      const pCardKey = selectedCardsForPlayer[0];
      const dCardKey = selectedCardsForDaemon[0];

      if(pCardKey && dCardKey){
        
        

        const dSuit = self.parseSuit(dCardKey);
        const pSuit = self.parseSuit(pCardKey);

        const dRank = self.parseRank(dCardKey, dSuit);
        const pRank = self.parseRank(pCardKey, pSuit);

        if(dRank > pRank){
         outcome.push(dCardKey);
        }else{
         outcome.push(pCardKey);
        }
      }

      return outcome;
    },

  };

  return self;

};

export default KnechtController;