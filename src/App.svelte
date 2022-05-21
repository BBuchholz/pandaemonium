<script>

  import Modal from 'svelte-simple-modal';
  import Notifications from 'svelte-notifications';

  import { 
    modal, 
    passPhrase,
    headerQuote,
    devMode,
    voidMode,
    devNotifyDelay,
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

  import DaedalusLab from './components/DaedalusLab.svelte';

  initialize();

  function initialize(){

    $devMode = false;

    const urlParams = 
      new URLSearchParams(window.location.search);
    
    if(urlParams.has('passPhrase')){

      $passPhrase = urlParams.get('passPhrase');
    }

    if($devMode){

      $passPhrase = 'daedalus';  

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

      <div class='header'>
        
        <p>
        
        {$headerQuote.content}
        
        </p>
        
        <p>

        - {$headerQuote.source}

        </p>
      
      </div>

      {#if $passPhrase === 'daedalus'}

        <Daedalus {$passPhrase} />

      {:else if $passPhrase === 'leAC'}

        <BoardAC />

      {:else if $passPhrase === 'daedalusLab'}

        <DaedalusLab {$passPhrase} />

      {:else if $passPhrase === 'leMat'}

        <BoardMat />

      {:else if $passPhrase === 'alex'}

        <Alexandria />

      {:else if $passPhrase === 'lament'}

        <LeMarchand />

      {:else if $passPhrase === 'leMonde'}

        <BoardMonde />

      {:else if $passPhrase === 'leNuit'}

        <BoardNuit />

      {:else if $passPhrase === 'leCE'}

        <BoardCE />

      {:else}

        <LeMarchand />

      {/if}

      <div class='footer'>
        
        a Temple Cathedral Tomb production

      </div>

    </main>

  </Modal>

</Notifications>

<style>

@import url('https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap');

.header, .footer {
  width: 80%;
  position: relative;
  height: auto;
  padding: 20px;
  margin: 20px;
}

.header {
  font-family: 'Averia Serif Libre', cursive;
  font-size: 18px;
  font-style: italic;
  line-height: 17px;

}

.footer {
  font-family: 'Averia Serif Libre', cursive;
  font-size: 18px;
  font-style: italic;
  line-height: 17px;
}

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