<script>

  import { onMount } from 'svelte';

  import DaemonArea from './DaemonArea.svelte';
  import PlayerArea from './PlayerArea.svelte';

  // original code uses before-game to display 
  // start-game button, see style block below (porting from vanilla js)
	export let beforeGame = true;
  export let duringGame = false;
  export let gameOver = false;
  export let roundFinished = false;
  export let cardSelected = false;
  export let scenarios = [];

  let moistureIndex = 0;
  let heatIndex = 0;


  function startGame() {
    beforeGame = false;
    duringGame = true;
    playTurn();
  }

  function playTurn() {

    roundFinished = true;
    cardSelected = false;

    ////////////////////////////////////////////////////////////////////
    // TODO: vanilla-sky implementation removes card-selected class from game-board
    ////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////
    // TODO: vanilla-sky implementation removes ouch class from daemon and player stats thumbnail
    ////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////
    // TODO: vanilla-sky implementation hides next-turn button by disabling it
    ////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////
    // TODO: vanilla-sky implementation calls updateScores() 
    // DONE: vanilla-sky implementation calls updateScores() 
    // PORT NOTES: shouldn't be needed, leaving comments until working
    ////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////
    // TODO: vanilla-sky implementation removes class showCard from all card elements
    ////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////
    // TODO: vanilla-sky implementation sets timeout and calls revealCards()
    // DONE: vanilla-sky implementation sets timeout and calls revealCards()
    setTimeout(function(){
      revealCards();
    }, 500);
    ////////////////////////////////////////////////////////////////////


    alert('playTurn() in GameBoard.svelte not fully implemented (end of current function implementation reached');
  }

  function outOfCards() {
    
    alert('outOfCards() in GameBoard.svelte not fully implemented (end of current function implementation reached');
  }

  function revealCards() {

    ////////////////////////////////////////////////////////////////////
    // TODO: vanilla-sky implementation needs porting
    ////////////////////////////////////////////////////////////////////

    if(scenarios.length == 0){
      
      outOfCards();
      return;
    }

    var j = 0;
    var cardIndexes = shuffleArray([0, 1, 2]);

    // Get scenario cards
    console.log("scenarios.length == " + scenarios.length);

    var randomScenarioIndex = Math.floor(Math.random() * scenarios.length);
    var scenario = scenarios[randomScenarioIndex];
    console.log(scenario.daemonCard.description);

    scenarios.splice(randomScenarioIndex, 1);

    console.log("scenarios.length after splice == " + scenarios.length);

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


    alert('revealCards() in GameBoard.svelte not implemented');
  }

</script>

  <div class="game-board">

    <DaemonArea bind:moistureIndex />

    <PlayerArea 
      bind:heatIndex
      on:startGame={ e => startGame(e.detail) }
      on:nextTurn={ e => nextTurn(e.detail) } />

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