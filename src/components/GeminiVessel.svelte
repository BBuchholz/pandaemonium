<script>
  
  import { airCollection, collectedGemini } from '../stores.js';
  import { keysGemini } from '../constants.js';
  import AirDecanVessel from './AirDecanVessel.svelte';

  function redeemGemini() {

    $airCollection = $airCollection.filter(cardKey => !keysGemini.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  <div class="zodiac-vessel">

    {#if $collectedGemini}
    
      <div class="zodiac-vessel-label">

        <button on:click={redeemGemini}>
        ♊    
        </button>
      
      </div>

    {:else}

      {#each keysGemini as cardKey, i}

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