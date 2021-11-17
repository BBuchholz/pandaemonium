<script>

  import { onMount } from 'svelte';

  import DaemonArea from './DaemonArea.svelte';
  import PlayerArea from './PlayerArea.svelte';

  import KnechtController from '../myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  import { 
    selectedCardsForPlayer, 
    selectedCardsForDaemon,
    playerCards,
    daemonCards,
    beforeGame,
    deck
    } from '../stores.js';

  $: console.log("selectedCardForDaemon: " + $selectedCardsForDaemon);
  $: console.log("selectedCardForPlayer: " + $selectedCardsForPlayer);
  // const tempScenariosTest = async () => {
  //   const resp = await fetch('/api/scenarios');
  //   const data = await resp.json();

  //   alert("data: " + JSON.stringify(data));

  // } 

  // tempScenariosTest();

  // async function startGame() {
  //   beforeGame = false;
  //   duringGame = true;
  //   await loadScenarios();
  //   console.log(scenarios);
  //   playTurn();
  // }

  // async function loadScenarios() {
  //   const resp = await fetch('/api/scenarios');
  //   scenarios = await resp.json();
  // }

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

    // roundFinished = true;
    $selectedCardsForPlayer = [];
    $selectedCardsForDaemon = [];

    dealCards();
  }

  function selectCard(cardKey) {
    console.log('selected ' + cardKey);
  }

  function handleSelectionConfirmed() {
    console.log('selection confirmed'); 

    processCardComparison();
    dealCards();
  }

  function processCardComparison() {
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

.before-game .start-game {
  display: block;
}

.game-board:not(.card-selected) .player-card:hover:after {
  display: block;
  animation: sheen .35s linear 1;
}

.game-board:not(.card-selected) .player-area .card:not(.played-card):hover {
  transform: translateY(-10px);
  box-shadow: 0px 15px 15px rgba(0,0,0,.3);
}

</style>