<script>

  import { allLoadedMarkDown, displayMode } from './stores.js';
  import { readAll } from '../api/wxrds-api.js';

  import MarkDownCard from './MarkDownCard.svelte';

  import { Djehuti } from '../myriad/Djehuti.js';

  const djehuti = new Djehuti();

  let newMarkDownValue = 'Test';

  // TODO: NOT SURE WHERE I WANT THESE YET BUT I WANT THESE SOMEWHERE

  // “The un-people, the anti-tribe, humanity’s sack unpicked and sewn together again with the moon inside.”
  // ― Clive Barker, Cabal

  //   “All Darkness was one darkness in the end. Of heart or Heavens, one Darkness.”
  // ― Clive Barker, Cabal

  // “Here was a place sacred to the dead, who were not the living ceased, but almost another species, requiring rites and prayers that belonged uniquely to them.”
  // ― Clive Barker, Cabal

  //   “It was bad enough that these creatures had children and art; that they might also have vision was too dangerous a thought to entertain.”
  // ― Clive Barker, Cabal

  // 
  // ― 

  // Function using fetch to POST to our API endpoint
  function createThisMarkDown() {

    const newMarkDown = djehuti.createMDWxrd(newMarkDownValue);
    console.log('mark down created', newMarkDown);

    return fetch('/api/wxrds-create', {
      body: JSON.stringify(newMarkDown),
      method: 'POST'
    }).then(response => {
      return response.json()
    })
  }

  function getMarkDownId(responseObj){

    // console.log('getting mark down id from response obj', responseObj);
    if(!responseObj.ref){
      return null;
    }
    return responseObj.ref['@ref'].id;
  }

  function processResponseObject(responseObj){

    const strRespObjData = JSON.stringify(responseObj.data);

    // console.log('processing response object data...', strRespObjData);

    let processed = {
      wxrd: null,
      dataId: null
    };

    try{
      
      processed.dataId = getMarkDownId(responseObj);
    
    }catch(err){

      console.log("error processing response object for dataId: " + err);

    }

    try{
      
      processed.wxrd = djehuti.importMDWxrdFromJson(strRespObjData);
    
    }catch(err){

      console.log("error processing response object for MarkDown: " + err);

    }

    return processed;
 
  }

  function createANewMarkDown(){

    const timestamp = Date.now();

    // Todo data
    const myMarkDownInput = "testing string input " + timestamp;


    // create it!
    createThisMarkDown(myMarkDownInput).then((response) => {

      console.log('API response', response)

      const processed = processResponseObject(response);

      $allLoadedMarkDown = [processed, ...$allLoadedMarkDown];

      // set app state
    }).catch((error) => {
      console.log('API error', error)
    })

  }

  function loadMarkDown() {

    //TODO: Fauna StepInStoneN: reverse order of returned results to well so that most recent comes first

    const allMarkDown = readAll();

    readAll().then((response) => {
      console.log('API response', response)
      // set app state

      const collected = [];

      for(const responseObj of response){

        const processed = 
          processResponseObject(responseObj);

          if(processed != null){

            collected.push(processed);

          }
      }


      $allLoadedMarkDown = [...collected];    

    }).catch((error) => {
      console.log('API error', error)
    });

  }


</script> 

<div class="main">
<!-- 
  <h1>
  
    Well of Wxrd
  
  </h1> -->

  <div class='flavor-text'>
    
    Shares from within your circles will bubble up here, interspersed with your own, mingling their mutual affinities...

  </div>

  <p>
    <button on:click={loadMarkDown}>Load</button>
  </p>

  <div class="wxrd-well">
    
    {#each $allLoadedMarkDown as wxrdObj, i}

      <MarkDownCard {wxrdObj} />
    
    {/each}

  </div>

  <!-- <NavBarBottom /> -->

</div>

<style>

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .flavor-text {
    font-size: small;
  }

  .wxrd-well {
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 20px;
    align-items: center;
    justify-content: space-between;
    background-color: #282c34;
  }

  textarea {
    width: 80vw;
    box-sizing: border-box;
    margin: 10px;
  }

</style>