<script lang="ts">
  import Rate from './Rate.svelte'

  import imdb from '/img/icons8-imdb-48.png'
  import youtube from '/img/icons8-play-button-48.png'
  import tomato from '/img/icons8-tomato-48.png'
  import netflix from '/img/icons8-netflix-48.png'
  import zooqle from '/img/zq-logo.png'

  let help = false
</script>

<span class="help" on:click={() => (help = !help)}>?</span>

{#if help}
  <div class="help">
    <p>Here is a key to the links in the left-hand column:</p>
    <dl class="films">
      <dt><img src={imdb} alt="" height="16" /></dt>
      <dd>Goes to film’s page at IMDB.</dd>
      <dt><img src={youtube} alt="" height="16" /></dt>
      <dd>Goes to a trailer on YouTube.</dd>
      <dt><img src={tomato} alt="" height="16" /></dt>
      <dd>Goes to film’s page at Rotten Tomatoes.</dd>
      <dt><img src={netflix} alt="" width="46" /></dt>
      <dd>Goes to a site that tell’s you in which counties the film is available on Netflix.</dd>
      <dt><img src={zooqle} alt="" height="18" /></dt>
      <dd>
        Goes to a site listing bitTorrents of the film. Caution: You should know what you’re doing
        if you use this. <i>Never</i> use the direct download links!
      </dd>
    </dl>
    <p>
      Once I’ve seen a film I record my reaction like this: <Rate seen="love" />=love, <Rate
        seen="like"
      />=like, <Rate seen="ok" />=ok, <Rate seen="dislike" />=dislike, <Rate seen="hate" />=hate.
      Sometimes I add a note about my reaction.
    </p>
  </div>
{/if}

<style>
  span.help {
    float: right;
    color: rgb(54, 50, 65);
    background: rgb(173, 167, 228);
    padding: 2px;
    font-size: 20px;
    /* font-family: 'Lato, sans-serif'; */
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;
    width: 28px;
    height: 28px;
    border-radius: 14px;
    margin-left: 6px;
    text-align: center;
  }
  div.help {
    /* padding: 14px; */
    padding-left: 1rem;
    padding-right: 1rem;
    background: rgb(64, 60, 75);
    border-radius: 14px;
    margin-bottom: 1rem;
  }

  .help dt {
    float: left;
    clear: left;
    width: 50px;
  }
  .help dd {
    margin: 0 0 0 68px;
    padding: 0 0 0.5em 0;
  }
</style>
