<script>  

  ///////////////////////////////////////////////////////////
  //
  // NB: This feels like the way they should be broken up, at 
  //     least for the time being.
  //     Stick to this until further notice, and if anything 
  //     DOES needs to change, do it in accordance 
  //     with this division of responsibility
  //
  //     When something better presents itself, 
  //     change it here as well (and in AewonicCross)
  //
  ///////////////////////////////////////////////////////////
  
  import { 
    deck, 
    selectedQuadrant,
    beforeGame,
    selectedCards,
    selectionIsSingular,
    selectionResolutionValue, 
    buttonCounts,
    turnFinished,
    discardCount,
    currentDeckCount,
    selectedCardsForDaemon,
    selectedCardsForPlayer,
    selectionIsValid,
    noValidChoices,
    nextTurnButtonText,
  } from '../stores.js';

  import {
    aewonicCross,
    collectedSpirit,
    collectedRecentlyWater,
    collectedRecentlyAir,
    collectedRecentlyEarth,
    collectedRecentlyFire,
    waterColCountChanged,
    airColCountChanged,
    earthColCountChanged,
    fireColCountChanged,
    waterCollection,
    airCollection,
    earthCollection,
    fireCollection,
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
      class:water-color={$selectedQuadrant === 'Water'}
      class:air-color={$selectedQuadrant === 'Air'}
      class:earth-color={$selectedQuadrant === 'Earth'}
      class:fire-color={$selectedQuadrant === 'Fire'}
      on:click={onStartGame}
    >
      Deal Two Trees {$buttonCounts}
    </button>

  {:else if $currentDeckCount === 0 && !$beforeGame && $turnFinished && $collectedSpirit}

    <button 
      class="dealTwoTrees"
      class:water-color={$selectedQuadrant === 'Water'}
      class:air-color={$selectedQuadrant === 'Air'}
      class:earth-color={$selectedQuadrant === 'Earth'}
      class:fire-color={$selectedQuadrant === 'Fire'}
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
      class:fire-color={$selectedQuadrant === 'Fire'}
      class:water-color={$selectedQuadrant === 'Water'}
      class:air-color={$selectedQuadrant === 'Air'}
      class:earth-color={$selectedQuadrant === 'Earth'}
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
  border: none;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-around;
}

button {
  font-size: 15px;
  line-height: 15px;
  padding: 8px 22px 9px 22px;
  box-sizing: border-box;
  font-weight: 700;
  border: solid 3px white;
  color: black;
  border-radius: 30px;
  transition: all ease-out .2s;
  cursor: pointer;
  outline: none;
  animation: buttonPulse .2s infinite ease-in-out;
  margin: 0em;
}

/* Elemental Styles */

.water-color {
    border: solid 3px darkgray;
    color: black;
    background-color: #a9efef;
}

.air-color {
    border: solid 3px gray;
    color: black;
    background-color: #ffca3a;
}

.earth-color {
    border: solid 3px lightgray;
    color: black;
    background-color: #e16036;
}

.fire-color {
    border: solid 3px white;
    color: white;
    background-color: #e3170a;
}

</style>