<script>
  
  import { earthCollection, selectedEarthSign } from '../stores.js';
  import EarthDecanVessel from './EarthDecanVessel.svelte';
  import VirgoVessel from './VirgoVessel.svelte';
  import TaurusVessel from './TaurusVessel.svelte';
  import CapricornVessel from './CapricornVessel.svelte';


</script>

<div class="elemental-vessel">
  
  <VirgoVessel />

  <TaurusVessel />

  <CapricornVessel />

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
    margin: 0px;
    padding: 0px;
    border-style: double;
    border-radius: 5px;
  }

  .collected {
    background-color: #000000;
    color: #ffffff;
  }

</style>