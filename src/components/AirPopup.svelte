<script>
  
  import { airCollection } from '../stores.js';
  import AirDecanVessel from './AirDecanVessel.svelte';

</script>

<div class="elemental-vessel">
  <div class="elemental-vessel-label">Air</div>
  <div class="zodiac-vessel">
   
    <AirDecanVessel cardKey="8S" />

    <AirDecanVessel cardKey="9S"/>

    <AirDecanVessel cardKey="10S"/>

    <div class="zodiac-vessel-label">♊</div>

  </div>

  <div class="zodiac-vessel">

    <AirDecanVessel cardKey="5S"/>

    <AirDecanVessel cardKey="6S"/>

    <AirDecanVessel cardKey="7S"/>

    <div class="zodiac-vessel-label">♒</div>
  
  </div>

  <div class="zodiac-vessel">

    <AirDecanVessel cardKey="2S"/>

    <AirDecanVessel cardKey="3S"/>

    <AirDecanVessel cardKey="4S"/>

    <div class="zodiac-vessel-label">♎</div>

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

</style>