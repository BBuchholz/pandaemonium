/////////////////////////////////
// BOARD CE STORES
/////////////////////////////////

import { writable, derived } from 'svelte/store';
import KnechtController from '../myriad/KnechtController.js';

import { 
  keysVirgo, 
  keysTaurus, 
  keysCapricorn, 
  keysLibra, 
  keysGemini, 
  keysAquarius,
  keysPisces, 
  keysScorpio,
  keysCancer,
  keysSagittarius,
  keysLeo,
  keysAries
} from '../constants.js'; 

const magisterLudi = KnechtController();
const testingElementalVessels = false;

export const modal = writable(null);
export const passPhrase = writable('');

export const toDos = writable([]);

export const rulesIncludeElementalShiftsOnAllCollections =
  writable(false);

export const selectedQuadrant = writable('');

export const devMode = writable(false);

export const selectedCardsForPlayer = writable([]);
export const selectedCardsForDaemon = writable([]);


export const selectedCards = derived(
  [selectedCardsForDaemon, selectedCardsForPlayer],
  ([$selectedCardsForDaemon, $selectedCardsForPlayer]) => {
    return [...$selectedCardsForDaemon, ...$selectedCardsForPlayer];
  }
);

export const selectedEarthSign = writable('');
export const selectedWaterSign = writable('');
export const selectedAirSign = writable('');
export const selectedFireSign = writable('');

export const playerCards = writable([]);
export const daemonCards = writable([]);
export const deck = writable([]);

export const airColCountChanged = writable(false);
export const earthColCountChanged = writable(false);
export const fireColCountChanged = writable(false);
export const waterColCountChanged = writable(false);

export const collectedRecentlyFire = writable([]);
export const collectedRecentlyWater = writable([]);
export const collectedRecentlyAir = writable([]);
export const collectedRecentlyEarth = writable([]);


export const fireCollection = writable([]);

export const fireColCount = derived(
  fireCollection,
  ($fireCollection) => {
    return $fireCollection.length;
  }
);

export const collectedSagittarius = derived(
  fireCollection,
  ($fireCollection) => {

    for(const cardKey of keysSagittarius){

      if(!$fireCollection.includes(cardKey)){
        
        return false;
      }
    }

    return true;
  }
);

export const collectedLeo = derived(
  fireCollection,
  ($fireCollection) => {

    for(const cardKey of keysLeo){

      if(!$fireCollection.includes(cardKey)){
        
        return false;
      }
    }

    return true;
  }
);

export const collectedAries = derived(
  fireCollection,
  ($fireCollection) => {

    for(const cardKey of keysAries){

      if(!$fireCollection.includes(cardKey)){
        
        return false;
      }
    }

    return true;
  }
);


export const collectedFire = derived(
  [collectedAries, collectedLeo, collectedSagittarius],
  ([$collectedAries, $collectedLeo, $collectedSagittarius]) => {

    return testingElementalVessels || $collectedAries && $collectedLeo && $collectedSagittarius;
  }
);

export const earthCollection = writable([]);

export const earthColCount = derived(
  earthCollection,
  ($earthCollection) => {
    return $earthCollection.length;
  }
);

export const collectedVirgo = derived(
  earthCollection,
  ($earthCollection) => {

    for(const cardKey of keysVirgo){

      if(!$earthCollection.includes(cardKey)){

        return false;
      }
    }

    return true;
  }
);

export const collectedTaurus = derived(
  earthCollection,
  ($earthCollection) => {

    for(const cardKey of keysTaurus){

      if(!$earthCollection.includes(cardKey)){
        
        return false;
      }
    }

    return true;
  }
);

export const collectedCapricorn = derived(
  earthCollection,
  ($earthCollection) => {

    for(const cardKey of keysCapricorn){

      if(!$earthCollection.includes(cardKey)){
        
        return false;
      }
    }

    return true;
  }
);

export const collectedEarth = derived(
  [collectedVirgo, collectedTaurus, collectedCapricorn],
  ([$collectedVirgo, $collectedTaurus, $collectedCapricorn]) => {
    
    return testingElementalVessels || $collectedVirgo && $collectedTaurus && $collectedCapricorn;
  }
);

export const waterCollection = writable([]);

