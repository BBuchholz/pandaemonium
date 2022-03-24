<script>
 
  // const testingDaedalus = true;

  import Modal from 'svelte-simple-modal';
  import Notifications from 'svelte-notifications';

  import { modal, passPhrase } from './stores.js';

  import MyriadNotification from './MyriadNotification.svelte';

  import GameBoard from './components/GameBoard.svelte';
  import DaedalusLab from './components/DaedalusLab.svelte';

  initializePassphrase();

  function initializePassphrase(){

    const urlParams = new URLSearchParams(window.location.search);
    
    if(urlParams.has('passPhrase')){

      $passPhrase = urlParams.get('passPhrase');
      console.log('passPhrase found: ' + $passPhrase);
    }
  }

</script>


<Notifications item={MyriadNotification}>

  <Modal show={$modal}>
    
    <main>

      {#if $passPhrase === 'daedalus'}

        <DaedalusLab {$passPhrase}/>

      {:else}

        <GameBoard />

      {/if}


    </main>

  </Modal>

</Notifications>

<style>

main {
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

</style>