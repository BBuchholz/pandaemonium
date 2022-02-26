<script>
  
  import { earthCollection, selectedEarthSign } from '../stores.js';
  import { keysVirgo, keysTaurus, keysCapricorn } from '../constants.js';

  import EarthDecanVessel from './EarthDecanVessel.svelte';

  function redeemTaurus() {

    $earthCollection = $earthCollection.filter(cardKey => !keysTaurus.includes(cardKey)); 
    $selectedEarthSign = '';
  }

  function redeemVirgo() {

    $earthCollection = $earthCollection.filter(cardKey => !keysVirgo.includes(cardKey)); 
    $selectedEarthSign = '';
  }

  function redeemCapricorn() {

    $earthCollection = $earthCollection.filter(cardKey => !keysCapricorn.includes(cardKey)); 
    $selectedEarthSign = '';
  }

</script>

<div class="elemental-vessel">
  <div class="elemental-vessel-label">Earth</div>
  <div class="zodiac-vessel">
    
    <EarthDecanVessel cardKey="8D" />

    <EarthDecanVessel cardKey="9D"/>

    <EarthDecanVessel cardKey="10D"/>

    <div class="zodiac-vessel-label">

      <button on:click={() => $selectedEarthSign = 'Virgo' }>
      ♍    
      </button>
    
    </div>

  </div>

  <div class="zodiac-vessel">

    <EarthDecanVessel cardKey="5D"/>

    <EarthDecanVessel cardKey="6D"/>

    <EarthDecanVessel cardKey="7D"/>

    <div class="zodiac-vessel-label">

      <button on:click={() => $selectedEarthSign = 'Taurus' }>
      ♉    
      </button>
    
    </div>
  
  </div>

  <div class="zodiac-vessel">

    <EarthDecanVessel cardKey="2D"/>

    <EarthDecanVessel cardKey="3D"/>

    <EarthDecanVessel cardKey="4D"/>

    <div class="zodiac-vessel-label">

      <button on:click={() => $selectedEarthSign = 'Capricorn' }>
      ♑    
      </button>
    
    </div>

  </div>

  {#if $selectedEarthSign === 'Taurus'}
  
    <button on:click={redeemTaurus} >Redeem Taurus</button>
  
  {:else if $selectedEarthSign === 'Capricorn'}
  
    <button on:click={redeemCapricorn} >Redeem Capricorn</button>
  
  {:else if $selectedEarthSign === 'Virgo'}

    <button on:click={redeemVirgo} >Redeem Virgo</button>
  
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