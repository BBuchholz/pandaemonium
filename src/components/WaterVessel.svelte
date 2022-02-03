<script>

  import PiscesVessel from './PiscesVessel.svelte';
  import ScorpioVessel from './ScorpioVessel.svelte';
  import CancerVessel from './CancerVessel.svelte';

  import { 
    waterCollection, 
    collectedWater,
    heatIndex,
    moistureIndex 
  } from '../stores.js';

  import { 
    keysCancer, 
    keysScorpio, 
    keysPisces 
  } from '../constants.js';
  
  const keysWater = [...keysScorpio, ...keysCancer, ...keysPisces];

  function redeemWater() {

    $waterCollection =  $waterCollection.filter(
                          cardKey => 
                          !keysWater.includes(cardKey)
                        ); 

    // // uncomment when implemented
    // $heatIndex += -1;
    // $moistureIndex += 1;
  }

</script>

<div class="elemental-vessel">
  
  {#if $collectedWater}

    <div class="zodiac-vessel-label">

      <button on:click={redeemWater}>
      🜄    
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