<script>
  
  import { 
    earthCollection, 
    collectedCapricorn, 
  } from './stores.js';
  import { keysCapricorn } from '../constants.js';
  import EarthDecanVessel from './EarthDecanVessel.svelte';

  function redeemCapricorn() {

    $earthCollection = $earthCollection.filter(cardKey => !keysCapricorn.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  <div class="zodiac-vessel">

    {#if $collectedCapricorn}
    
      <div class="zodiac-vessel-label">

        <button on:click={redeemCapricorn}>
        ♑    
        </button>
      
      </div>

    {:else}

      {#each keysCapricorn as cardKey, i}

        <EarthDecanVessel {cardKey} />

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
    flex-direction: row-reverse;
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

  
  
button {
  font-size: 15px;
  line-height: 15px;
  padding: 8px 22px 9px 22px;
  box-sizing: border-box;
  font-weight: 700;
  border: solid 3px white;
  color: white;
  background: transparent;
  border-radius: 30px;
  transition: all ease-out .2s;
  cursor: pointer;
  outline: none;
  animation: buttonPulse .2s infinite ease-in-out;
}


</style>