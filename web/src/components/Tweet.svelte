<script lang="ts">
  export let text: string;
  export let createdAt: Date;
  export let tweetId: string;
  const exportObj = {
    text,
    createdAt,
    tweetId
  };
</script>

<div class="tweet">
  <p>{exportObj.text} ({exportObj.tweetId})</p>
  <p>Created At: {exportObj.createdAt}</p>
</div>

<style>
</style>
