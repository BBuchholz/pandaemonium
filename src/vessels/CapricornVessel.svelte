<script>
  
  import { 
    earthCollection, 
    collectedCapricorn 
  } from './stores.js';
  import { keysCapricorn } from '../constants.js';
  import EarthDecanVessel from './EarthDecanVessel.svelte';

  function redeemCapricorn() {

    $earthCollection = $earthCollection.filter(cardKey => !keysCapricorn.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  {#if $collectedCapricorn}
  
    <div class="sign-vessel">

      <a 
        href="#collectedCapricorn"
        on:click={redeemCapricorn}
      >
        ♑    
      </a>
    
    </div>

  {:else}

    {#each keysCapricorn as cardKey, i}

      <EarthDecanVessel {cardKey} />

    {/each}

  {/if}

</div>

<style>

  .elemental-vessel {
    background-color: '#ffffff';
    display: flex;
    flex-flow: row;
  }
  
  .sign-vessel {
    margin: 5px;
    padding: 5px;
    border-style: solid;
    border-radius: 10px;
  }

</style>