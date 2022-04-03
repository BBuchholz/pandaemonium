<script>

  import { 
    selectedQuadrant,
    beforeGame,
  } from '../stores.js';
  
  import {
    discardCount,
  } from './stores.js';

</script>

<div 
  class="discard-vessel"
  class:hidden={$beforeGame}
  class:water-color={$selectedQuadrant === 'Water'}
  class:air-color={$selectedQuadrant === 'Air'}
  class:earth-color={$selectedQuadrant === 'Earth'}
  class:fire-color={$selectedQuadrant === 'Fire'}
>
  Discard: {$discardCount}
</div>

<style>

  .discard-vessel {
    border: solid;
    padding: 10px;
    border-radius: 10px;
  }

  .water-color {
      border: solid 3px darkgray;
      color: black;
      background-color: #a9efef;
  }

  .air-color {
      border: solid 3px gray;
      color: black;
      background-color: #ffca3a;
  }

  .earth-color {
      border: solid 3px lightgray;
      color: black;
      background-color: #e16036;
  }

  .fire-color {
      border: solid 3px white;
      color: white;
      background-color: #e3170a;
  }

  .hidden {
    visibility: hidden;
  }



</style>