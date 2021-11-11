<script>

  import { onMount } from 'svelte';

  import DaemonArea from './DaemonArea.svelte';
  import PlayerArea from './PlayerArea.svelte';

  import KnechtController from '../myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  import { 
    selectedCardForPlayer, 
    selectedCardForDaemon
    } from '../stores.js';

  // original code uses before-game to display 
  // start-game button, see style block below (porting from vanilla js)
	export let beforeGame = true;
  export let duringGame = false;
  export let gameOver = false;
  export let roundFinished = false;
  export let scenarios = [];
  let deck = [];
  let daemonCards = [];
  let playerCards = [];
  let selectedCards = [];

  let moistureIndex = 0;
  let heatIndex = 0;

  $: selectedCards = [$selectedCardForPlayer, $selectedCardForDaemon];
  $: console.log("selectedCardForDaemon: " + $selectedCardForDaemon);
  $: console.log("selectedCardForPlayer: " + $selectedCardForPlayer);
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
    beforeGame = false;
    duringGame = true;
    loadScenariosAndDeck(); 
    playTurn();
  }

  function loadScenariosAndDeck() {
    
    scenarios = magisterLudi.getScenarios();
    deck = magisterLudi.dealTwelveTrees();
  }

  function playTurn() {

    roundFinished = true;
    selectedCards = [];

    dealCards();
  }

  function selectCard(cardKey) {
    console.log('selected ' + cardKey);
  }

  function outOfCards() {
    
    alert('outOfCards() in GameBoard.svelte not fully implemented (end of current function implementation reached');
  }

  function dealCards() {

    if(deck.length == 0){
      
      outOfCards();
      return;
    }

    var cardsToDeal = 3;

    for(let i = 0; i < cardsToDeal; i++){
      daemonCards = [...daemonCards, deck.pop()];
      playerCards = [...playerCards, deck.pop()];
    }

  }

</script>

  <div class="game-board">

    <DaemonArea 
      bind:moistureIndex 
      bind:beforeGame
      bind:daemonCards
      bind:selectedCards
      on:cardSelected={ e => selectCard(e.detail) }
    />

    <PlayerArea 
      bind:heatIndex
      bind:beforeGame
      bind:playerCards
      bind:selectedCards
      on:startGame={ e => startGame(e.detail) }
      on:nextTurn={ e => nextTurn(e.detail) } 
      on:cardSelected={ e => selectCard(e.detail) }
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