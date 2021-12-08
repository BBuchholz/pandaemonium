<script>
  
  import { waterCollection, selectedWaterSign } from '../stores.js';
  import WaterDecanVessel from './WaterDecanVessel.svelte';

  function redeemScorpio() {

    const filterScorpio = ['5C', '6C', '7C'];
    $waterCollection = $waterCollection.filter(cardKey => !filterScorpio.includes(cardKey)); 
    $selectedWaterSign = '';
  }

  function redeemPisces() {

    const filterPisces = ['8C', '9C', '10C'];
    $waterCollection = $waterCollection.filter(cardKey => !filterPisces.includes(cardKey)); 
    $selectedWaterSign = '';
  }

  function redeemCancer() {

    const filterCancer = ['2C', '3C', '4C'];
    $waterCollection = $waterCollection.filter(cardKey => !filterCancer.includes(cardKey)); 
    $selectedWaterSign = '';
  }

</script> 

<div class="elemental-vessel">
  <div class="elemental-vessel-label">Water</div>
  <div class="zodiac-vessel">
    
    <WaterDecanVessel cardKey="8C"/>

    <WaterDecanVessel cardKey="9C"/>

    <WaterDecanVessel cardKey="10C"/>

    <div class="zodiac-vessel-label">

      <button on:click={() => $selectedWaterSign = 'Pisces' }>
      ♓    
      </button>
    
    </div>

  </div>

  <div class="zodiac-vessel">

    <WaterDecanVessel cardKey="5C"/>

    <WaterDecanVessel cardKey="6C"/>

    <WaterDecanVessel cardKey="7C"/>

    <div class="zodiac-vessel-label">

      <button on:click={() => $selectedWaterSign = 'Scorpio' }>
      ♏    
      </button>
    
    </div>
  
  </div>

  <div class="zodiac-vessel">

    <WaterDecanVessel cardKey="2C"/>

    <WaterDecanVessel cardKey="3C"/>

    <WaterDecanVessel cardKey="4C"/>

    <div class="zodiac-vessel-label">

      <button on:click={() => $selectedWaterSign = 'Cancer' }>
      ♋    
      </button>
    
    </div>

  </div>

  {#if $selectedWaterSign === 'Cancer'}
  
    <button on:click={redeemCancer} >Redeem Cancer</button>
  
  {:else if $selectedWaterSign === 'Scorpio'}
  
    <button on:click={redeemScorpio} >Redeem Scorpio</button>
  
  {:else if $selectedWaterSign === 'Pisces'}

    <button on:click={redeemPisces} >Redeem Pisces</button>
  
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