export const waterColCount = derived(
  waterCollection,
  ($waterCollection) => {
    return $waterCollection.length;
  }
);

export const collectedPisces = derived(
  waterCollection,
  ($waterCollection) => {

    for(const cardKey of keysPisces){

      if(!$waterCollection.includes(cardKey)){
        
        return false;
      }
    }

    return true;
  }
);

export const collectedCancer = derived(
  waterCollection,
  ($waterCollection) => {

    for(const cardKey of keysCancer){

      if(!$waterCollection.includes(cardKey)){
        
        return false;
      }
    }

    return true;
  }
);

export const collectedScorpio = derived(
  waterCollection,
  ($waterCollection) => {

    for(const cardKey of keysScorpio){

      if(!$waterCollection.includes(cardKey)){
        
        return false;
      }
    }

    return true;
  }
);

export const collectedWater = derived(
  [collectedScorpio, collectedCancer, collectedPisces],
  ([$collectedScorpio, $collectedCancer, $collectedPisces]) => {
    
    return testingElementalVessels || $collectedScorpio && $collectedCancer && $collectedPisces;
  }
);

export const airCollection = writable([]);

export const airColCount = derived(
  airCollection,
  ($airCollection) => {
    return $airCollection.length;
  }
);

export const collectedAquarius = derived(
  airCollection,
  ($airCollection) => {

    for(const cardKey of keysAquarius){

      if(!$airCollection.includes(cardKey)){
        
        return false;
      }
    }

    return true;
  }
);

export const collectedGemini = derived(
  airCollection,
  ($airCollection) => {

    for(const cardKey of keysGemini){

      if(!$airCollection.includes(cardKey)){
        
        return false;
      }
    }

    return true;
  }
);

export const collectedLibra = derived(
  airCollection,
  ($airCollection) => {

    for(const cardKey of keysLibra){

      if(!$airCollection.includes(cardKey)){
        
        return false;
      }
    }

    return true;
  }
);

export const collectedAir = derived(
  [collectedLibra, collectedGemini, collectedAquarius],
  ([$collectedLibra, $collectedGemini, $collectedAquarius]) => {
    
    return testingElementalVessels || $collectedLibra && $collectedGemini && $collectedAquarius;
  }
);


export const collectedSpirit = derived(
  [collectedWater, collectedAir, collectedEarth, collectedFire],
  ([$collectedWater, $collectedAir, $collectedEarth, $collectedFire]) => {
    
    return $collectedWater && $collectedAir && $collectedEarth && $collectedFire;
  }
);

export const currentDeckCount = derived(
  [deck, playerCards, daemonCards],
  ([$deck, $playerCards, $daemonCards]) => {
    return $deck.length;
  }
);


export const buttonCounts = derived(
  [currentDeckCount],
  ([$currentDeckCount]) => {
  
    const counts = '(' + $currentDeckCount + ')';

    return counts;
  }
);

export const beforeGame = writable(true);
export const turnFinished = writable(false);
export const moistureIndex = writable(0);
export const heatIndex = writable(0);
export const nextTurnButtonText = writable('Next!');

export const resolutionIsHeated = derived(
  heatIndex,
  ($heatIndex) => {
    return $heatIndex > 0;
  }
);


export const selectionIsSingular = derived(
  moistureIndex,
  ($moistureIndex) => {
    return $moistureIndex < 1;
  }
);

export const selectionResolutionHValue = derived(
  [selectedCardsForDaemon, selectedCardsForPlayer, resolutionIsHeated],
  ([$selectedCardsForDaemon, $selectedCardsForPlayer, $resolutionIsHeated]) => {
    
    let daemonTotalHeatIndex = 0;
    let playerTotalHeatIndex = 0;
    
    for(const cardKey of $selectedCardsForDaemon){

      let cardSuit = magisterLudi.parseSuit(cardKey);
      let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
      let cardHeatDelta = magisterLudi.getHDeltaFromSuit(cardSuit) * cardRank;

      daemonTotalHeatIndex += cardHeatDelta;
    }

    for(const cardKey of $selectedCardsForPlayer){
      
      let cardSuit = magisterLudi.parseSuit(cardKey);
      let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
      let cardHeatDelta = magisterLudi.getHDeltaFromSuit(cardSuit) * cardRank;

      playerTotalHeatIndex += cardHeatDelta;
    }

    let outcome = 0;

    if($resolutionIsHeated){

      outcome = playerTotalHeatIndex - daemonTotalHeatIndex;

    }else{

      outcome = playerTotalHeatIndex + daemonTotalHeatIndex;

    }

    return outcome;
  }
);

