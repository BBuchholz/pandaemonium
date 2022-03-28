<script>
  
  import { 
    waterCollection, 
    collectedPisces 
  } from './stores.js';
  import { keysPisces } from '../constants.js';
  import WaterDecanVessel from './WaterDecanVessel.svelte';

  function redeemPisces() {

    $waterCollection = $waterCollection.filter(cardKey => !keysPisces.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  <div class="zodiac-vessel">

    {#if $collectedPisces}
    
      <div class="zodiac-vessel">
<!-- 
        <button on:click={redeemPisces}>
        ♓    
        </button> -->

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

</div>

<style>

  .elemental-vessel {
    background-color: '#ffffff';
  }
  
  .zodiac-vessel {
    margin: 1px;
    padding: 1px;
    border-style: solid;
    border-radius: 10px;
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
  display: block;
  font-size: 15px;
  line-height: 15px;
  padding: 3px;
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