<script>

  import { 
    currentWorkBenchText,
    editMode,
  } from './stores.js';

  import { Djehuti } from '../myriad/Djehuti.js';
  const thothMagus = new Djehuti();

  import SvelteMarkdown from 'svelte-markdown';


  function handleCopyClick(){

    const textToWrite = $currentWorkBenchText;

    navigator.clipboard.writeText(textToWrite).then(function() {
    
      /* clipboard successfully set */
      notifyCopied(textToWrite);

    }, function() {
    
      /* clipboard write failed */
      notifyCopyError();
      
    });
  }

  function handlePruneClick(){

    $currentWorkBenchText = 
      thothMagus.pruneTasks($currentWorkBenchText);
  }

  function handleClearClick(){

    $currentWorkBenchText = '';
  }

  function handleEditClick(){

    //TODO: implement toggle md view and parsed view (edit/read, eventually alternate icons, depending on current mode for button text) copy from WoW

    $editMode = !$editMode;
  }

  function initialize(){
    $editMode = true; //default to true for pruner
  }

  initialize();

</script>

<div class="main">

  <div class="toolbar">

    <button on:click={handleCopyClick}>
      Copy
    </button>

    {#if $editMode}

      <button on:click={handlePruneClick}>
        Prune
      </button>

      <button on:click={handleClearClick}>
        Clear
      </button>

    {/if}

    <button on:click={handleEditClick}>

      {#if $editMode}
        
        View

      {:else}

        Edit

      {/if}

    </button>

  </div>

  <div class="editor">

    {#if $editMode}

      <textarea
        bind:value={$currentWorkBenchText}
        rows="5" 
      />

    {:else}

      <SvelteMarkdown source={$currentWorkBenchText} />

    {/if}

  </div>

</div>

<style>



</style>