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
    moistureIndex,
    turnFinished,
    earthCollection,
    fireCollection,
    airCollection,
    waterCollection
    } from '../stores.js';

  $: console.log("selectedCardsForDaemon: " + $selectedCardsForDaemon);
  $: console.log("selectedCardsForPlayer: " + $selectedCardsForPlayer);

  function startGame() {
    $beforeGame = false;
    console.log('starting game...');
    loadDeck(); 
    playTurn();
  }

  function loadDeck() {
    
    $deck = magisterLudi.dealTwelveTrees();
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
    console.log('selection reset');
  }

  function selectCard(cardKey) {
    console.log('selected ' + cardKey);
  }

  function handleSelectionConfirmed() {
    console.log('selection confirmed'); 

    processCardComparison();

    $turnFinished = true;
  }

  function nextTurn() {

    $turnFinished = false;
    dealCards();
  }

  function processCardComparison() {

    for(const cardKey of $selectionResolutionValue){

      let cardSuit = magisterLudi.parseSuit(cardKey);

      if(cardSuit === 'D'){
        $earthCollection = [...$earthCollection, cardKey];
        console.log('earth collected: ' + cardKey);
        console.log($earthCollection);
      }

      if(cardSuit === 'W'){
        $fireCollection = [...$fireCollection, cardKey];
        console.log('fire collected: ' + cardKey);
      }

      if(cardSuit === 'S'){
        $airCollection = [...$airCollection, cardKey];
        console.log('air collected: ' + cardKey);
      }

      if(cardSuit === 'C'){
        $waterCollection = [...$waterCollection, cardKey];
        console.log('water collected: ' + cardKey);
      }
    }

    resetSelection();
    console.log('card comparison processed');
  }

  function outOfCards() {
    
    alert('out of cards, reshuffling...');
    loadDeck();
    playTurn();
  }

  function dealCards() {

    if($deck.length == 0){
      
      outOfCards();
      return;
    }

    var cardsToDeal = 3;

    $daemonCards = [];
    $playerCards = [];

    for(let i = 0; i < cardsToDeal; i++){
      $daemonCards = [...$daemonCards, $deck.pop()];
      $playerCards = [...$playerCards, $deck.pop()];
    }

  }

</script>

  <div class="game-board">

    <DaemonArea 
      on:cardSelected={ e => selectCard(e.detail) }
    />

    <PlayerArea 
      on:startGame={ e => startGame(e.detail) }
      on:nextTurn={ e => nextTurn(e.detail) } 
      on:cardSelected={ e => selectCard(e.detail) }
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