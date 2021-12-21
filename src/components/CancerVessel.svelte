<script>
  
  import { waterCollection, collectedCancer } from '../stores.js';
  import { keysCancer } from '../constants.js';
  import WaterDecanVessel from './WaterDecanVessel.svelte';

  function redeemCancer() {

    $waterCollection = $waterCollection.filter(cardKey => !keysCancer.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  <div class="zodiac-vessel">

    {#if $collectedCancer}
    
      <div class="zodiac-vessel-label">

        <button on:click={redeemCancer}>
        ♒    
        </button>
      
      </div>

    {:else}

      {#each keysCancer as cardKey, i}

        <WaterDecanVessel {cardKey} />

      {/each}

    {/if}

  </div>

</div>

<style>

  .elemental-vessel {
    background-color: '#ffffff';
  }
  
  .zodiac-vessel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
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