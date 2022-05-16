<script>
  
  import { getContext } from 'svelte';

  const { close } = getContext('simple-modal');

  import BenchTaro from './BenchTaro.svelte';

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  import {  
    passPhrase,
    devMode, 
  } from '../stores.js';

  import {  
    benchName,
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

  function handleBenchTaroClick(){
    $benchName = 'benchTaro';
  }


</script>

<div class='main'>

  {#if $benchName === 'benchTaro'}

    <BenchTaro />

  {:else}

    <div class='daedalus-shop'>
      
        <div class="bench">
          <a 
            href="#Bench"
            on:click={handleBenchTaroClick}
          > 
            Bench Taro 
          </a>
        </div>
        
      
    </div>

  {/if}

</div>

<style>

.daedalus-shop {
  border: solid;
  border-radius: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.bench {
  margin: 10px;
  padding: 10px;
  border: thin solid;
  border-radius: 10px;
}

</style>