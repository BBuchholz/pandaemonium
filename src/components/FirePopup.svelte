<script>
  
  import { fireCollection } from '../stores.js';
  import FireDecanVessel from './FireDecanVessel.svelte';
 
</script>

<div class="elemental-vessel">
  <div class="elemental-vessel-label">Fire</div>
  <div class="zodiac-vessel">
    
    <FireDecanVessel cardKey="8W" />

    <FireDecanVessel cardKey="9W"/>

    <FireDecanVessel cardKey="10W"/>

    <div class="zodiac-vessel-label">♐</div>

  </div>

  <div class="zodiac-vessel">

    <FireDecanVessel cardKey="5W"/>

    <FireDecanVessel cardKey="6W"/>

    <FireDecanVessel cardKey="7W"/>

    <div class="zodiac-vessel-label">♌</div>
  
  </div>

  <div class="zodiac-vessel">

    <FireDecanVessel cardKey="2W"/>

    <FireDecanVessel cardKey="3W"/>

    <FireDecanVessel cardKey="4W"/>

    <div class="zodiac-vessel-label">♈</div>

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