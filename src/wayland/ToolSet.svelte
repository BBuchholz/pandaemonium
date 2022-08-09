<script> 
  
  import {  
    affinityKeys,
    affinityAnchor,
    workBenchList,
  } from '../stores.js';



  function handleCreateClick(){

    const testItem = 'test item';
    $workBenchList = [testItem, ...$workBenchList];
  }

  function handleCloseClick(){

    $affinityAnchor = 'quotidian'
  }

</script>

<div class='main'>

  <div class='tool-set'>
    
    <div class="tool">
      
      <button on:click={handleCreateClick}>
        Create
      </button>

      <button on:click={handleCloseClick}>
        Close
      </button>

    </div>
          
  </div>

</div>

<style>

.tool-set {
  border: solid;
  border-radius: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.tool {
  margin: 10px;
  padding: 10px;
  border: thin solid;
  border-radius: 10px;
}

</style>