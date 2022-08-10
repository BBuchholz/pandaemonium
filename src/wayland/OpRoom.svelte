<script>

  import KnechtController from '../myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  import { 
    passPhrase,
    affinityAnchor,
    affinityKeys,
    workBenchList,
  } from '../stores.js';

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();
  

  let activeWorkBenchItemText = 'active goes here when selected from the left';

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

    console.log(itemIndex);
    let itemText = $workBenchList[itemIndex];
    console.log(itemText);

    activeWorkBenchItemText = itemText;
  }


</script>

  <div class="op-room">

    <div class='workbench workbench-list'>
      
      <h1>Work Bench Items</h1>

      <ul>

        {#each $workBenchList as listItem, itemIndex}

          <li>
            <a
              href="#UUID_SHOULD_GO_HERE"
              on:click={() => handleWxrdClick(itemIndex)}
            >  
              {listItem}
            </a>
          </li>

        {/each}

      </ul>

    </div>

    <div class='workbench workbench-active'>
     
      <textarea
        bind:value={activeWorkBenchItemText}
        rows="5" 
      />

    </div>

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