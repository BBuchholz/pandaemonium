<script>

  import PiscesVessel from './PiscesVessel.svelte';
  import ScorpioVessel from './ScorpioVessel.svelte';
  import CancerVessel from './CancerVessel.svelte';

  import { 
    waterCollection, 
    collectedWater 
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

</style>