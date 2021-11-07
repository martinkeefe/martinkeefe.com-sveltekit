<script lang="ts">
  import type { Film } from './types'
  import Rate from './Rate.svelte'

  export let film: Film

  import imdb from '../../../static/img/icons8-imdb-48.png'
  import youtube from '../../../static/img/icons8-play-button-48.png'
  import tomato from '../../../static/img/icons8-tomato-48.png'
  import netflix from '../../../static/img/icons8-netflix-48.png'
  import zooqle from '../../../static/img/zq-logo.png'

  import fr from '../../../static/img/icons8-france-48.png'
  import de from '../../../static/img/icons8-germany-48.png'
  import it from '../../../static/img/icons8-italy-48.png'
  import jp from '../../../static/img/icons8-japan-48.png'

  const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const IMG = { imdb, youtube, tomato, netflix, zooqle, fr, de, it, jp }

  const date = film => film.date.split('-')

  const img_link = (kind, href, props) =>
    `<a target="_blank" href=${href}><img src=${IMG[kind]} style="padding-right: 4px" ${props} /></a>`

  const links = film => {
    const links = []

    links.push(img_link('imdb', 'http://www.imdb.com/title/' + film.id, 'height="16"'))

    if (film.youtube) {
      links.push(
        img_link('youtube', 'https://www.youtube.com/watch?v=' + film.youtube, 'height="16"'),
      )
    }
    if (film.tomato) {
      links.push(
        img_link('tomato', 'https://www.rottentomatoes.com/m/' + film.tomato, 'height="16"'),
      )
    }
    if (film.zooqle) {
      links.push(
        img_link('zooqle', 'https://zooqle.com/movie/' + film.zooqle + '.html', 'height="18"'),
      )
    }
    if (film.netflix) {
      links.push(img_link('netflix', 'http://unogs.com/video/?v=' + film.netflix, 'width="46"'))
    }

    return links.join('')
  }
</script>

<tr class="film">
  <td class="left"
    >{MONTH[Number(date(film)[1]) - 1]}&nbsp;{Number(date(film)[2])}<br />{@html links(film)}</td
  >
  <td
    >{#if film.poster}<img class="poster" src={film.poster} alt="poster" />{/if}</td
  >
  <td>
    <!-- title -->
    <div class="rate">{film.series || ''} <Rate seen={film.seen} /></div>
    <a target="_blank" href={film.link}><i>{film.title}</i></a>
    {#if film.lang === 'jp'}
      <img class="flag" src={IMG.jp} alt="flag" height="13" />
      {film[film.lang + '_title'] || ''}
    {:else if film.lang}
      <img class="flag" src={IMG[film.lang]} alt="flag" height="13" />
      <i>{film[film.lang + '_title'] || ''}</i>
    {/if}
    <!-- text -->
    {#if film.text}
      <p class="text">{@html film.text}</p>
    {/if}
    <!-- note -->
    {#if film.note}
      <p class="note">{@html film.note}</p>
    {/if}
  </td>
</tr>

<style>
  .film td {
    padding: 0.25em;
    vertical-align: top;
  }
  td.left {
    width: 74px;
  }
  div.rate {
    float: right;
  }
  img.flag {
    vertical-align: baseline;
    padding-left: 5px;
  }
  img.poster {
    width: 106px;
    height: 156px;
  }
  .film p.text {
    margin: 0;
    font-size: 18px;
    line-height: 22px;
    padding-bottom: 0.75em;
  }
  .film p.note {
    margin: 0;
    font-size: 18px;
    font-style: italic;
    line-height: 22px;
    padding-bottom: 0.75em;
  }
</style>
