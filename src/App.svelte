<script>

  import Modal from 'svelte-simple-modal';
  import Notifications from 'svelte-notifications';

  import { 
    modal, 
    passPhrase,
    devMode,
  } from './stores.js';

  import MyriadNotification from './MyriadNotification.svelte';

  import DaedalusLab from './components/DaedalusLab.svelte';

  import BoardAC from './BoardAC.svelte';
  import BoardMat from './BoardMat.svelte'; 
  import BoardMonde from './BoardMonde.svelte'; 

  initialize();

  function initialize(){

    $devMode = false;

    const urlParams = new URLSearchParams(window.location.search);
    
    if(urlParams.has('passPhrase')){

      $passPhrase = urlParams.get('passPhrase');
    }

    if($devMode){

      $passPhrase = 'leMat';
    }
  }

</script>


<Notifications item={MyriadNotification}>

  <Modal show={$modal}>
    
    <main>

      {#if $passPhrase === 'daedalus'}

        <DaedalusLab {$passPhrase} />

      {:else if $passPhrase === 'leAC'}

        <BoardAC />

      {:else if $passPhrase === 'leMat'}

        <BoardMat />

      {:else if $passPhrase === 'leMonde'}

        <BoardMonde />

      {:else}

        <BoardMonde />

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