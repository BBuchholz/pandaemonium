<script> 

  import { Djehuti } from '../myriad/Djehuti.js';
  const thothMagus = new Djehuti();

  import {  
    affinityKeys,
    affinityAnchor,
    workBenchList,
    editMode,
    currentWorkBenchText,
  } from '../stores.js';

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  function notifyCopied(textToWrite){
    addNotification({
      position: 'bottom-right',
      text: 'copied to clipboard: ' + textToWrite,
      type: 'error',
      description: 'lorem ipsum',
      removeAfter: 4000,
      disableButtons: true,
      disableDescription: true
    });
  }
  
  function notifyCopyError(){
    addNotification({
      position: 'bottom-right',
      text: 'error copying to clipboard',
      type: 'error',
      description: 'lorem ipsum',
      removeAfter: 4000,
      disableButtons: true,
      disableDescription: true
    });
  }

  function copyState() {

    const textToWrite = $currentWorkBenchText;

    navigator.clipboard.writeText(textToWrite).then(function() {
    
      /* clipboard successfully set */
      notifyCopied(textToWrite);

    }, function() {
    
      /* clipboard write failed */
      notifyCopyError();
      
    });


  };

  let testCount = 0;

  function handleCreateClick(){

    testCount++;
    let testItem = 'test item ' + testCount;
    const alias = thothMagus.getCurrentTimeStamp();
    testItem = thothMagus.ensureUuid(testItem);
    testItem = thothMagus.setPreferredAlias(testItem, alias);
    $workBenchList = [...$workBenchList, testItem];
  }

  function handleCopyClick(){

    copyState();
  }

  function handleEditClick(){

    //TODO: implement toggle md view and parsed view (edit/read, eventually alternate icons, depending on current mode for button text) copy from WoW

    $editMode = !$editMode;
  }

  function handleCloseClick(){

    $affinityAnchor = 'quotidian'
  }

  function handlePruneClick(){

    $currentWorkBenchText = 
      thothMagus.pruneTasks($currentWorkBenchText);
  }

</script>

<div class='main'>

  <div class='tool-set'>
    
    <div class="tool">
      
      <button on:click={handleCreateClick}>
        Create
      </button>

      <button on:click={handleCopyClick}>
        Copy
      </button>

      {#if $editMode}

        <button on:click={handlePruneClick}>
          Prune
        </button>

      {/if}
      
      <button on:click={handleEditClick}>

        {#if $editMode}
          
          View

        {:else}

          Edit

        {/if}

      </button>

      <button on:click={handleCloseClick}>
        Close
      </button>

    </div>
          
  </div>

</div>

<style>

.tool-set {
  border: solid;
  border-radius: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.tool {
  margin: 10px;
  padding: 10px;
  border: thin solid;
  border-radius: 10px;
}

</style>