export const selectionResolutionMValue = derived(
  [selectedCardsForDaemon, selectedCardsForPlayer, resolutionIsHeated],
  ([$selectedCardsForDaemon, $selectedCardsForPlayer, $resolutionIsHeated]) => {
    
    let daemonTotalMoistureIndex = 0;
    let playerTotalMoistureIndex = 0;
    
    for(const cardKey of $selectedCardsForDaemon){

      let cardSuit = magisterLudi.parseSuit(cardKey);
      let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
      let cardMoistureDelta = magisterLudi.getMDeltaFromSuit(cardSuit) * cardRank;

      daemonTotalMoistureIndex += cardMoistureDelta;
    }

    for(const cardKey of $selectedCardsForPlayer){
      
      let cardSuit = magisterLudi.parseSuit(cardKey);
      let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
      let cardMoistureDelta = magisterLudi.getMDeltaFromSuit(cardSuit) * cardRank;

      playerTotalMoistureIndex += cardMoistureDelta;
    }

    let outcome = 0;

    if($resolutionIsHeated){

      outcome = playerTotalMoistureIndex - daemonTotalMoistureIndex;

    }else{

      outcome = playerTotalMoistureIndex + daemonTotalMoistureIndex;

    }

    return outcome;
  }
);

//THIS SHOULD BECOME "selectionIsMultiple"
//BECAUSE WE WANT VOID TO SUPPORT MULTIPLE
//AND THE MOISTURE INDEX IS 0, SO Wetness isn't
//A Factor (find all usages and replace name)
//THEN REFACTOR THIS TO REMOVE INDEXES ALL TOGETHER
//JUST HAVE IT BASED OFF OF THE CURRENT QUADRANT
export const selectionIsWet = derived(
  moistureIndex,
  ($moistureIndex) => {
    return $moistureIndex >= 0; //THIS IS A HACK, SEE ABOVE
  }
);

export const voidQuadrant = derived(
  [moistureIndex, heatIndex],
  ([$moistureIndex, $heatIndex]) => {
    return $moistureIndex == 0 && 
      $heatIndex == 0;
  }
);

export const discardCount = derived(
  [deck, earthColCount, airColCount, waterColCount, fireColCount, playerCards, daemonCards],
  ([$deck, $earthColCount, $airColCount, $waterColCount, $fireColCount, $playerCards, $daemonCards]) => {

    return 36 - $deck.length - 
           $earthColCount - 
           $airColCount -
           $waterColCount -
           $fireColCount -
           $playerCards.length -
           $daemonCards.length;
  }
);

export const currentQuadrant = derived(
  [voidQuadrant, selectionIsWet, resolutionIsHeated],
  ([$voidQuadrant, $selectionIsWet, $resolutionIsHeated]) => {

    // Quadrant Determination follows the Empedoclean Elements
    // see: https://en.wikipedia.org/wiki/Classical_element#Greece 

    if($voidQuadrant){

      return 'Void';
    }

    if($selectionIsWet){

      if($resolutionIsHeated){

        // Wet and Hot = Air
        return 'Air';

      }else{

        // Wet and Cold = Water
        return 'Water';
      }

    }else{

      if($resolutionIsHeated){

        // Dry and Hot
        return 'Fire';
        
      }else{

        // Dry and Cold
        return 'Earth';
      }
    }
  }
);

