export class Knechtor {

  constructor(){

  }

  parseSuit(cardValue){

    try{

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

    }catch(error){

      console.log(error);
      return '?';
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

  getPlayerCards(aewonicCross){

    const playerCards = [
      aewonicCross[5],
      aewonicCross[3],
      aewonicCross[1],
    ];

    return playerCards;
  }

  getDaemonCards(aewonicCross){

    const daemonCards = [
      aewonicCross[0],
      aewonicCross[2],
      aewonicCross[4],
    ];

    return daemonCards;
  }

  getAllValidSelections(
    aewonicCross,
    currentQuadrant
  ){

    let validSelections = [];

    if(currentQuadrant === 'Fire'){

      const daemonCards = this.getDaemonCards(aewonicCross);

      const playerCards = this.getPlayerCards(aewonicCross);

      for(const cardKey of playerCards){
        for(const dKey of daemonCards){
          validSelections.push([cardKey, dKey]);
        }
      }

      
    }
 
    return validSelections;
  }

  getNextValidSelection(
    currentPlayerCardKey, 
    selectedCards, 
    aewonicCross, 
    currentQuadrant
  ){

    const possibleSelectionsForCardKey = 
      this.getAllValidSelections(
        aewonicCross, 
        'Fire'
      ).filter(
        (selection) => 
        selection.includes(currentPlayerCardKey));

      

    if(selectedCards.length === 1){

      return possibleSelectionsForCardKey[0];
    }

    if(currentQuadrant === 'Fire'){

      for(let i = 0; i < possibleSelectionsForCardKey.length; i++){

        let thisSelection = possibleSelectionsForCardKey[i];

        // console.log(selectedCards + " " + thisSelection);

        if(JSON.stringify(selectedCards) === JSON.stringify(thisSelection)){
          
          // console.log('found selectedCards');
          

          if(i !== possibleSelectionsForCardKey.length - 1){

            //if it's not the last one, return the next one
            return possibleSelectionsForCardKey[i + 1];

          }else{
            
            //if it's the last one, return nothing
            return [];
          }          
        }

      }

      return possibleSelectionsForCardKey[1];

    }

    return [];
  }

  validateEarthSelections(dCardKey, pCardKey){

    const dSuit = this.parseSuit(dCardKey);
    const pSuit = this.parseSuit(pCardKey);

    const dRank = this.parseRank(dCardKey, dSuit);
    const pRank = this.parseRank(pCardKey, pSuit);

    return (dSuit === pSuit || dRank === pRank);

  }

  resolveEarthSelections(dCardKey, pCardKey){

    // validate earth selections takes care of
    // making sure its a valid combination,
    // so we just return the pairing

    let resolutionKeys = [];

    resolutionKeys.push(pCardKey);
    resolutionKeys.push(dCardKey);

    return resolutionKeys;
  }

  resolveFireSelections(dCardKey, pCardKey){

    let resolutionKeys = [];

    const dSuit = this.parseSuit(dCardKey);
    const pSuit = this.parseSuit(pCardKey);

    const dRank = this.parseRank(dCardKey, dSuit);
    const pRank = this.parseRank(pCardKey, pSuit);

    // CHANGE THIS, SHOULD BE NEW WAY

    if(dSuit === pSuit){
      // same suit, in fire, the primordial takes precedence
      // within its own domain, so lower ranks resolve over
      // higher ranks (earlier numbers over latter)

      if(dRank < pRank){
        resolutionKeys.push(dCardKey);
      }else{
        resolutionKeys.push(pCardKey);
      }

    }else{

      // different suit, will favors development
      // hence higher ranks will resolve over lower ranks
      // ties go to the daemon (will doesn't share well)

      if(dRank < pRank){
        resolutionKeys.push(pCardKey);
      }else{
        resolutionKeys.push(dCardKey);
      }
    }


    return resolutionKeys;
  }
}