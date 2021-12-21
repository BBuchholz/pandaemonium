<script>
  
  import { airCollection, collectedLibra } from '../stores.js';
  import { keysLibra } from '../constants.js';
  import AirDecanVessel from './AirDecanVessel.svelte';

  function redeemLibra() {

    $airCollection = $airCollection.filter(cardKey => !keysLibra.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  <div class="zodiac-vessel">

    {#if $collectedLibra}
    
      <div class="zodiac-vessel-label">

        <button on:click={redeemLibra}>
        ♎    
        </button>
      
      </div>

    {:else}

      {#each keysLibra as cardKey, i}

        <AirDecanVessel {cardKey} />

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