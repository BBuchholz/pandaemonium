<script>
  
  import { waterCollection } from '../stores.js';
  import WaterDecanVessel from './WaterDecanVessel.svelte';

</script> 

<div class="elemental-vessel">
  <div class="elemental-vessel-label">Water</div>
  <div class="zodiac-vessel">
    
    <WaterDecanVessel cardKey="8C"/>

    <WaterDecanVessel cardKey="9C"/>

    <WaterDecanVessel cardKey="10C"/>

    <div class="zodiac-vessel-label">♓</div>

  </div>

  <div class="zodiac-vessel">

    <WaterDecanVessel cardKey="5C"/>

    <WaterDecanVessel cardKey="6C"/>

    <WaterDecanVessel cardKey="7C"/>

    <div class="zodiac-vessel-label">♏</div>
  
  </div>

  <div class="zodiac-vessel">

    <WaterDecanVessel cardKey="2C"/>

    <WaterDecanVessel cardKey="3C"/>

    <WaterDecanVessel cardKey="4C"/>

    <div class="zodiac-vessel-label">♋</div>

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