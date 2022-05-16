<script>
  
  import { getContext } from 'svelte';

  const { close } = getContext('simple-modal');

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  import {  
    passPhrase,
    devMode,
  } from '../stores.js';

  import {  
    bookName,
  } from './stores.js';

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

  function handleBookTaroClick(){
    $bookName = 'liberTaro';
  }

</script>

<div class='main'>

  {#if $bookName === 'liberTaro'}

    Liber Taro Goes Here

  {:else}

    <!-- turn this into CitadelShelf -->
    <div class='citadel-shelf'>
      
        <div class="book">
          <a 
            href="#BookTaro"
            on:click={handleBookTaroClick}
          > 
            Book Taro 
          </a>
        </div>
      
    </div>

  {/if}

</div>

<style>

.citadel-shelf {
  border: solid;
  border-radius: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.book {
  margin: 10px;
  padding: 10px;
  border: thin solid;
  border-radius: 10px;
}

</style>