export const selectionIsValid = derived(
  [selectedCardsForPlayer,
   selectedCardsForDaemon,
   currentQuadrant],
    ([$selectedCardsForPlayer,
      $selectedCardsForDaemon,
      $currentQuadrant]) => {

      let outcome = false;

      if($currentQuadrant === 'Void'){

        outcome = 
          magisterLudi.validateSelectionVoid(
            $selectedCardsForDaemon, $selectedCardsForPlayer);
      }

      if($currentQuadrant === 'Water'){

        outcome = 
          magisterLudi.validateSelectionWater(
            $selectedCardsForDaemon, $selectedCardsForPlayer);
      }


      if($currentQuadrant === 'Air'){

        outcome = 
          magisterLudi.validateSelectionAir(
            $selectedCardsForDaemon, $selectedCardsForPlayer);
      }


      if($currentQuadrant === 'Earth'){

        ///////////////////////////////////////////////////
        //
        // TODO R9: create tests to define expected outcomes
        //
        ///////////////////////////////////////////////////

        outcome = 
          magisterLudi.validateSelectionEarth(
            $selectedCardsForDaemon, $selectedCardsForPlayer);

      }


      if($currentQuadrant === 'Fire'){

        ///////////////////////////////////////////////////
        //
        // TODO R11: create tests to define expected outcomes
        //
        ///////////////////////////////////////////////////

        outcome = 
          magisterLudi.validateSelectionFire(
            $selectedCardsForPlayer, $selectedCardsForDaemon);        
      
      }

      return outcome;
    } 
);

export const selectionResolutionValue = derived(
  [selectedCardsForDaemon, 
   selectedCardsForPlayer, 
   currentQuadrant,
   selectionIsValid],
  ([$selectedCardsForDaemon, 
    $selectedCardsForPlayer, 
    $currentQuadrant,
    $selectionIsValid]) => {

    let outcome = [];

    if(!$selectionIsValid){

      return outcome;
    }

    if($currentQuadrant === 'Void'){
      
      outcome = 
        magisterLudi.selResValVoid(
          $selectedCardsForPlayer, $selectedCardsForDaemon);

    }

    if($currentQuadrant === 'Water'){
      
        ///////////////////////////////////////////////////
        //
        // TODO R8: create tests to define expected outcomes
        //
        ///////////////////////////////////////////////////

      outcome = 
        magisterLudi.selResValWater(
          $selectedCardsForPlayer, $selectedCardsForDaemon);

    }

    if($currentQuadrant === 'Air'){
      
      outcome = 
        magisterLudi.selResValAir(
          $selectedCardsForPlayer, $selectedCardsForDaemon);

    }

    if($currentQuadrant === 'Earth'){
      
      outcome = 
        magisterLudi.selResValEarth(
          $selectedCardsForPlayer, $selectedCardsForDaemon);

    }

    if($currentQuadrant === 'Fire'){

      outcome = 
        magisterLudi.selResValFire(
          $selectedCardsForPlayer, $selectedCardsForDaemon);

    }

    return outcome;
  }
);

export const newDealEligible = derived(
  [playerCards, 
   daemonCards,
   currentQuadrant],
  ([$playerCards, 
    $daemonCards,
    $currentQuadrant]) => {

    if($playerCards.length === 0 ||
       $daemonCards.length === 0){

      // in between deals, no Valid moves not applicable, return false
      return false;
    }

    if($currentQuadrant === 'Void'){

        return magisterLudi.newDealEligibleVoid(
          $daemonCards, $playerCards);

    }

    if($currentQuadrant === 'Water'){

        ///////////////////////////////////////////////////
        //
        // TODO R12: create tests to define expected outcomes
        //
        ///////////////////////////////////////////////////

        return magisterLudi.newDealEligibleWater(
          $daemonCards, $playerCards);

    }

    if($currentQuadrant === 'Air'){

        ///////////////////////////////////////////////////
        //
        // TODO R10: create tests to define expected outcomes
        //
        ///////////////////////////////////////////////////

        return magisterLudi.newDealEligibleAir(
          $daemonCards, $playerCards);
    }

    if($currentQuadrant === 'Earth'){

        return magisterLudi.newDealEligibleEarth(
          $daemonCards, $playerCards);

    }

    if($currentQuadrant === 'Fire'){

        return magisterLudi.newDealEligibleFire(
          $daemonCards, $playerCards);

    }

    // newDealEligible is true
    return true;
  }
);

export const currentStateText = derived(
  [fireCollection, 
   waterCollection,
   airCollection,
   earthCollection],
  ([$fireCollection,
    $waterCollection,
    $airCollection,
    $earthCollection]) => {
    
    return "Fire Collection: [" + $fireCollection + `] 
` +
           "Water Collection: [" + $waterCollection + `] 
` +
           "Air Collection: [" + $airCollection + `] 
` +
           "Earth Collection: [" + $earthCollection + `] 
`;
  }
);