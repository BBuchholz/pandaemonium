<script>

  import { onMount } from 'svelte';

  import DaemonArea from './DaemonArea.svelte';
  import PlayerArea from './PlayerArea.svelte';

  import KnechtController from '../myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  // original code uses before-game to display 
  // start-game button, see style block below (porting from vanilla js)
	export let beforeGame = true;
  export let duringGame = false;
  export let gameOver = false;
  export let roundFinished = false;
  export let cardSelected = false;
  export let scenarios = [];
  let deck = [];
  let daemonCards = [];
  let playerCards = [];

  let moistureIndex = 0;
  let heatIndex = 0;

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
    cardSelected = false;

    dealCards();
  }

  function outOfCards() {
    
    alert('outOfCards() in GameBoard.svelte not fully implemented (end of current function implementation reached');
  }

  function dealCards() {

    ////////////////////////////////////////////////////////////////////
    // TODO: vanilla-sky implementation needs porting
    ////////////////////////////////////////////////////////////////////

    if(scenarios.length == 0){
      
      outOfCards();
      return;
    }

    var cardsToDeal = 3;

    for(let i = 0; i < cardsToDeal; i++){
      daemonCards = [...daemonCards, deck.pop()];
      playerCards = [...playerCards, deck.pop()];
      console.log("dealt to daemon: " + daemonCards);
      console.log("dealt to player: " + playerCards);
    }


    // var j = 0;
    // var cardIndexes = shuffleArray([0, 1, 2]);

    // // Get scenario cards
    // console.log("scenarios.length == " + scenarios.length);

    // var randomScenarioIndex = Math.floor(Math.random() * scenarios.length);
    // var scenario = scenarios[randomScenarioIndex];
    // console.log(scenario.daemonCard.description);

    // scenarios.splice(randomScenarioIndex, 1);

    // console.log("scenarios.length after splice == " + scenarios.length);

    // var daemonCard = scenario.daemonCard;
    // var daemonCardEl = document.querySelector(".daemon-area .card");

    // // Contents of the player cards
    // var playerCards = scenario.playerCards;

    // for(var i = 0; i < allCardElements.length; i++) {
    //   var card = allCardElements[i];

    //   card.classList.remove("worse-card");
    //   card.classList.remove("better-card");
    //   card.classList.remove("played-card");
    //   card.classList.remove("tie-card");
    //   card.classList.remove("prepared");
    //   card.classList.remove("reveal-power");

    //   // Display the payer card details
    //   if(card.classList.contains("player-card")) {
    //     card.querySelector(".text").innerHTML = playerCards[cardIndexes[j]].description;
    //     var imgSrc = getImgSrcFromPowerString(playerCards[cardIndexes[j]].power);
    //     card.querySelector(".image").src = imgSrc;
    //     card.querySelector(".power").innerHTML = playerCards[cardIndexes[j]].power;
    //     j++;
    //   }

    //   // Reveal each card one by one with a delay of 100ms
    //   setTimeout(function(card, j){
    //     return function() {
    //       card.classList.remove("prepared");
    //       card.style.display = "block";
    //       card.classList.add("showCard");
    //     }
    //   }(card,i), parseInt(i+1) * 200);
    // }

    // // Display the daemon card
    // daemonCardEl.querySelector(".text").innerHTML = daemonCard.description;
    // var imgSrc = getImgSrcFromPowerString(daemonCard.power);
    // daemonCardEl.querySelector(".image").src = imgSrc;
    // daemonCardEl.querySelector(".power").innerHTML = daemonCard.power;


  }

</script>

  <div class="game-board">

    <DaemonArea 
      bind:moistureIndex 
      bind:beforeGame
      bind:daemonCards
    />

    <PlayerArea 
      bind:heatIndex
      bind:beforeGame
      bind:playerCards
      on:startGame={ e => startGame(e.detail) }
      on:nextTurn={ e => nextTurn(e.detail) } 
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