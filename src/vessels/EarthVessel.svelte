<script>

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  import VirgoVessel from './VirgoVessel.svelte';
  import TaurusVessel from './TaurusVessel.svelte';
  import CapricornVessel from './CapricornVessel.svelte';

  import { 
    earthCollection, 
    collectedEarth,
    selectedQuadrant,
  } from './stores.js';

  import { 
    keysVirgo, 
    keysTaurus, 
    keysCapricorn,
    keysEarth 
  } from '../constants.js';
  

  function redeemEarth() {

    dispatch('redeemEarth', 'no details');
  }

</script>

<div class="elemental-vessel">

  {#if $collectedEarth}

    <div class="zodiac-vessel-label">

      <button on:click={redeemEarth}>
      🜃    
      </button>
    
    </div>

  {:else}

    <VirgoVessel />

    <TaurusVessel />

    <CapricornVessel />
  
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
    border: solid 3px lightgray;
    color: black;
    background-color: #e16036;
    border-radius: 30px;
    transition: all ease-out .2s;
    cursor: pointer;
    outline: none;
    animation: buttonPulse .2s infinite ease-in-out;
  }


</style>