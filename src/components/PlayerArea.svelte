<script>
  export let heatIndex = 9;
  export let beforeGame = true;
  export let gameOver = false;
  export let duringGame = false;
  export let roundFinished = false;
  export let cardSelected = false;
  export let scenarios = [];

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


    alert('playTurn() in PlayerArea.svelte not fully implemented (end of current function implementation reached');
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


    alert('revealCards() in PlayerArea.svelte not implemented');
  }

  function showPlayerStats() {
    alert('showPlayerStats in PlayerArea.svelte not implemented');
  }
</script>

<div class="player-area">

  <div class="stats player-stats" on:click={showPlayerStats}>
    <div class="life-total">{heatIndex}</div>
    <div class="thumbnail">🌡</div>
    <div class="name h-index-name">HI</div>
  </div>

  <div class="card player-card player-color">
    <div class="text"></div>
    <img class="image" alt="player card one" />
    <div class="power"></div>
  </div>

  <div class="card player-card player-color">
    <div class="text"></div>
    <img class="image" alt="player card two" />
    <div class="power"></div>
  </div>

  <div class="card player-card player-color">
    <div class="text"></div>
    <img class="image" alt="player card tree" />
    <div class="power"></div>
  </div>

  <button 
    class="start-game"
    class:beforeGame
    on:click={startGame}
  >
    Play the Game!
  </button>
  <button class="next-turn" on:click={playTurn}>Next!</button>
</div>



<style> 

.player-area {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 30px 10px 30px 110px;
  min-height: 235px;
  background-repeat: repeat;
  background-size: 200px;
  height: 50vh;
  box-sizing: border-box;
}

.player-area {
  background-position: top;
  align-items: top;
}

.player-area .card {
  cursor: pointer;
}

.life-bar {
  background: rgba(255,255,255,.15);
  width: 10px;
  height: 90px;
  position: relative;
}

.life-left {
  position: absolute;
  left: 0;
  bottom: 0;
  background: white;
  width: 100%;
  height: 50%;
  transition: height .25s ease-out;
}

.stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  min-width: 90px;
  padding: 0 5px 0 5px;
  border-radius: 4px;
  background: rgba(0,0,0,.3);
}

.stats .thumbnail {
  font-size: 40px;
  line-height: 40px;
  margin: 0 0 5px 0;
  text-shadow: 5px 5px 0px rgba(0,0,0,.2);
}


.stats .name {
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
}

.life-total {
  font-size: 20px;
  font-weight: 700;
  margin: 8px 0;
}

@keyframes ouch {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}

button.next-turn {
  position: fixed;
  bottom: 20px;
  transition: all .15s ease-out;
  background: black;
  display: none;
}

button.start-game {
  position: absolute;
  background: black;
  display: none;
  top: -20px;
}

button.beforeGame {
  display: block;
}

button:hover {
  transform: scale(1.03);
}

button:active {
  transform: scale(.97);
}

@keyframes winnerAppear {
  0% {
    transform: translateY(150px);
  }
  60% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

button {
  font-size: 15px;
  line-height: 15px;
  padding: 8px 22px 9px 22px;
  box-sizing: border-box;
  font-weight: 700;
  border: solid 3px white;
  color: white;
  background: transparent;
  border-radius: 30px;
  transition: all ease-out .2s;
  cursor: pointer;
  outline: none;
  animation: buttonPulse .2s infinite ease-in-out;
}

@keyframes buttonPulse {
  50% {
    transform: scale(1.02);
  }
}

.card {
  opacity: 0;
  margin: 0 10px;
  width: 150px;
  height: 200px;
  padding: 10px 15px;
  color: black;
  font-size: 14px;
  line-height: 18px;
  font-weight: bold;
  position: relative;
  box-sizing: border-box;
  text-align: left;
  transition: all .15s ease-out;
  box-shadow: 0px 5px 5px rgba(0,0,0,.3);
  overflow: hidden;
}

.card:after {
  content: "";
  position: absolute;
  top: 0;
  left: -20%;
  width: 140%;
  height: 0%;
  background: white;
  animation: sheen infinite .5s ease-in-out;
  display: none;
  transform: rotate(-7deg);
}

@keyframes sheen {
  0% {
    top: -10%;
    height: 0%;
    opacity: 0;
  }
  25% {
    top: -10%;
    height: 20%;
    opacity: .2;
  }
  50% {
    top: 20%;
    height: 50%;
    opacity: .3;
  }
  75% {
    top: 110%;
    height: 20%;
    opacity: .2;
  }
  100% {
    top: 110%;
    height: 0%;
    opacity: 0;
  }
}

/* When the daemon card appears */
@keyframes daemonShowCard {
  0%   { transform: translateY(-25px); opacity: .5; }
  60%  { transform: translateY(5px); }
  100% { transform: translateY(0px); }
}

/* When the player card appears */
@keyframes playerShowCard {
  0%   { transform: translateY(25px); opacity: .5; }
  60%  { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
}

.game-board:not(.card-selected) .player-area .card:not(.played-card):hover {
  transform: translateY(-10px);
  box-shadow: 0px 15px 15px rgba(0,0,0,.3);
}

.card .power {
  font-size: 30px;
  position: absolute;
  bottom: 12px;
  line-height: 30px;
  left: 10px;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 50%;
  color: rgba(0,0,0,0);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

@keyframes showPower {
  0% {
    background: none;
    transform: scaleX(1);
    color: rgba(0,0,0,0);
  }
  49% {
    color: rgba(0,0,0,0);
    transform: scaleX(0);
  }
  51% {
    background: none;
    color: black;
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}

img {
  width: 10vw;
  height: 20vh;
  object-fit: contain;
}

/* Change the colors in this stylesheet to customize the game. */ 

/* Player Styles */

.player-color {
  background-color: #ce3d20;
}

.player-area {
  background-color: #3c1912;
  background-image: url("/images/chip.svg");
}

.player-card .power {
  background-image: url("/images/skull.svg");
}


</style>