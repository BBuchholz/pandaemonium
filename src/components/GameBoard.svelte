<script>

  import { onMount } from 'svelte';

  // import DaemonArea from './DaemonArea.svelte';
  // import PlayerArea from './PlayerArea.svelte';
  import DaemonArea from './DaemonAreaMod.svelte';
  import PlayerArea from './PlayerAreaMod.svelte';

  import KnechtController from '../myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  import { 
    selectedCardsForPlayer, 
    selectedCardsForDaemon,
    playerCards,
    daemonCards, 
    beforeGame,
    deck,
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
    collectedRecentlyEarth
    } from '../stores.js';


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

  function startGame() {
    $beforeGame = false;
    // console.log('starting game...');
    loadDeck(); 
    playTurn();
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

    processCardComparison();

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

  function processCardComparison() {

    for(const cardKey of $selectionResolutionValue){

      let cardSuit = magisterLudi.parseSuit(cardKey);

      console.log('cardSuit: ' + cardSuit);

      if(cardSuit === 'D'){
        
        if(!$earthCollection.includes(cardKey)){
          
          $earthCollection = [...$earthCollection, cardKey];
          $earthColCountChanged = true;
          $collectedRecentlyEarth = [...$collectedRecentlyEarth, cardKey];
        }
        
        
      }

      if(cardSuit === 'W'){
        
        if(!$fireCollection.includes(cardKey)){
          
          $fireCollection = [...$fireCollection, cardKey];
          $fireColCountChanged = true;
          $collectedRecentlyFire = [...$collectedRecentlyFire, cardKey];
        }
        
      }

      if(cardSuit === 'S'){
        
        if(!$airCollection.includes(cardKey)){
          
          $airCollection = [...$airCollection, cardKey];
          $airColCountChanged = true;
          $collectedRecentlyAir = [...$collectedRecentlyAir, cardKey];
        }
        
      }

      if(cardSuit === 'C'){
        
        if(!$waterCollection.includes(cardKey)){
          
          $waterCollection = [...$waterCollection, cardKey];
          $waterColCountChanged = true;
          $collectedRecentlyWater = [...$collectedRecentlyWater, cardKey];
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