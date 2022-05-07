<script>
  
  import { 
    waterCollection, 
    collectedCancer,
  } from './stores.js';

  import { 
    keysCancer, 
  } from '../constants.js';
  
  import WaterDecanVessel from './WaterDecanVessel.svelte';

  function redeemCancer() {

    $waterCollection = $waterCollection.filter(cardKey => !keysCancer.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  {#if $collectedCancer}
  
    <div class="sign-vessel">

      <a 
        href="#collectedCancer"
        on:click={redeemCancer}
      >
        ♋    
      </a>
    
    </div>

  {:else}

    {#each keysCancer as cardKey, i}

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