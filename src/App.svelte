<script>

  const testingDaedalus = true;

  import Modal from 'svelte-simple-modal';
  import Notifications from 'svelte-notifications';

  import { modal } from './stores.js';

  import MyriadNotification from './MyriadNotification.svelte';

  import GameBoard from './components/GameBoard.svelte';
  import DaedalusLab from './components/DaedalusLab.svelte';

  const urlParams = new URLSearchParams(window.location.search);
  const hasPassPhrase = urlParams.has('passPhrase');
  const passPhrase = hasPassPhrase ? urlParams.get('passPhrase') : "BASELINE";

  function showStats() {
    alert('showStats() in App.svelte is not yet implemented');
  }

</script>


<Notifications item={MyriadNotification}>

  <Modal show={$modal}>
    
    <main>

      {#if testingDaedalus || hasPassPhrase}

        <DaedalusLab {passPhrase}/>

      {:else}

        <GameBoard />


        <div class="winner-section">
          
          <div>
          
            <span class="winner-message">You have fallen...</span>
            <button class="restart" onClick="location.reload()">Play Again</button>
            <button on:click={showStats}>Show Stats</button>
          
          </div>

        </div>

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

@keyframes ouch {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}


button:hover {
  transform: scale(1.03);
}

button:active {
  transform: scale(.97);
}

.winner-section {
  display: none;
  position: fixed;
  padding: 15px 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  animation: winnerAppear .4s ease-out;
}

.winner-section button {
  margin-left: 15px;
}

.winner-message {
  color: white;
  font-size: 22px;
  font-weight: 700;
  position: relative;
  top: 1px;
}

@keyframes winnerAppear {
  0% {
    transform: translateY(150px);
  }
  60% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

button {
  font-size: 15px;
  line-height: 15px;
  padding: 8px 22px 9px 22px;
  box-sizing: border-box;
  font-weight: 700;
  border: solid 3px white;
  color: white;
  background: transparent;
  border-radius: 30px;
  transition: all ease-out .2s;
  cursor: pointer;
  outline: none;
  animation: buttonPulse .2s infinite ease-in-out;
}

@keyframes buttonPulse {
  50% {
    transform: scale(1.02);
  }
}


@keyframes showPower {
  0% {
    background: none;
    transform: scaleX(1);
    color: rgba(0,0,0,0);
  }
  49% {
    color: rgba(0,0,0,0);
    transform: scaleX(0);
  }
  51% {
    background: none;
    color: black;
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}



</style>