<script>

  import Modal from 'svelte-simple-modal';
  import Notifications from 'svelte-notifications';

  import { 
    modal, 
    passPhrase,
    headerQuote,
    affinityAnchor,
    devMode,
    voidMode,
    devNotifyDelay,
    affinityKeys,
  } from './stores.js';

  import MyriadNotification from './MyriadNotification.svelte';

  import BoardAC from './boardAC/BoardAC.svelte';
  import BoardMat from './boardMat/BoardMat.svelte'; 
  import BoardMonde from './boardMonde/BoardMonde.svelte'; 
  import BoardNuit from './boardNuit/BoardNuit.svelte'; 
  import BoardCE from './boardCE/BoardCE.svelte';

  import Alexandria from './alex/Alexandria.svelte';
  import LeMarchand from './prospero/LeMarchand.svelte';
  import Daedalus from './wayland/Daedalus.svelte';
  import WellOfWxrds from './md/WellOfWxrds.svelte';
  import OpRoom from './wayland/OpRoom.svelte';
  import Pruner from './wayland/Pruner.svelte';
  import MDMatrix from './wayland/MDMatrix.svelte';
  import AffinityHeader from './wayland/AffinityHeader.svelte';
  import CardAffinityHeader from './wayland/CardAffinityHeader.svelte';
  import QuoteHeader from './wayland/QuoteHeader.svelte';
  import JosephDaedalus from './joseph/JosephDaedalus.svelte';
  import DoorStep from './DoorStep.svelte';
  import HelpDesk from './HelpDesk.svelte';

  import DaedalusLab from './components/DaedalusLab.svelte';

  function handleAffinitiesChanged(event){
    $affinityKeys = event.detail.cardKeys;
  }

  initialize();

  function initialize(){

    $devMode = false; 

    const urlParams = 
      new URLSearchParams(window.location.search);
    
    if(urlParams.has('passPhrase')){

      $passPhrase = urlParams.get('passPhrase');
    }

    if($devMode){

      $passPhrase = 'prune';  
      $affinityAnchor = 'quotidian';
 
      $voidMode = false;  

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

      <!-- <AffinityHeader /> -->

      {#if $passPhrase === 'craft'}

        <Daedalus {$passPhrase} />

      {:else if $passPhrase === 'leAC'}

        <BoardAC />

      {:else if $passPhrase.startsWith('matriculate')}

        <JosephDaedalus />

      {:else if $passPhrase === 'daedalusLab'}

        <DaedalusLab {$passPhrase} />

      {:else if $passPhrase === 'well'}

        <WellOfWxrds />

      {:else if $passPhrase === 'leMat'}

        <BoardMat 
          on:affinitiesChanged={handleAffinitiesChanged}
        />

      {:else if $passPhrase === 'learn'}

        <Alexandria />

      {:else if $passPhrase === 'lament'}

        <LeMarchand />

      {:else if $passPhrase === 'leMonde'}

        <BoardMonde />

      {:else if $passPhrase === 'leNuit'}

        <BoardNuit />

      {:else if $passPhrase === 'leCE'}

        <BoardCE />

      {:else if $passPhrase === 'Channard'}

        <OpRoom />

      {:else if $passPhrase === 'Tzimisce'}

        <MDMatrix />

      {:else if $passPhrase === 'help'}

        <HelpDesk />

      {:else if $passPhrase === 'prune'}

        <Pruner />

      {:else}

        <DoorStep />

      {/if}

      <div class='footer'>
        
        a Temple Cathedral Tomb production

      </div>

    </main>

  </Modal>

</Notifications>

<style>

@import url('https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap');

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