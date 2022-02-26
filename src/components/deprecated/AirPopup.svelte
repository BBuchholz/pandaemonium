<script>
  
  import { airCollection, selectedAirSign } from '../stores.js';
  import AirDecanVessel from './AirDecanVessel.svelte';

  function redeemGemini() {

    const filterGemini = ['8S', '9S', '10S'];
    $airCollection = $airCollection.filter(cardKey => !filterGemini.includes(cardKey)); 
    $selectedAirSign = '';
  }

  function redeemAquarius() {

    const filterAquarius = ['5S', '6S', '7S'];
    $airCollection = $airCollection.filter(cardKey => !filterAquarius.includes(cardKey)); 
    $selectedAirSign = '';
  }

  function redeemLibra() {

    const filterLibra = ['2S', '3S', '4S'];
    $airCollection = $airCollection.filter(cardKey => !filterLibra.includes(cardKey)); 
    $selectedAirSign = '';
  }

</script>

<div class="elemental-vessel">
  <div class="elemental-vessel-label">Air</div>
  <div class="zodiac-vessel">
   
    <AirDecanVessel cardKey="8S" />

    <AirDecanVessel cardKey="9S"/>

    <AirDecanVessel cardKey="10S"/>

    <div class="zodiac-vessel-label">

      <button on:click={() => $selectedAirSign = 'Gemini' }>
      ♊    
      </button>
    
    </div>

  </div>

  <div class="zodiac-vessel">

    <AirDecanVessel cardKey="5S"/>

    <AirDecanVessel cardKey="6S"/>

    <AirDecanVessel cardKey="7S"/>

    <div class="zodiac-vessel-label">

      <button on:click={() => $selectedAirSign = 'Aquarius' }>
      ♒    
      </button>
    
    </div>
  
  </div>

  <div class="zodiac-vessel">

    <AirDecanVessel cardKey="2S"/>

    <AirDecanVessel cardKey="3S"/>

    <AirDecanVessel cardKey="4S"/>

    <div class="zodiac-vessel-label">

      <button on:click={() => $selectedAirSign = 'Libra' }>
      ♎    
      </button>
    
    </div>

  </div>

  {#if $selectedAirSign === 'Gemini'}
  
    <button on:click={redeemGemini} >Redeem Gemini</button>
  
  {:else if $selectedAirSign === 'Aquarius'}
  
    <button on:click={redeemAquarius} >Redeem Aquarius</button>
  
  {:else if $selectedAirSign === 'Libra'}

    <button on:click={redeemLibra} >Redeem Libra</button>
  
  {/if}
  
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

</style>