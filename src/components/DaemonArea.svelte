<script>
  
  import { selectedCardsForDaemon, daemonCards, moistureIndex, beforeGame } from '../stores.js';

  import Card from './Card.svelte';

  function showDaemonStats() {
    alert('showDaemonStats() in DaemonArea.svelte not implemented');
  }
</script>

<div class="daemon-area">

  <h1>
    Choose your response to the play of the Heavenly City...
  </h1>

  <div class="stats daemon-stats" on:click={showDaemonStats}>
    <div class="life-total">{$moistureIndex}</div>
    <div class="thumbnail">🌫️</div>
    <div class="name m-index-name">MI</div>
  </div>
  
  {#if !$beforeGame}

    {#each $daemonCards as cardKey, i}

      <Card 
        isPlayerCard={false} 
        {cardKey}
        {i}
        on:cardSelected
        isSelected={$selectedCardsForDaemon.includes(cardKey)}
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

  .daemon-area {
    background-color: #272727;
    background-image: url("/images/chip.svg");
  }


</style>