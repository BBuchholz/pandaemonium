<script> 

  import QuoteHeader from './QuoteHeader.svelte';
  import CardAffinityHeader from './CardAffinityHeader.svelte';
  import ToolSet from './ToolSet.svelte';
  
  import {  
    affinityAnchor,
  } from '../stores.js';

</script>

<div class='affinity-header'>

  {#if $affinityAnchor === 'cardKey'}

    <CardAffinityHeader />

  {:else if $affinityAnchor === 'toolSet' }

    <ToolSet />
    
  {:else}

    <QuoteHeader />

  {/if}

</div>

<style>

  .affinity-header {
    border: solid;
    border-radius: 10px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }

</style>