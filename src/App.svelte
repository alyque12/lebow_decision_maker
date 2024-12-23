<script>
  import { writable } from 'svelte/store';
  let currentPage = writable('main'); // Use writable store to track current page
  let password = '';
  const correctPassword = import.meta.env.VITE_PASSWORD; // Access environment variable // Set the correct password
  let isPasswordCorrect = writable(false); // Track if password is correct

  let currentPageComponent;

  // Function to check password
  const checkPassword = () => {
    if (password === correctPassword) {
      isPasswordCorrect.set(true); // Mark the password as correct
      currentPage.set('add'); // Navigate to the Add Question page
    } else {
      alert('Incorrect password');
    }
  };

  // Dynamically import components based on the currentPage
  $: {
    if ($currentPage === 'main') {
      import('./Home.svelte').then(module => currentPageComponent = module.default);
      password = '';
    }
    if ($currentPage === 'add' && $isPasswordCorrect) {
      import('./AddQuestion.svelte').then(module => currentPageComponent = module.default);
    }
  }
</script>

<div>
  <h1>Lebow Decision Maker</h1>
  <button on:click={() => currentPage.set('main')}>Main</button>
  <button on:click={() => currentPage.set('add')}>Add Question</button>

  {#if !$isPasswordCorrect && $currentPage === 'add'}
    <!-- Password prompt only shows when trying to access 'add' page -->
    <div class="password-check">
      <input type="password" bind:value={password} placeholder="Enter password" />
      <button on:click={checkPassword}>Submit</button>
    </div>
  {/if}

  {#if currentPageComponent}
    <svelte:component this={currentPageComponent} />
  {/if}
</div>

<style>
  .password-check {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .password-check input {
    padding: 10px;
    margin: 10px;
    font-size: 1rem;
  }

  .password-check button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }

  .password-check button:hover {
    background-color: #0056b3;
  }
</style>
