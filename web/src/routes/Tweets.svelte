<script lang="ts">
  import Tweet from "../components/Tweet.svelte";
  import type { Tweets } from "../../../types/tweets";

  export let tweetId: string;

  let data: Tweets = {
    tweets: [],
    prev: null,
    next: null
  };

  const getTweets = async (): Promise<void> => {
    const response = await fetch(`/api/tweets?date=${tweetId}`);
    const results = await response.json();
    data.tweets = results.data.tweets;
    data.prev = results.data.prev;
    data.next = results.data.next;
  };

  $: {
    if (tweetId) {
      data.tweets = [];
      data.prev = null;
      data.next = null;
      getTweets();
    }
  }
</script>

<div class="content">
  {#if !data.tweets.length}
    <p>Fetching Tweets...</p>
    <progress class="progress is-small is-primary" max="100">15%</progress>
  {:else}
    {#each data.tweets as row}
      <Tweet text={row.text} createdAt={row.created_at} tweetId={row.id} />
    {/each}

    {#if data.prev}
      <p><a href="/tweets/{data.prev}">Previous ({data.prev})</a></p>
    {/if}

    {#if data.next}
      <p><a href="/tweets/{data.next}">Next ({data.next})</a></p>
    {/if}
  {/if}

  <p><a href="/">Home</a></p>
</div>

<style>
</style>
