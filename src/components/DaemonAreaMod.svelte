<script>

  
  import { 

    selectedCardsForDaemon, 
    daemonCards, 
    moistureIndex, 
    heatIndex, 
    beforeGame, 
    fireColCount, 
    waterColCount, 
    currentQuadrant, 
    deck, 
    currentDeckCount, 
    discardCount

  } from '../stores.js';

  import Card from './Card.svelte'; 

  import WaterPopupButton from './WaterPopupButton.svelte';
  import FirePopupButton from './FirePopupButton.svelte';

  import FireVessel from './FireVessel.svelte';
  import WaterVessel from './WaterVessel.svelte';

</script>
 
<div class="daemon-area">

  <h1>
    Q: {$currentQuadrant} MI: {$moistureIndex} HI: {$heatIndex} Deck: {$currentDeckCount} Discard: { $discardCount }
  </h1>

  <div class="stats daemon-stats">
  
    <!-- <FirePopupButton /> -->

    <FireVessel />
    
    <!-- <WaterPopupButton /> -->

    <WaterVessel />
  
  </div>
    
    {#if !$beforeGame}

      {#each $daemonCards as cardKey, i}

        <Card 
          isPlayerCard={false} 
          {cardKey}
          {i}
          on:cardSelected
          isSelected={$selectedCardsForDaemon.includes(cardKey)}
        />

      {/each}

    {/if}

</div>



<style>

  .daemon-area h1 {
    padding: 12px 10px 0 10px;
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255,255,255,.6);
    font-style: italic;
    position: absolute;
    top: 0;
  }

  .daemon-area {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 30px 10px 30px 110px;
    min-height: 235px;
    background-repeat: repeat;
    background-size: 200px;
    height: 50vh;
    box-sizing: border-box;
    background-position: bottom;
    align-items: flex-end;
    background-color: #272727;
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
    padding: 0 5px 0 5px;
    border-radius: 4px;
    background: rgba(0,0,0,.3);
  }



</style>