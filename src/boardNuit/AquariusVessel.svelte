<script>
  
  import { 
    airCollection, 
    collectedAquarius, 
  } from './stores.js';

  import { 
    keysAquarius, 
  } from '../constants.js';
  
  import AirDecanVessel from './AirDecanVessel.svelte';

  function redeemAquarius() {

    $airCollection = $airCollection.filter(cardKey => !keysAquarius.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  {#if $collectedAquarius}
  
    <div class="sign-vessel">

      <a 
        href="#collectedAquarius"
        on:click={redeemAquarius}
      >
        ♒    
      </a>
    
    </div>

  {:else}

    {#each keysAquarius as cardKey, i}

      <AirDecanVessel {cardKey} />

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