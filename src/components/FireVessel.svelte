<script>
   
  import SagittariusVessel from './SagittariusVessel.svelte';
  import LeoVessel from './LeoVessel.svelte';
  import AriesVessel from './AriesVessel.svelte';

</script>

<div class="elemental-vessel">
  
  <SagittariusVessel />

  <LeoVessel />

  <AriesVessel />

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