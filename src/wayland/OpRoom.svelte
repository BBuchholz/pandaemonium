<script>

  import { Djehuti } from '../myriad/Djehuti.js';
  const thothMagus = new Djehuti();

  import AffinityHeader from '../wayland/AffinityHeader.svelte';

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

    <div class="header">

      <AffinityHeader />  

    </div>

    <div class="workbench">

      {#if $prevItemIndex > -1}

        <div class='workbench-list'>
          
          <h1>Work Bench Items</h1>

          <ul>

            {#each $workBenchList as listItem, itemIndex}

              <li>
                <a
                  href="#UUID_SHOULD_GO_HERE"
                  on:click={() => handleWxrdClick(itemIndex)}
                >  
                  {thothMagus.parsePreferredAlias(listItem)}
                </a>
              </li>

            {/each}

          </ul>

        </div>

        <div class='workbench-active'>
         
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

  </div> 


<style>

.op-room {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.workbench {
  flex: 1;
  display: flex;
  border: solid;
}


</style>