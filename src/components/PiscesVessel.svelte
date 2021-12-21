<script>
  
  import { waterCollection, collectedPisces } from '../stores.js';
  import { keysPisces } from '../constants.js';
  import WaterDecanVessel from './WaterDecanVessel.svelte';

  function redeemPisces() {

    $waterCollection = $waterCollection.filter(cardKey => !keysPisces.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  <div class="zodiac-vessel">

    {#if $collectedPisces}
    
      <div class="zodiac-vessel-label">

        <button on:click={redeemPisces}>
        ♒    
        </button>
      
      </div>

    {:else}

      {#each keysPisces as cardKey, i}

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