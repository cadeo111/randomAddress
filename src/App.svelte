<script>
  import addresses from "./addresses.json"
  import {first, last} from "./names.json"
  import ClipboardJS from "clipboard"
  import Toast from "./Toast.svelte";
  import {pushToastQ} from "./stores";

  const randIndex = Math.floor(Math.random() * addresses.length);

  const address = addresses[randIndex]

  const randIndexFirst = Math.floor(Math.random() * first.length);
  const randIndexLast = Math.floor(Math.random() * last.length);
  const name = {
    first: first[randIndexFirst],
    last: last[randIndexLast],
  };

  function displayToast(message) {
    pushToastQ(message)
  }


  const clipboard = new ClipboardJS("button");
  clipboard.on("success", function (e) {
    console.info("Action:", e.action);
    console.info("Text:", e.text);
    console.info("Trigger:", e.trigger.dataset.name);
    displayToast(`copied ${e.trigger.dataset.name}`);
    e.clearSelection();
  });
</script>


<main>
  <div class="container">
    <h1> Random Real Address</h1>
    <div class="card">
      <div class="name">
        <button data-name="first name" data-clipboard-text="{name.first}"
                class="first">{name.first}</button>
        <button data-name="last name" data-clipboard-text="{name.last}" class="second">{name.last}</button>
      </div>
      <div>
          {#if address.address2.length > 0}
            <button data-name="street address line 1" data-clipboard-text={address.address1}
                    class="street one">{address.address1},
            </button>
            <button data-name="street address line 2" data-clipboard-text={address.address2}
                    class="street two">{address.address2}</button>
          {:else}
            <button data-name="street address" data-clipboard-text={address.address1}
                    class="street one">{address.address1}</button>
          {/if}
      </div>
      <div>
          {#if address.city}
            <button data-name="city" data-clipboard-text={address.city} class="city">{address.city}</button>
          {/if}
        <button data-name="state" data-clipboard-text={address.state} class="state">{address.state},</button>
        <button data-name="zip code" data-clipboard-text={address.postalCode} class="zip">{address.postalCode}</button>
      </div>
    </div>
  </div>
  <Toast/>

</main>

<style>
  :root {
    --button-font-size: 2.0rem
  }

  main {
    background: #C4C4C4;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 8px;
  }

  .container {
    margin-top: 15vh;
  }

  h1 {
    font-family: Roboto, sans-serif;
    color: #f7f7f7
  }

  .card {
    padding: 16px 16px;
    display: flex;
    align-items: start;
    justify-content: space-evenly;
    flex-direction: column;

    width: fit-content;
    background: #DAA49A;
    border: 2px solid #F0F4FD;
    box-sizing: border-box;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
  }

  @media (min-width: 600px) {
    :root {
      --button-font-size: 2.5rem
    }

    .card {
      padding: 32px 32px;
      min-width: 500px;
      min-height: 275px;
      align-items: center;
    }

  }

  button {
    padding: 2px 5px;
    text-align: left;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: var(--button-font-size);
    line-height: 49px;
    color: #F0F4FD;
  }

  button:hover {
    background: #58A4B0;
    border-radius: 3px;

  }

  .name button {
    font-weight: 400;
    font-size: calc(var(--button-font-size) * 1.1)
  }

</style>