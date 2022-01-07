<script>
  let allDates = [];

  const getDates = async () => {
    const response = await fetch("/api/tweets/dates");
    const results = await response.json();
    allDates = results.data;
  };

  getDates();
</script>

<main>
  <h1>Dadboner Classic</h1>

  {#each allDates as row}
    <p><a href="/tweets/{row.date}">{row.date}</a></p>
  {/each}
</main>

<style>
  h1 {
    font-size: 20px;
  }

  p {
    font-size: 12px;
  }
</style>
