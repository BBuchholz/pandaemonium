<script>
  
  import { waterCollection, collectedScorpio } from '../stores.js';
  import { keysScorpio } from '../constants.js';
  import WaterDecanVessel from './WaterDecanVessel.svelte';

  function redeemScorpio() {

    $waterCollection = $waterCollection.filter(cardKey => !keysScorpio.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  <div class="zodiac-vessel">

    {#if $collectedScorpio}
    
      <div class="zodiac-vessel-label">

        <button on:click={redeemScorpio}>
        ♒    
        </button>
      
      </div>

    {:else}

      {#each keysScorpio as cardKey, i}

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