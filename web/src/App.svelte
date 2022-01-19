<script lang="ts">
  import page from "page";
  import About from "./routes/About.svelte";
  import Home from "./routes/Home.svelte";
  import Tweets from "./routes/Tweets.svelte";

  let current: any;
  let tweetId: string;

  page("/", () => (current = Home));
  page("/about", () => (current = About));
  page(
    "/tweets/:id",
    (ctx, next) => {
      tweetId = ctx.params.id;
      next();
    },
    () => (current = Tweets)
  );

  page.start();
</script>

<div>
  <svelte:component this={current} {tweetId} />
</div>
