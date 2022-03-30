<script>
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  import GeminiVessel from './GeminiVessel.svelte';
  import AquariusVessel from './AquariusVessel.svelte';
  import LibraVessel from './LibraVessel.svelte';

  import { 
    airCollection, 
    collectedAir,
    selectedQuadrant,
  } from './stores.js';

  import { 
    keysGemini, 
    keysAquarius, 
    keysLibra,
    keysAir
  } from '../constants.js';

  function redeemAir() {

    dispatch('redeemAir', 'no details');
  }

</script>

<div class="elemental-vessel">
  
  {#if $collectedAir}

    <div class="zodiac-vessel-label">

      <button on:click={redeemAir}>
      🜁    
      </button>
    
    </div>

  {:else}

    <GeminiVessel />

    <AquariusVessel />

    <LibraVessel />
  
  {/if}

</div>

<style>

  .elemental-vessel {
    display: flex;
    flex-flow: row;
  }

  button {
    font-size: 15px;
    line-height: 15px;
    padding: 8px 22px 9px 22px;
    box-sizing: border-box;
    font-weight: 700;
    border: solid 3px gray;
    color: black;
    background-color: #ffca3a;
    border-radius: 30px;
    transition: all ease-out .2s;
    cursor: pointer;
    outline: none;
    animation: buttonPulse .2s infinite ease-in-out;
  }


</style>