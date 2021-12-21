<script>
  
  import GeminiVessel from './GeminiVessel.svelte';
  import AquariusVessel from './AquariusVessel.svelte';
  import LibraVessel from './LibraVessel.svelte';


</script>

<div class="elemental-vessel">
  
  <GeminiVessel />

  <AquariusVessel />

  <LibraVessel />

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

</style>