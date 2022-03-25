<script>
 
  const devMode = false;

  import Modal from 'svelte-simple-modal';
  import Notifications from 'svelte-notifications';

  import { modal, passPhrase } from './stores.js';

  import MyriadNotification from './MyriadNotification.svelte';

  import GameBoard from './components/GameBoard.svelte';
  import DaedalusLab from './components/DaedalusLab.svelte';

  import BoardAC from './BoardAC.svelte';
  import BoardMat from './BoardMat.svelte'; 
  import BoardMonde from './BoardMonde.svelte'; 
 
  $: console.log('passPhrase found: ' + $passPhrase);

  initialize();

  function initialize(){

    const urlParams = new URLSearchParams(window.location.search);
    
    if(urlParams.has('passPhrase')){

      $passPhrase = urlParams.get('passPhrase');
    }

    if(devMode){

      $passPhrase = 'leMonde';
    }
  }

</script>


<Notifications item={MyriadNotification}>

  <Modal show={$modal}>
    
    <main>

      {#if $passPhrase === 'daedalus'}

        <DaedalusLab {$passPhrase}/>

      {:else if $passPhrase === 'leAC'}

        <BoardAC />

      {:else if $passPhrase === 'leMat'}

        <BoardMat />

      {:else if $passPhrase === 'leMonde'}

        <BoardMonde />

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