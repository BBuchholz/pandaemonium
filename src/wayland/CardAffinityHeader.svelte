<script> 
  
  import {  
    affinityKeys,
  } from '../stores.js';

</script>

<div class='main'>

  {#if $affinityKeys.length > 0}

    <div class='bench'>
      
      Card Key: {$affinityKeys[0]}

    </div>

  {:else}

    <div class='daedalus-shop'>
      
        <div class="bench">
          
          No Cards Selected

        </div>
        
      
    </div>

  {/if}

</div>

<style>

.daedalus-shop {
  border: solid;
  border-radius: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.bench {
  margin: 10px;
  padding: 10px;
  border: thin solid;
  border-radius: 10px;
}

</style>