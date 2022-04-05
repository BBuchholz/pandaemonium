<script>

  import { onMount } from 'svelte';

  import DaemonArea from './boardAC/DaemonAreaMod.svelte';
  import PlayerArea from './boardAC/PlayerAreaMod.svelte';

  import KnechtController from './myriad/KnechtController.js';
  const magisterLudi = KnechtController();
  
  import {
    devMode,
  } from './stores.js';

  import { 
    selectedCardsForPlayer, 
    selectedCardsForDaemon,
    playerCards,
    daemonCards, 
    beforeGame,
    deck,
    passPhrase,
    selectionResolutionMValue,
    selectionResolutionHValue,
    selectionResolutionValue,
    heatIndex,
    currentDeckCount,
    discardCount,
    moistureIndex,
    turnFinished,
    earthCollection,
    fireCollection,
    airCollection,
    waterCollection,
    airColCountChanged,
    fireColCountChanged,
    waterColCountChanged,
    earthColCountChanged,
    collectedRecentlyFire,
    collectedRecentlyWater,
    collectedRecentlyAir,
    collectedRecentlyEarth,
    rulesIncludeElementalShiftsOnAllCollections
  } from './boardAC/stores.js';


  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  function notifySelectionResolutionValue(){
    addNotification({
      position: 'bottom-right',
      text: 'collected ' + $selectionResolutionValue,
      type: 'error',
      description: 'lorem ipsum',
      removeAfter: 4000,
    });
  }

  function notifyElementChange(){
    // addNotification({
    //   position: 'bottom-right',
    //   text: $currentElementRuleText,
    //   type: 'error',
    //   description: 'lorem ipsum',
    // });
  }

  function notifyPassPhraseFound(){
    addNotification({
      position: 'top-right',
      text: 'passPhrase Found',
      type: 'error',
      description: 'passPhrase: ' + $passPhrase,
    });
  }

  function startGame() {
    $beforeGame = false;
    // console.log('starting game...');
    loadDeck(); 
    // playTurn();
    dealCards();
  }

  function loadDeck() {

    const fullDeck = magisterLudi.dealTwelveTrees();

    const newDeckMinusFire = fullDeck.filter(cardKey => !$fireCollection.includes(cardKey));

    const newDeckMinusWater = newDeckMinusFire.filter(cardKey => !$waterCollection.includes(cardKey));

    const newDeckMinusAir = newDeckMinusWater.filter(cardKey => !$airCollection.includes(cardKey));

    const newDeckMinusEarth = newDeckMinusAir.filter(cardKey => !$earthCollection.includes(cardKey));
    
    $deck = newDeckMinusEarth;

    // console.log('deck length: ' + $deck.length);
  }

  function playTurn() {

    dealCards();
  }

  function resetSelection() {

    // roundFinished = true;
    $selectedCardsForPlayer = [];
    $selectedCardsForDaemon = [];
    $playerCards = [];
    $daemonCards = [];
    // console.log('selection reset');
  }

  // function selectCard(cardKey) {
  //   console.log('selected ' + cardKey);
  // }

  function handleSelectionConfirmed() {
    // console.log('selection confirmed'); 

    processCardCollection();

    $turnFinished = true;
  }

  function nextTurn() {

    $turnFinished = false;
    $earthColCountChanged = false;
    $fireColCountChanged = false;
    $airColCountChanged = false;
    $waterColCountChanged = false;

    $collectedRecentlyFire = [];
    $collectedRecentlyWater = [];
    $collectedRecentlyAir = [];
    $collectedRecentlyEarth = [];
    
    dealCards();
  }

  function processCardCollection() {

    for(const cardKey of $selectionResolutionValue){

      let cardSuit = magisterLudi.parseSuit(cardKey);

      console.log('cardSuit: ' + cardSuit);

      if(cardSuit === 'D'){
        
        if(!$earthCollection.includes(cardKey)){
          
          $earthCollection = [...$earthCollection, cardKey];
          $earthColCountChanged = true;
          $collectedRecentlyEarth = [...$collectedRecentlyEarth, cardKey];

          if($rulesIncludeElementalShiftsOnAllCollections){

            $heatIndex = $heatIndex - 1;
            $moistureIndex = $moistureIndex - 1;
          }
        }
        
        
      }

      if(cardSuit === 'W'){
        
        if(!$fireCollection.includes(cardKey)){
          
          $fireCollection = [...$fireCollection, cardKey];
          $fireColCountChanged = true;
          $collectedRecentlyFire = [...$collectedRecentlyFire, cardKey];

          if($rulesIncludeElementalShiftsOnAllCollections){

            $heatIndex = $heatIndex + 1;
            $moistureIndex = $moistureIndex - 1;
          }
        }
        
      }

      if(cardSuit === 'S'){
        
        if(!$airCollection.includes(cardKey)){
          
          $airCollection = [...$airCollection, cardKey];
          $airColCountChanged = true;
          $collectedRecentlyAir = [...$collectedRecentlyAir, cardKey];

          if($rulesIncludeElementalShiftsOnAllCollections){

            $heatIndex = $heatIndex + 1;
            $moistureIndex = $moistureIndex + 1;
          }
        }
        
      }

      if(cardSuit === 'C'){
        
        if(!$waterCollection.includes(cardKey)){
          
          $waterCollection = [...$waterCollection, cardKey];
          $waterColCountChanged = true;
          $collectedRecentlyWater = [...$collectedRecentlyWater, cardKey];

          if($rulesIncludeElementalShiftsOnAllCollections){

            $heatIndex = $heatIndex - 1;
            $moistureIndex = $moistureIndex + 1;
          }
        }
        
      }
    }

    notifySelectionResolutionValue();

    resetSelection();
    // console.log('card comparison processed');
  }

  function outOfCards() {

    const toReshuffle = $currentDeckCount + $discardCount;

    if(toReshuffle > 1) {
   
      alert('out of cards, reshuffling ' + toReshuffle + ' cards...');
      loadDeck();
      playTurn(); 
    
    } else if (toReshuffle === 1) {

      alert('only one card in deck, need to redeem to continue');
      $turnFinished = true;

    } else {

      alert('all cards collected! you rock!');
      $beforeGame = true;

    }

  }

  function dealCards() {

    if($deck.length == 0){
      
      outOfCards();
      return;
    }

    var cardsToDeal = 3;

    while((cardsToDeal * 2) > $deck.length){
      cardsToDeal -= 1;
    }

    if(cardsToDeal == 0){

      outOfCards();
      return;
    }

    $daemonCards = [];
    $playerCards = [];

    for(let i = 0; i < cardsToDeal; i++){
      $daemonCards = [...$daemonCards, $deck.pop()];
      $playerCards = [...$playerCards, $deck.pop()];
    }

  }


  function setupDevMode(quadrantToSelect, keysToRedeem){

    console.log('setting up dev mode');

    //filter keys from each collection
    $waterCollection =  $waterCollection.filter(
                          cardKey => 
                          !keysToRedeem.includes(cardKey)
                        );
    
    $airCollection =  $airCollection.filter(
                          cardKey => 
                          !keysToRedeem.includes(cardKey)
                        );
    
    $earthCollection =  $earthCollection.filter(
                          cardKey => 
                          !keysToRedeem.includes(cardKey)
                        );
    
    $fireCollection =  $fireCollection.filter(
                          cardKey => 
                          !keysToRedeem.includes(cardKey)
                        );

    console.log('dev mode quadrant selection not yet supported');
    //PORTED FROM BOARD MONDE, NEEDS ADAPTING
    //select quadrant without redeeming
    //$selectedQuadrant = quadrantToSelect;

        
  } 


  function fillAllElementalVessels(){

      $waterCollection = [
        '1C', '2C', '3C', 
        '4C', '5C', '6C',
        '7C', '8C', '9C'
      ];

      $airCollection = [
        '1S', '2S', '3S', 
        '4S', '5S', '6S',
        '7S', '8S', '9S'
      ];

      $earthCollection = [
        '1D', '2D', '3D', 
        '4D', '5D', '6D',
        '7D', '8D', '9D'
      ];

      $fireCollection = [
        '1W', '2W', '3W', 
        '4W', '5W', '6W',
        '7W', '8W', '9W'
      ];

  }

  initialize();

  function initialize(){

    if($devMode){

      fillAllElementalVessels();

      //use this to selectively redeem
      //some keys for testing particular 
      //gameplay scenarios
      const keysToRedeem = [
        // '3C', '6C', '9C',
        // '3S', '6S', '9S',
        // '3D', '6D', '9D',
        // '3W', '6W', '9W',
      ];

      //this will bypass the redemption
      //on selection so we can specify
      //a quadrant and surgically target
      //specific deck compositions
      setupDevMode('Earth', keysToRedeem);
    }
  }

</script>

  <div class="game-board">

    <DaemonArea />

    <PlayerArea 
      on:startGame={ e => startGame(e.detail) }
      on:nextTurn={ e => nextTurn(e.detail) } 
      on:selectionConfirmed={ e => handleSelectionConfirmed(e.detail) }
    />

  </div> 


<style>

.game-board {
  height: 100%;
  position: absolute;
  height: 100vh;
  width: 100%;
}

</style>