<script>

  import ElementalVessel from './ElementalVessel.svelte';
  
  export let elementLabel = "Element";
  export let mutableSign = "M";
  export let fixedSign = "F";
  export let cardinalSign = "C";

</script>


    <ElementalVessel
      {elementLabel} 
      {mutableSign}
      {fixedSign}
      {cardinalSign} />


<style>
  
</style>