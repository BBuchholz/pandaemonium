<script>

  import { onMount } from 'svelte';

  import DaemonArea from './boardCE/DaemonAreaMod.svelte';
  import PlayerArea from './boardCE/PlayerAreaMod.svelte';

  import KnechtController from './myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  import {
    devMode,
    devNotifyDelay,
    previousTurnInfoForCopyDialog,
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
    rulesIncludeElementalShiftsOnAllCollections,
    toDos,
  } from './boardCE/stores.js';


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



  function notifyDevInfo(infoTitle, infoDesc, position){

    let removeAfterTime;

    if($devNotifyDelay){

      //NB: position 0 will always be forever
      // THIS IS INTENTIONAL
      removeAfterTime = position * 300;

    }else{

      removeAfterTime = 0;
    }

    addNotification({
      position: 'top-right',
      text: 'Dev Info: ' + infoTitle,
      type: 'error',
      description: infoDesc,
      removeAfter: removeAfterTime,
    });
  }

  function notifyDeckInfo(infoDesc){
    addNotification({
      position: 'top-right',
      text: 'Deck Info',
      type: 'error',
      description: infoDesc,
      removeAfter: 2000,
    }); 
  }

  function notifyAllDevInfos(){

    const devInfoText = 
      'Welcome to Board CE, currently in dev mode. ' +
      'It is identical to Board AC, but will be replacing ' +
      'Card with ModCard (displaying zodiacal affinities). ' + 
      'Other changes will be made to Board CE going forward, ' +
      'with Board AC preserved as is for reference.';

    notifyDevInfo('ModCard', devInfoText, 1);

    const devInfoText2 = 
      'The goal is to get all components into a portable ' +
      'format that applies to all boards, eg. all boards ' +
      'should get their vessels from the vessels/ directory ' +
      'and any variations in behavior should be encapsulated ' +
      'in such a manner as to be configurables';

    notifyDevInfo('Configurables', devInfoText2, 2);
    
  }

  function notifyAllToDos(){

    if($toDos.length == 0){
      return;
    }

    let multilineTodos = '';

    for(let i = 0; i < $toDos.length; i++){

      const count = i + 1;
      const todo = $toDos[i];
      multilineTodos += '(' + count + '.) ' + todo; 
    }

    notifyDevInfo('ToDos', multilineTodos, 0);
  }

  function startGame() {
    $beforeGame = false;
    loadDeck(); 
    dealCards();
  }

  function loadDeck() {

    const fullDeck = magisterLudi.dealTwelveTrees();

    const newDeckMinusFire = fullDeck.filter(cardKey => !$fireCollection.includes(cardKey));

    const newDeckMinusWater = newDeckMinusFire.filter(cardKey => !$waterCollection.includes(cardKey));

    const newDeckMinusAir = newDeckMinusWater.filter(cardKey => !$airCollection.includes(cardKey));

    const newDeckMinusEarth = newDeckMinusAir.filter(cardKey => !$earthCollection.includes(cardKey));
    
    $deck = newDeckMinusEarth;

  }

  function playTurn() {

    dealCards();
  }

  function resetSelection() {

    //TODO COPY NOTIFY: store the previous turn info 
    //                  here before clearing
    //Table
    //Selected
    //Collected
    //Quadrant

    let textToStore = 'Table: ';

    textToStore += JSON.stringify($daemonCards);
    textToStore += JSON.stringify($playerCards);

    textToStore += 'Selected: ';

    textToStore += JSON.stringify($selectedCardsForDaemon);
    textToStore += JSON.stringify($selectedCardsForPlayer);

    
    textToStore += 'Collected: ';

    textToStore += JSON.stringify('fill this in');
    textToStore += JSON.stringify('fill this in');

    
    textToStore += 'Quadrant: ';

    textToStore += JSON.stringify('fill this in');



    $previousTurnInfoForCopyDialog = textToStore;
    
    $selectedCardsForPlayer = [];
    $selectedCardsForDaemon = [];
    $playerCards = [];
    $daemonCards = [];
  }

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

      notifyDeckInfo('Deck is empty, redeem a vessel to select a quadrant and shuffle all cards. To Enable Void Mode, open the book and select it...');
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

  function loadToDos(){

    ////////////////////////////////////////////////////////
    // TODOS GO HERE TO BE LISTED
    ////////////////////////////////////////////////////////

    addToDo('refactor stores current logic into KnechtController, and put new behavior into Knechtor, and then we can write unit tests to verify that both are behaving the same, SEE TODO COMMENTS IN boardCE/stores.js')
    addToDo('alert on deck info should be a notification. ');
    addToDo('replace Card with ModCard. ');
    addToDo('if the button labelled "Play the Game" is clicked without a quadrant selected, notify that you are in the void and will only get random cards that allow all selections unless you select a quadrant. ');
    // addToDo('board should be black and white if no quadrant selected. ');
    addToDo('Fire logic ready to be implemented, see code notes on Game Logic Docs');
  }

  function addToDo(toDoText){

    $toDos.push(toDoText);
  }

  initialize();

  function initialize(){

    fillAllElementalVessels();

    if($devMode){

      notifyAllDevInfos();

      loadToDos();

      notifyAllToDos();

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