<script>
  
  import { selectedCardForDaemon } from '../stores.js';

  import Card from './Card.svelte';

  export let moistureIndex = 9;
  export let daemonCards = [1,2,3];
  export let beforeGame = false;
  export let selectedCards = [];

  function showDaemonStats() {
    alert('showDaemonStats() in DaemonArea.svelte not implemented');
  }
</script>

<div class="daemon-area">

  <h1>
    Choose your response to the play of the Heavenly City...
  </h1>

  <div class="stats daemon-stats" on:click={showDaemonStats}>
    <div class="life-total">{moistureIndex}</div>
    <div class="thumbnail">🌫️</div>
    <div class="name m-index-name">MI</div>
  </div>
  
  {#if !beforeGame}

    {#each daemonCards as cardKey, i}

      <Card 
        isPlayerCard={false} 
        {cardKey}
        {i}
        on:cardSelected
        isSelected={$selectedCardForDaemon === cardKey}
      />

    {/each}

  {/if}

</div>



<style>

  .daemon-area h1 {
    padding: 12px 10px 0 10px;
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255,255,255,.6);
    font-style: italic;
    position: absolute;
    top: 0;
  }

  h1 strong {
    color: white;
    font-style: normal;
  }

  .daemon-area {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 30px 10px 30px 110px;
    min-height: 235px;
    background-repeat: repeat;
    background-size: 200px;
    height: 50vh;
    box-sizing: border-box;
  }

  .daemon-area {
    background-position: bottom;
    align-items: flex-end;
  }

  .life-bar {
    background: rgba(255,255,255,.15);
    width: 10px;
    height: 90px;
    position: relative;
  }

  .life-left {
    position: absolute;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
    height: 50%;
    transition: height .25s ease-out;
  }

  .stats {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    min-width: 90px;
    padding: 0 5px 0 5px;
    border-radius: 4px;
    background: rgba(0,0,0,.3);
  }

  .stats .thumbnail {
    font-size: 40px;
    line-height: 40px;
    margin: 0 0 5px 0;
    text-shadow: 5px 5px 0px rgba(0,0,0,.2);
  }

  .stats .name {
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
  }

  .life-total {
    font-size: 20px;
    font-weight: 700;
    margin: 8px 0;
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

  @keyframes buttonPulse {
    50% {
      transform: scale(1.02);
    }
  }

  .card {
    opacity: 1;
    margin: 0 10px;
    width: 150px;
    height: 200px;
    padding: 10px 15px;
    color: black;
    font-size: 14px;
    line-height: 18px;
    font-weight: bold;
    position: relative;
    box-sizing: border-box;
    text-align: left;
    transition: all .15s ease-out;
    box-shadow: 0px 5px 5px rgba(0,0,0,.3);
    overflow: hidden;
  }

  .card:after {
    content: "";
    position: absolute;
    top: 0;
    left: -20%;
    width: 140%;
    height: 0%;
    background: white;
    animation: sheen infinite .5s ease-in-out;
    display: none;
    transform: rotate(-7deg);
  }

  @keyframes sheen {
    0% {
      top: -10%;
      height: 0%;
      opacity: 0;
    }
    25% {
      top: -10%;
      height: 20%;
      opacity: .2;
    }
    50% {
      top: 20%;
      height: 50%;
      opacity: .3;
    }
    75% {
      top: 110%;
      height: 20%;
      opacity: .2;
    }
    100% {
      top: 110%;
      height: 0%;
      opacity: 0;
    }
  }

  /* When the daemon card appears */
  @keyframes daemonShowCard {
    0%   { transform: translateY(-25px); opacity: .5; }
    60%  { transform: translateY(5px); }
    100% { transform: translateY(0px); }
  }

  /* When the player card appears */
  @keyframes playerShowCard {
    0%   { transform: translateY(25px); opacity: .5; }
    60%  { transform: translateY(-5px); }
    100% { transform: translateY(0px); }
  }

  .card .power {
    font-size: 30px;
    position: absolute;
    bottom: 12px;
    line-height: 30px;
    left: 10px;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 50%;
    color: rgba(0,0,0,0);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
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

  img {
    width: 10vw;
    height: 20vh;
    object-fit: contain;
  }

  /* Daemon Styles */

  .daemon-color { 
    background-color: #2a79d0;
  }

  .daemon-area {
    background-color: #0d3158;
    background-image: url("/images/chip.svg");
  }

  .daemon-card .power {
    background-image: url("/images/shield.svg");
  }


</style>