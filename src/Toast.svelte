<!--suppress ES6UnusedImports -->
<script>
  import {fade, fly} from "svelte/transition";
  import {popToastQ, toastQ} from "./stores"
  import {onDestroy} from "svelte";

  let visible = false
  const startOut = () => setTimeout(() => {
    console.log("intro ended")
    visible = false
  }, 1500)
  const removeShownToast = () => {
    popToastQ()
    if ($toastQ.length > 0) {
      visible = true
    }
  }

  const unsub = toastQ.subscribe(
      val => {
        if (val.length > 0 && !visible) {
          visible = true
        }
      },
  )
  onDestroy(unsub)

</script>

{#if visible}
  <div

      in:fly="{{ y: 32, duration: 250 }}"
      out:fade="{{duration: 250}}"
      on:introend="{startOut}"
      on:outroend="{removeShownToast}"
      class="toast">
      {$toastQ[0]}
  </div>
{/if}


<style>
  .toast {
    position: absolute;
    bottom: 16px;
    min-height: 50px;

    width: fit-content;
    background: #DAA49A;
    border: 2px solid #F0F4FD;
    box-sizing: border-box;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    padding: 4px 16px;

    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 49px;
    color: #F0F4FD;
  }
  @media (min-width: 600px) {
    .toast{
      bottom: 15vh;
    }
  }
</style>