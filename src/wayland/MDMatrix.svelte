<script>

  import { Djehuti } from '../myriad/Djehuti.js';
  const thothMagus = new Djehuti();

  import SvelteMarkdown from 'svelte-markdown';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  import { 
    passPhrase,
    affinityAnchor,
    affinityKeys,
  } from '../stores.js';

  import { 
    workBenchList,
    editMode,
    currentWorkBenchText,
    prevItemIndex,
  } from './stores.js';

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();
  
  

  function notifyPassPhraseFound(){
    addNotification({
      position: 'top-right',
      text: 'passPhrase Found',
      type: 'error',
      description: 'passPhrase: ' + $passPhrase,
      removeAfter: 10000,
    });
  }

  function handleWxrdClick(itemIndex){

    if($prevItemIndex > -1){

      if($currentWorkBenchText){

        $workBenchList[$prevItemIndex] = $currentWorkBenchText; 
      }
 
    }
    
    $prevItemIndex = itemIndex;

    let itemText = $workBenchList[itemIndex];

    $currentWorkBenchText = itemText;
  }


</script>

  <div class="op-room">

    {#if $prevItemIndex > -1}

      <div class='workbench workbench-list'>
        
        <h1>Work Bench Items</h1>

        <ul>

          {#each $workBenchList as listItem, itemIndex}

            <li>
              <a
                href="#UUID_SHOULD_GO_HERE"
                on:click={() => handleWxrdClick(itemIndex)}
              >  
                {thothMagus.getPreferredAlias(listItem)}
              </a>
            </li>

          {/each}

        </ul>

      </div>

      <div class='workbench workbench-active'>
       
        {#if $editMode}

          <textarea
            bind:value={$currentWorkBenchText}
            rows="5" 
          />

        {:else}

          <SvelteMarkdown source={$currentWorkBenchText} />

        {/if}

      </div>

    {/if}

  </div> 


<style>

.op-room {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
}

.workbench {
  flex: 1;
  border: solid;
}


</style>