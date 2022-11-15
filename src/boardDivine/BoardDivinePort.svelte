<script>
  import { quintOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';

  import {
    cardImagePath,
  } from '../stores.js';


  import { 
    deck,
  } from './stores.js';

  import { getContext } from 'svelte';

  import LibraryPopup from '../LibraryPopup.svelte';

  const { open } = getContext('simple-modal');

  const showPopupLong = () => {
    open(LibraryPopup);
  };

  let showTodos = true;

  const [send, receive] = crossfade({
    duration: d => Math.sqrt(d * 200),

    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === 'none' ? '' : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: t => `
          transform: ${transform} scale(${t});
          opacity: ${t}
        `
      };
    }
  });

  let uid = 1;

  let todos = [
    { id: uid++, done: false, description: 'write some docs' },
    { id: uid++, done: false, description: 'start writing blog post' },
    { id: uid++, done: true,  description: 'buy some milk' },
    { id: uid++, done: false, description: 'mow the lawn' },
    { id: uid++, done: false, description: 'feed the turtle' },
    { id: uid++, done: false, description: 'fix some bugs' },
  ];

  let cards = [
    { id: '2C', selected: false, imgSrc: '' },
  ];


  function getImgSrcFromCardKey(cardKey){
    return $cardImagePath + cardKey + '.jpg';
  }

  function add(input) {
    const todo = {
      id: uid++,
      done: false,
      description: input.value
    };

    todos = [todo, ...todos];
    input.value = '';
  }

  function remove(todo) {
    todos = todos.filter(t => t !== todo);
  }

  function mark(todo, done) {
    todo.done = done;
    remove(todo);
    todos = todos.concat(todo);
  }


  function dealRandomCard(){



    if($deck.length == 0){
      
      notifyDeckInfo('Out of Cards, reshuffling');
      $deck = magisterLudi.dealTwelveTrees();
    }

    //select one
    const theCard = $deck.pop();

  }

  let devNotes = 
    `
    see code, we plan to replace todos with cards, 
    id should be cardKey, let's write the code in parallel right next to the 
    working code (don't change anything, modify and rename the copy, then 
    we can just swap back and forth between implementations, maybe even an 
    old skool if else with the two branching forms so we can switch between the
    working copy and the dev copy at run time, with a toggle as we experiment)
    `;

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  function notifyDevNotes(){
    addNotification({
      position: 'top-center',
      text: 'Dev Notes',
      type: 'error',
      description: devNotes,
    });
  }

  // // UNCOMMENT THIS FOR DEV NOTES /////////////////////////////////////////
  // notifyDevNotes();
  // /////////////////////////////////////////////////////////////////////////

</script>

<div class="main">

  <label>
    <input type="checkbox" bind:checked={showTodos}>
    show todos
  </label>

  {#if showTodos}

    <div class='board'>



        <input
          placeholder="what needs to be done?"
          on:keydown={e => e.key === 'Enter' && add(e.target)}
        >


        <button 
          on:click={showPopupLong}
        >
          📓
        </button>

        <button 
          class="deal-button"
          on:click={dealRandomCard}
        >

          Deal

        </button>

      <div class='left'>
        <h2>todo</h2>
        {#each todos.filter(t => !t.done) as todo (todo.id)}
          <label
            in:receive="{{key: todo.id}}"
            out:send="{{key: todo.id}}"
          >
            <input type=checkbox on:change={() => mark(todo, true)}>
            {todo.description}
            <button on:click="{() => remove(todo)}">remove</button>
          </label>
        {/each}
      </div>

      <div class='right'>
        <h2>done</h2>
        {#each todos.filter(t => t.done) as todo (todo.id)}
          <label
            class="done"
            in:receive="{{key: todo.id}}"
            out:send="{{key: todo.id}}"
          >
            <input type=checkbox checked on:change={() => mark(todo, false)}>
            {todo.description}
            <button on:click="{() => remove(todo)}">remove</button>
          </label>
        {/each}
      </div>
    </div>

  {:else}

    <div class="cards-board">

      asdfasdf
      <button 
        on:click={showPopupLong}
      >
        📓
      </button>

      <button 
        class="deal-button"
        on:click={dealRandomCard}
      >

        Deal

      </button>
    </div>

  {/if}

</div>


<style>
  .board {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    max-width: 36em;
    margin: 0 auto;
  }

  .board > input {
    font-size: 1.4em;
    grid-column: 1/3;
  }

  h2 {
    font-size: 2em;
    font-weight: 200;
    user-select: none;
    margin: 0 0 0.5em 0;
  }

  label {
    position: relative;
    line-height: 1.2;
    padding: 0.5em 2.5em 0.5em 2em;
    margin: 0 0 0.5em 0;
    border-radius: 2px;
    user-select: none;
    border: 1px solid hsl(240, 8%, 70%);
    background-color:hsl(240, 8%, 93%);
    color: #333;
  }

  input[type="checkbox"] {
    position: absolute;
    left: 0.5em;
    top: 0.6em;
    margin: 0;
  }

  .done {
    border: 1px solid hsl(240, 8%, 90%);
    background-color:hsl(240, 8%, 98%);
  }

  button {
    position: absolute;
    top: 0;
    right: 0.2em;
    width: 2em;
    height: 100%;
    background: no-repeat 50% 50% url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23676778' d='M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z'%3E%3C/path%3E%3C/svg%3E");
    background-size: 1.4em 1.4em;
    border: none;
    opacity: 0;
    transition: opacity 0.2s;
    text-indent: -9999px;
    cursor: pointer;
  }

  label:hover button {
    opacity: 1;
  }

  .cards-board > button {
    position: relative;
    opacity: 1;
    background: none;
    text-indent: 0px;
    width: auto;
    height: auto;
    background-color:hsl(240, 8%, 93%);
    color: #333; 
  }
</style>