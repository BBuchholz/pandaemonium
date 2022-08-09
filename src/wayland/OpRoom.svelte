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
  
  function notifyPassPhraseFound(){
    addNotification({
      position: 'top-right',
      text: 'passPhrase Found',
      type: 'error',
      description: 'passPhrase: ' + $passPhrase,
      removeAfter: 10000,
    });
  }


</script>

  <div class="op-room">

    <div class='workbench workbench-list'>
      
      <h1>WorkBenchItems</h1>

      <ul>

        {#each $workBenchList as listItem, i}

          <li> {JSON.stringify(listItem)} </li>

        {/each}

      </ul>

    </div>

    <div class='workbench workbench-active'>
     active goes here when selected from the left
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