<script>

  import KnechtController from '../myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  import { 
    passPhrase,
    affinityAnchor,
    affinityKeys,
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

    OP ROOM GOES HERE

  </div> 


<style>

.op-room {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
}


</style>