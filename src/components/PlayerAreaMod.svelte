<script>
  
  import { 

    selectionResolutionMValue, 
    selectionResolutionHValue, 
    selectedCardsForPlayer, 
    selectedCardsForDaemon, 
    playerCards, 
    beforeGame, 
    heatIndex, 
    turnFinished, 
    nextTurnButtonText, 
    earthColCount, 
    airColCount, 
    selectionResolutionValue, 
    selectionIsValid, 
    noValidChoices
  
  } from '../stores.js';

  import Card from './Card.svelte';
  import ElementalVessel from './ElementalVessel.svelte';


  import EarthPopupButton from './EarthPopupButton.svelte';
  import AirPopupButton from './AirPopupButton.svelte';


  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function onStartGame() {
    dispatch('startGame', 'no details');
  }

  function onNextTurn() {
    dispatch('nextTurn', 'no details');
  }

  function selectionConfirmed() {
    dispatch('selectionConfirmed', 'no details');
  }

</script>

<div class="player-area">

  <div class="stats player-stats">
  
    <AirPopupButton />

    <EarthPopupButton />
  
  </div>

    
  {#if $beforeGame}

    <button 
      class="start-game"
      class:beforeGame
      on:click={onStartGame}
    >
      Play the Game!
    </button>

  {:else}

    {#each $playerCards as cardKey,i}

      <Card 
        isPlayerCard={true}
        {cardKey} 
        {i}
        on:cardSelected
        isSelected={$selectedCardsForPlayer.includes(cardKey)}
      />
    
    {/each}

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

  {#if $turnFinished}

    <button 
      class="next-turn" 
      on:click={onNextTurn}
    >
      {$nextTurnButtonText}
    </button>

  {/if}

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
  background-color: #d9d9d9;
  background-image: url("/images/chip.svg");
}

.stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 20px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  min-width: 90px;
  padding: 5px;
  border-radius: 4px;
  background: rgba(0,0,0,.3);
}

button.next-turn {
  position: absolute;
  top: -20px;
  transition: all .15s ease-out;
  background: black;
  display: block;
}

button.start-game {
  position: absolute;
  background: black;
  display: none;
  top: -20px;
}

button.confirmSelection {
  position: absolute; 
  background: black;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  left: 20px;
  top: -35px;
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


</style>