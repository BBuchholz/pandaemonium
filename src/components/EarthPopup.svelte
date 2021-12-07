<script>
  
  import { earthCollection, taurusSelected } from '../stores.js';
  import EarthDecanVessel from './EarthDecanVessel.svelte';

</script>

<div class="elemental-vessel">
  <div class="elemental-vessel-label">Earth</div>
  <div class="zodiac-vessel">
    
    <EarthDecanVessel cardKey="8D" />

    <EarthDecanVessel cardKey="9D"/>

    <EarthDecanVessel cardKey="10D"/>

    <div class="zodiac-vessel-label">♍</div>

  </div>

  <div class="zodiac-vessel">

    <EarthDecanVessel cardKey="5D"/>

    <EarthDecanVessel cardKey="6D"/>

    <EarthDecanVessel cardKey="7D"/>

    <div class="zodiac-vessel-label">

      <button on:click={() => $taurusSelected = true }>
      ♉    
      </button>
    
    </div>
  
  </div>

  <div class="zodiac-vessel">

    <EarthDecanVessel cardKey="2D"/>

    <EarthDecanVessel cardKey="3D"/>

    <EarthDecanVessel cardKey="4D"/>

    <div class="zodiac-vessel-label">♑</div>

  </div>

  {#if $taurusSelected}
    <button>Reshuffle Taurus</button>
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