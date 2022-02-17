<script>

  import AewonicCross from './aewonic/AewonicCross.svelte';

  const passPhraseDefault = '[passPhrase not set]';
  export let passPhrase = passPhraseDefault;


  let labComponents = [
    "ModCard",
    "AewonicCross",
  ];

  let selectedComponent;


  
</script>

{#if passPhrase === passPhraseDefault}

  <p>pass phrase not set</p>

{:else}

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
  
  {#if selectedComponent === "AewonicCross"}

      <!-- If selected component is AewonicCross, insert here (added to separate file) -->
    <AewonicCross />
  
  {:else if selectedComponent === "ModCard"}

    <!-- TODO: move this to its own file like the other -->
    [MOD CARD GOES HERE]

  {/if}


{/if}