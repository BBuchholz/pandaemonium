<script>

  import { onMount } from 'svelte';

  import DaemonArea from './DaemonArea.svelte';
  import PlayerArea from './PlayerArea.svelte';

  // original code uses before-game to display 
  // start-game button, see style block below (porting from vanilla js)
	export let beforeGame = true;
  export let duringGame = false;
  export let gameOver = false;

  // original code uses card-selected to trigger 
  // css logic, see style block below (porting from vanilla js)
  export let cardSelected = false;
  
  let moistureIndex = 0;
  let heatIndex = 0;
  let scenarios = [];


</script>

  <div class="game-board">

    <DaemonArea bind:moistureIndex />

    <PlayerArea 
      bind:heatIndex 
      bind:beforeGame
      bind:gameOver 
      bind:duringGame
      bind:scenarios />

  </div> 


<style>

.game-board {
  height: 100%;
  position: absolute;
  height: 100vh;
  width: 100%;
}

.before-game .start-game {
  display: block;
}

.game-board:not(.card-selected) .player-card:hover:after {
  display: block;
  animation: sheen .35s linear 1;
}

.game-board:not(.card-selected) .player-area .card:not(.played-card):hover {
  transform: translateY(-10px);
  box-shadow: 0px 15px 15px rgba(0,0,0,.3);
}

</style>