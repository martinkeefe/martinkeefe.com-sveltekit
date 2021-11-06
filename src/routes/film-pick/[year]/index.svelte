<script lang="ts" context="module">
  import type { Film } from '$lib/film/types'
  import NormalPage from '$lib/app/NormalPage.svelte'
  import Row from '$lib/film/Film.svelte'
  import Help from '$lib/film/Help.svelte'

  export async function load({ page }) {
    const year = page.params.year

    let films = []
    let error

    try {
      const response = await fetch(
        'https://uamrc1iiak.execute-api.eu-west-2.amazonaws.com/dev/films/' + year,
      )

      if (response.ok) {
        const json = await response.json()
        // console.warn(json)
        films = json.Items
      } else {
        error = 'Network response was not ok.'
      }
    } catch (ex) {
      error = ex.message
    }

    return { props: { year, films, error } }
  }
</script>

<script lang="ts">
  export let year: string
  export let films: Film[]
  export let error: string | undefined

  $: TITLE = `${year} Film Picks`
</script>

<title>Martin’s {TITLE}</title>

<NormalPage ident={'film-pick.' + year}>
  <h1>{TITLE}</h1>

  <Help />

  {#if error}
    <p>{error}</p>
  {:else}
    <table>
      <tbody>
        {#each films.filter(film => !film.hide) as film (film.id)}
          <Row {film} />
        {/each}
      </tbody>
    </table>
  {/if}
</NormalPage>

<style>
  p {
    color: crimson;
  }

  table {
    clear: both;
  }
</style>
