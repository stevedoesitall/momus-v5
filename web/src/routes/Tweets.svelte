<script>
  import { afterUpdate, onMount } from "svelte";
  import Tweet from "../components/Tweet.svelte";
  export let params;
  let tweets = [];
  let prev;
  let next;

  const getTweets = async () => {
    tweets = [];
    const response = await fetch(`/api/tweets?date=${params.id}`);
    const results = await response.json();
    tweets = results.data.tweets;
    prev = results.data.prev;
    next = results.data.next;
  };

  onMount(async () => {
    getTweets();
  });

  $: {
    if (params.id) {
      getTweets();
    }
  }
</script>

<div class="content">
  {#if !tweets.length}
    <p>Fetching Tweets...</p>
    <progress class="progress is-small is-primary" max="100">15%</progress>
  {:else}
    {#each tweets as row}
      <Tweet text={row.text} createdAt={row.created_at} tweetId={row.id} />
    {/each}

    {#if prev}
      <p><a href="/tweets/{prev}">Previous ({prev})</a></p>
    {/if}

    {#if next}
      <p><a href="/tweets/{next}">Next ({next})</a></p>
    {/if}
  {/if}

  <p><a href="/">Home</a></p>
</div>

<style>
</style>
