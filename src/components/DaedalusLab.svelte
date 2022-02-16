<script>

  import AewonicCross from './AewonicCross.svelte';

  const passPhraseDefault = '[passPhrase not set]';
  export let passPhrase = passPhraseDefault;
  
</script>

{#if passPhrase === passPhraseDefault}

  <p>pass phrase not set</p>

{:else}

  <p>pass phrase {passPhrase} found!</p>

  <select id="selectComponent">
    <option value="ModCard">ModCard</option>
    <option value="AewonicCross">Aewonic Cross</option>
  </select>
  
      <!-- If selected component is AewonicCross, insert here (added to separate file) -->
  <AewonicCross />


{/if}