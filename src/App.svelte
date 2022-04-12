<script>

  import Modal from 'svelte-simple-modal';
  import Notifications from 'svelte-notifications';

  import { 
    modal, 
    passPhrase,
    devMode,
    devNotifyDelay,
  } from './stores.js';

  import MyriadNotification from './MyriadNotification.svelte';

  import DaedalusLab from './components/DaedalusLab.svelte';

  import BoardAC from './BoardAC.svelte';
  import BoardMat from './BoardMat.svelte'; 
  import BoardMonde from './BoardMonde.svelte'; 
  import BoardCE from './BoardCE.svelte';
 
  initialize();

  function initialize(){

    $devMode = false;

    const urlParams = new URLSearchParams(window.location.search);
    
    if(urlParams.has('passPhrase')){

      $passPhrase = urlParams.get('passPhrase');
    }

    if($devMode){

      $passPhrase = 'leCE';    

      //////////////////////////////////////////
      // $devNotifyDelay DOC
      //////////////////////////////////////////
      //CONTROLS DEV NOTIFICATION LENGTH IN DEV MODE
      //WE PUT TODOS IN HERE FOR CONVENIENCE
      //TOGGLE THIS WHEN DEVELOPING, THE FIRST FEW TIMES
      //YOU MAY WANT A REMINDER AND READ IT ALL, BUT
      //AFTER A FEW DEV CYCLES IT GETS OLD SO TURN THIS
      //ON TO HAVE IT FADE QUICKER

      //LEAVING IT HERE MEANS WHEN IN PROD, EVEN IF ITS
      //SET IT WON"T TRIGGER, DEFAULT BEHAVIOR WILL BE
      //WHAT IS SET IN STORES (had issues with otherwise)

      $devNotifyDelay = true; // false stays forever until closed explicitly, true stays 0.3 seconds each, sequentially

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

      {:else if $passPhrase === 'leCE'}

        <BoardCE />

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