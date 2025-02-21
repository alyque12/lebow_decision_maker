<script>
  import { writable } from 'svelte/store';
  let currentPage = writable('main'); // Use writable store to track current page
  let password = '';
  const correctPassword = import.meta.env.VITE_PASSWORD; // Access environment variable
  let isPasswordCorrect = writable(false); // Track if password is correct

  let currentPageComponent;

  // Function to check password
  const checkPassword = () => {
    if (password === correctPassword) {
      isPasswordCorrect.set(true); // Mark the password as correct
      currentPage.set('add'); // Navigate to the Add Survey page
    } else {
      alert('Incorrect password');
    }
  };

  // Handle page navigation
  const navigateToMain = () => {
    currentPage.set('main');
    isPasswordCorrect.set(false); // Reset password check when going back to main
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
  <div class="nav-buttons">
    <button on:click={navigateToMain}>Home</button>
    <button on:click={() => currentPage.set('add')}>Add or Edit Surveys</button>
  </div>

  {#if !$isPasswordCorrect && $currentPage === 'add'}
    <!-- Password prompt only shows when trying to access 'add' page -->
    <div class="password-check">
      <input type="password" bind:value={password} placeholder="Enter password" />
      <button on:click={checkPassword}>Submit</button>
    </div>
  {:else if currentPageComponent}
    <svelte:component this={currentPageComponent} />
  {/if}
</div>

<style>
  h1 {
    text-align: center;
    margin-bottom: 1rem;
  }

  .nav-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

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

  button {
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
    border-radius: 8px;
    border: 1px solid transparent;
    color: white;
  }

  button:hover {
    border-color: #646cff;
  }

  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  @media (prefers-color-scheme: light) {
    button {
      background-color: #f9f9f9;
      color: #213547;
    }
  }
</style>