<script>

  import { getContext } from 'svelte';
  import LibraryPopup from './LibraryPopup.svelte';

  const { open } = getContext('simple-modal');

  const showPopupLong = () => {
    open(LibraryPopup);
  };

</script>
 
<button 
  on:click={showPopupLong} >

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
    background-color: #lightslategray;
    border-radius: 30px;
    transition: all ease-out .2s;
    cursor: pointer;
    outline: none;
    animation: buttonPulse .2s infinite ease-in-out;
    position: absolute;
    left:  15px;
    top: -20px;
  }

</style>