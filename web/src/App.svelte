<script>
  import page from "page";
  import About from "./routes/About.svelte";
  import Home from "./routes/Home.svelte";
  import Tweets from "./routes/Tweets.svelte";

  let current;
  let params = {};

  page("/", () => (current = Home));
  page("/about", () => (current = About));
  page(
    "/tweets/:id",
    (ctx, next) => {
      params = ctx.params;
      next();
    },
    () => (current = Tweets)
  );

  page.start();
</script>

<div id="content">
  <svelte:component this={current} {params} />
</div>
