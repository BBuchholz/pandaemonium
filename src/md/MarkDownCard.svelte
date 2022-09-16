<script>

  import { allLoadedMarkDown } from './stores.js';
  import { deleteWxrd } from '../api/wxrds-api.js';
  import SvelteMarkdown from 'svelte-markdown';

  export let wxrdObj = null;
  let displayObject = false;
  let displayFM = false;
  let displayDataId = false;

  function filterOutCurrentDataId() {
    let filtered = [];

    for(const wxrdRef of $allLoadedMarkDown){
      if(wxrdRef.dataId != wxrdObj.dataId){
        // console.log(wxrdRef.id + ' is not ' + dataId + ', adding...');
        filtered.push(wxrdRef);
      }
    }

    return filtered;
  }
  
  function deleteThisWxrd() {
    deleteWxrd(wxrdObj.dataId).then(() => {
      console.log(`deleted wxrd id ${wxrdObj.dataId}`)

      let filtered = filterOutCurrentDataId();
      // console.log(filtered);
      $allLoadedMarkDown = filtered;

    }).catch((e) => {
      console.log(`There was an error removing ${wxrdObj.dataId}`, e)
    });
  }

  function toggleObject(){

    displayObject = !displayObject;
  }
  
  function toggleFM(){

    displayFM = !displayFM;
  }

  function toggleDataId(){
    
    displayDataId = !displayDataId;
  }

</script>



<div class="wxrd-card">

  {#if wxrdObj !== null && wxrdObj.dataId !== null}

    <div class="wxrd-value" data-id={wxrdObj.dataId}>

      {#if displayObject}

        <div class="wxrd-section wxrd-object">

          OBJ: {JSON.stringify(wxrdObj.wxrd)}

        </div>

      {/if}

      {#if displayFM}

        <div class="wxrd-section wxrd-fm">

          <SvelteMarkdown source={wxrdObj.wxrd.metaData} />

        </div>

      {/if}

      <div class="wxrd-section wxrd-content">

        <SvelteMarkdown source={wxrdObj.wxrd.markDown} />

      </div>

      {#if displayDataId }

        <div class="wxrd-section wxrd-data-id">

          DataId: {wxrdObj.dataId}

        </div>

      {/if}

      
    </div>

  {:else if wxrdObj.dataId !== null}

    <div class="wxrd-value" data-id={wxrdObj.dataId}>

      [NO WXRD FOUND]
      DataId: {wxrdObj.dataId}
      
    </div>

  {:else}

    DataId is null

  {/if}

  {#if wxrdObj.dataId !== null}

    <button on:click={deleteThisWxrd}>Delete This Wxrd</button>

  {/if}


  <button on:click={toggleObject}>Toggle Object</button>
  <button on:click={toggleFM}>Toggle FM</button>
  <button on:click={toggleDataId}>Toggle DataId</button>


</div>

<style>

  .wxrd-card {
    margin: 5px;
    padding: 10px;
    background: teal;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .wxrd-section {
    margin: 10px;
    padding: 10px;
  }

  .wxrd-content {
    white-space: pre-line;
  }

</style>