<script>

  import { getContext } from 'svelte';
  import LibraryPopup from './LibraryPopup.svelte';

  import { earthColCount, earthColCountChanged } from '../stores.js';

  const { open } = getContext('simple-modal');

  const showPopupLong = () => {
    open(LibraryPopup);
  };

</script>
 
<button 
  on:click={showPopupLong}
  class:wiggle={ $earthColCountChanged } >

  📓

</button>

<style>
    
  button:hover {
    transform: scale(1.03);
  }

  button:active {
    transform: scale(.97);
  }

  button {
    font-size: 15px;
    line-height: 15px;
    padding: 8px 22px 9px 22px;
    box-sizing: border-box;
    font-weight: 700;
    border: solid 3px black;
    color: white;
    background-color: #cc98e6;
    border-radius: 30px;
    transition: all ease-out .2s;
    cursor: pointer;
    outline: none;
    animation: buttonPulse .2s infinite ease-in-out;
    position: absolute;
    right:  20px;
    top: 30px;
  }


  .wiggle {
    animation: wiggle .15s linear 3;
    background-color: #e16036;
  }


  @keyframes wiggle {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
    100% {
      transform: translateX(0);
    }
  }

</style>