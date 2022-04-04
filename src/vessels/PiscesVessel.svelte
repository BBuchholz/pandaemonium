<script>
  
  import { 
    waterCollection, 
    collectedPisces, 
  } from './stores.js';

  import { 
    keysPisces, 
  } from '../constants.js';

  import WaterDecanVessel from './WaterDecanVessel.svelte';

  function redeemPisces() {

    $waterCollection = $waterCollection.filter(cardKey => !keysPisces.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  {#if $collectedPisces}
  
    <div class="sign-vessel">

      <a 
        href="#collectedPisces"
        on:click={redeemPisces}
      >
        ♓
      </a>
    
    </div>

  {:else}

    {#each keysPisces as cardKey, i}

      <WaterDecanVessel {cardKey} />

    {/each}

  {/if}

</div>

<style>

  .elemental-vessel {
    background-color: '#ffffff';
    display: flex;
    flex-flow: row-reverse;
  }
  
  .sign-vessel {
    margin: 5px;
    padding: 5px;
    border-style: solid;
    border-radius: 10px;
  }

  .decan-vessel {
    margin: 5px;
    padding: 5px;
    border-style: double;
    border-radius: 10px;
  }

  .collected {
    background-color: #000000;
    color: #ffffff;
  }

</style>