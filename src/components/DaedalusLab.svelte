<script>

  import WitchesCradle from './aewonic/WitchesCradle.svelte';
  import ModCard from './aewonic/ModCard.svelte';

  const passPhraseDefault = '[passPhrase not set]';
  export let passPhrase = passPhraseDefault;



  import { 

    selectedCardsForDaemon, 
    daemonCards

  } from './aewonic/aewonic-stores.js';


  let labComponents = [
    "ModCard",
    "WitchesCradle",
  ];

  let selectedComponent;
  let cardKey = '2D';

  function loadDaemonCards() {
    $daemonCards = ['2D', '2C', '2S'];
  }
  
</script>

{#if passPhrase === passPhraseDefault}

  <p>pass phrase not set</p>

{:else}

  <div class="utility-panel">

    <p>pass phrase {passPhrase} found!</p>

    <select 
      bind:value={selectedComponent}
    >
      {#each labComponents as component}
        <option value={component}>
          {component}
        </option>
      {/each}
    </select>

  </div>

  {#if selectedComponent === "WitchesCradle"}

    <button on:click={loadDaemonCards}>Load Daemon Cards</button>

      <!-- If selected component is WitchesCradle, insert here (added to separate file) -->
    <WitchesCradle />
  
  {:else if selectedComponent === "ModCard"}

    <!-- TODO: move this to its own file like the other -->
    
    <ModCard {cardKey}/>

  {/if}


{/if}

<style>
  
</style>