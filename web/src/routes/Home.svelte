<script lang="ts">
  import Header from "../components/Header.svelte";
  import type { TweetDates } from "../../../types/tweets";
  let allDates: TweetDates[] = [];

  const getDates = async (): Promise<void> => {
    const response = await fetch("/api/tweets/dates");
    const results = await response.json();
    allDates = results.data;
  };

  getDates();
</script>

<main>
  <svelte:component this={Header} />
  <h1>Dadboner Classic</h1>
  <h3>Really lookin' forward to the weekend, you guys.</h3>
  {#if !allDates.length}
    <p>Fetching Tweets...</p>
    <progress class="progress is-small is-primary" max="100">15%</progress>
  {:else}
    {#each allDates as row}
      <p><a href="/tweets/{row.date}">{row.date}</a></p>
    {/each}
  {/if}
</main>

<style>
  h1 {
    font-size: 5em;
  }

  p {
    font-size: 1.2em;
    font-weight: bold;
  }
</style>
