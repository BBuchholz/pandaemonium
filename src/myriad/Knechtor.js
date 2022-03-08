export class Knechtor {

  constructor(){

  }

  parseSuit(cardValue){

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
  }

  parseRank(cardValue, suitKey){

    let rank = '';
    if(cardValue){
      rank = parseInt(cardValue.replace(suitKey, ''))
    }
    return rank;
  }

  dealTwelveTrees(){
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
      // NOT THE END OF THE WORLD FOR THIS BUILD BUT 
      // EVENTUALLY I WOULD LIKE TO BE ABLE TO CHANGE
      // THE CONSTANTS WITH USER CONFIGS SO IT SHOULDN"T 
      // BE HARDCODED IN THE "EVENTUALLY" MANIFESTATION
      // let seed = keysElemental;

      this.shuffle(seed);
      return seed;
  }

  shuffle(array){
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
  }

  getAllValidSelections(
    aewonicCross,
    currentQuadrant
  ){

    let validSelections = [];

    if(currentQuadrant === 'Fire'){

      let daemonCards = [
        aewonicCross[0],
        aewonicCross[2],
        aewonicCross[4],
      ];

      let playerCards = [
        aewonicCross[1],
        aewonicCross[3],
        aewonicCross[5],
      ];

      
    }

    return validSelections;
  }

  getNextValidSelection(
    currentPlayerCardKey, 
    selectedCards, 
    aewonicCross, 
    currentQuadrant
  ){

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

      //FIRST: let's modify to use all cards instead of
      // daemonCards, like let's change how they are implemented
    }

    return returnSet;
  }
}