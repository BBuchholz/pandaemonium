<script>
  

  import { 

    selectedCardsForDaemon,
    selectedCardsForPlayer, 
    aewonicCross,
    deck, 
    currentDeckCount,
    discardCount, 
    nextTurnButtonText,
    turnFinished,
    noValidChoices,
    selectionResolutionValue,
    beforeGame,
    selectionIsValid,
    selectedQuadrant,
    selectedCards,
    selectionIsSingular, 
    buttonCounts,
    waterCollection,
    airCollection,
    earthCollection,
    fireCollection,
    waterColCountChanged,
    airColCountChanged,
    earthColCountChanged,
    fireColCountChanged,
    collectedRecentlyWater,
    collectedRecentlyAir,
    collectedRecentlyEarth,
    collectedRecentlyFire,
    collectedSpirit
  } from './stores.js';

  import { Knechtor } from '../myriad/Knechtor.js';
  const magisterLudi = new Knechtor();


  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  function notifyClicked(title, description){
    addNotification({
      position: 'top-right',
      text: title,
      type: 'info',
      description: description,
      removeAfter: 4000,
    });
  }

  function notifySelectionResolutionValue(){
    addNotification({
      position: 'bottom-right',
      text: 'collected ' + $selectionResolutionValue,
      type: 'error',
      description: 'lorem ipsum',
      removeAfter: 4000,
    });
  }


  function resetSelection() {

    // roundFinished = true;
    $selectedCardsForPlayer = [];
    $selectedCardsForDaemon = [];
    $aewonicCross = [];;
    // console.log('selection reset');
  }

  function loadDeck(){

    $deck = magisterLudi.dealTwelveTrees();
  }


  function outOfCards() {

    const toReshuffle = $currentDeckCount + $discardCount;

    if(toReshuffle > 1) {
   
      notifyClicked('Deck Info!', 'out of cards, reshuffling ' + toReshuffle + ' cards...');
      loadDeck();
      newDeal(); 
    
    } else if (toReshuffle === 1) {

      notifyClicked('Deck Info!', 'only one card in deck, need to redeem to continue');
      $turnFinished = true;

    } else {

      notifyClicked('Deck Info!', 'all cards collected! you rock!');
      $beforeGame = true;

    }

  }

  function newDeal(){
 
    // if($currentDeckCount < 6){

    //   loadDeck();
    // }

    if($deck.length == 0){

      outOfCards();
      return;
    }

    $aewonicCross = [];

    const cardsToDeal = 6;

    while(cardsToDeal > $deck.length){
      cardsToDeal -= 2;
    }

    if(cardsToDeal == 0){

      outOfCards();
      return;
    }

    for(let i = 0; i < cardsToDeal; i++){
      $aewonicCross = [...$aewonicCross, $deck.pop()];
    }

  }


  function onStartGame() {

    $beforeGame = false;
    newDeal();
  }

  function endGame(){
    $beforeGame = true;
    $selectedQuadrant = '';
    // $daemonCards = [];
    // $playerCards = [];
    $aewonicCross = [];
  }

  function onNextTurn() {
    
    $turnFinished = false;
    $earthColCountChanged = false;
    $fireColCountChanged = false;
    $airColCountChanged = false;
    $waterColCountChanged = false;

    $collectedRecentlyFire = [];
    $collectedRecentlyWater = [];
    $collectedRecentlyAir = [];
    $collectedRecentlyEarth = [];
    
    newDeal();
  }

  function selectionConfirmed() {
    

    processCardCollection();

    $turnFinished = true;
  }

  function processCardCollection() {

    console.log('res: ' + $selectionResolutionValue);
    console.log('length: ' + $selectionResolutionValue.length);

    for(const cardKey of $selectionResolutionValue){

      console.log('cardkey: ' + cardKey);

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

  $: console.log('beforeGame: ' + $beforeGame);
  $: console.log('selectedQuadrant: ' + $selectedQuadrant);

</script>

<div class="buttons-vessel">

  {#if $beforeGame && $selectedQuadrant}

    <button 
      class="start-game"
      class:beforeGame
      class:colorWater={$selectedQuadrant === 'Water'}
      class:colorAir={$selectedQuadrant === 'Air'}
      class:colorEarth={$selectedQuadrant === 'Earth'}
      class:colorFire={$selectedQuadrant === 'Fire'}
      on:click={onStartGame}
    >
      Deal Two Trees {$buttonCounts}
    </button>

  {:else if $currentDeckCount === 0 && !$beforeGame && $turnFinished && $collectedSpirit}

    <button 
      class="dealTwoTrees"
      class:colorWater={$selectedQuadrant === 'Water'}
      class:colorAir={$selectedQuadrant === 'Air'}
      class:colorEarth={$selectedQuadrant === 'Earth'}
      class:colorFire={$selectedQuadrant === 'Fire'}
      on:click={endGame}
    >
      End Game
    </button>

  {/if}


  {#if $selectionIsValid }

    <button 
      class="confirmSelection"
      on:click={selectionConfirmed}
    >

      {$selectionResolutionValue}

    </button>

  {:else}

    {#if $noValidChoices && !$beforeGame}


      <button 
        class="confirmSelection"
        on:click={selectionConfirmed}
      >

        No Valid Moves

      </button>
  
    {/if}

  {/if}

  {#if $turnFinished && !$beforeGame}

    <button 
      class="next-turn" 
      on:click={onNextTurn}
    >
      {$nextTurnButtonText}
    </button>

  {/if}

</div>

<style>
  
.buttons-vessel {
  position: absolute;
  min-height: 2em;
  min-width: 10em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: solid;
}

</style>