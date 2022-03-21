<script>

  import PiscesVessel from './PiscesVessel.svelte';
  import ScorpioVessel from './ScorpioVessel.svelte';
  import CancerVessel from './CancerVessel.svelte';

  import { 
    waterCollection, 
    collectedWater,
    heatIndex,
    moistureIndex,
    selectedQuadrant 
  } from './aewonic-stores.js';

  import { 
    keysCancer, 
    keysScorpio, 
    keysPisces,
    keysWater 
  } from '../../constants.js';
   
  

  function redeemWater() {

    $waterCollection =  $waterCollection.filter(
                          cardKey => 
                          !keysWater.includes(cardKey)
                        ); 

    $selectedQuadrant = 'Water';
  }

</script>

<div class="elemental-vessel">
  
  {#if $collectedWater || !$selectedQuadrant}

    <div class="zodiac-vessel-label">

      <button on:click={redeemWater}>
      🜄 {$waterCollection.length > 0 ? $waterCollection.length : ''}   
      </button>
    
    </div>

  {:else}

    <PiscesVessel />

    <ScorpioVessel />

    <CancerVessel />
  
  {/if}
    
</div>

<style>

  .elemental-vessel {
    background-color: '#ffffff';
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-flow: row;
  }

  button {
    font-size: 15px;
    line-height: 15px;
    padding: 8px 22px 9px 22px;
    box-sizing: border-box;
    font-weight: 700;
    border: solid 3px darkgray;
    color: black;
    background-color: #a9efef;
    border-radius: 30px;
    transition: all ease-out .2s;
    cursor: pointer;
    outline: none;
    animation: buttonPulse .2s infinite ease-in-out;
  }

</style>