<script>
  
  import { getContext } from 'svelte';

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  import {  
    passPhrase,
    devMode, 
  } from '../stores.js';

  function notifyWithoutExpire(textValue){
    addNotification({
      position: 'bottom-right',
      text: textValue,
      type: 'error',
      description: 'lorem ipsum',
      disableButtons: false,
      disableDescription: true
    });
  }

  function handleOpRoomClick(){
    $passPhrase = 'Channard';
  }

</script>

<div class='bench'>
  
    <div class="bench-item">
      <a 
        href="#opRoom"
        on:click={handleOpRoomClick}
      > 
        Operati(ons/ng) Room
      </a>
    </div>
  
</div>

<style>

.bench {
  border: solid;
  border-radius: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.bench-item {
  margin: 10px;
  padding: 10px;
  border: thin solid;
  border-radius: 10px;
}

</style>