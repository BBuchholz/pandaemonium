<script>
  
  import { 
    earthCollection, 
    collectedTaurus 
  } from './aewonic-stores.js';
  import { keysTaurus } from '../../constants.js';
  import EarthDecanVessel from './EarthDecanVessel.svelte';

  function redeemTaurus() {

    $earthCollection = $earthCollection.filter(cardKey => !keysTaurus.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  <div class="zodiac-vessel">

    {#if $collectedTaurus}
    
      <div class="zodiac-vessel-label">

        <button on:click={redeemTaurus}>
        ♉    
        </button>
      
      </div>

    {:else}

      {#each keysTaurus as cardKey, i}

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
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
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