<script>
	export let beforeGame = true;
  import DaemonArea from './DaemonArea.svelte';
  import PlayerArea from './PlayerArea.svelte';
</script>

  <div 
    class="game-board"
    class:before-game={beforeGame} 
  >

    <DaemonArea />

    <PlayerArea />

  </div> 


<style>

.game-board {
  height: 100%;
  position: absolute;
  height: 100vh;
  width: 100%;
}

</style>