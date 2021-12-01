<script>

  import { getContext } from 'svelte';
  import EarthPopup from './EarthPopup.svelte';

  import { earthColCount } from '../stores.js';

  const { open } = getContext('simple-modal');

  const showPopupLong = () => {
    open(EarthPopup, { message: "It's a popup with long text!" });
  };

</script>

<button on:click={showPopupLong}>

  {$earthColCount}

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
    border: solid 3px white;
    color: white;
    background: transparent;
    border-radius: 30px;
    transition: all ease-out .2s;
    cursor: pointer;
    outline: none;
    animation: buttonPulse .2s infinite ease-in-out;
  }
</style>