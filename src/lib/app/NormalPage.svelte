<script lang="ts">
  export let ident: string
  export let date: string = ''

  import martian from '../../../static/img/martian.png'
  import SideNav from './SideNav.svelte'
  import menu from '$lib/menu'
</script>

<div id="layout">
  <nav id="sidebar" class="side">
    <a href="/"><span>Home</span><img src={martian} alt="martian" /></a>
    <SideNav items={menu} {ident} />
    <slot name="side" />
  </nav>

  <div class="body">
    <slot />
    <div class="update">Last update: {date}</div>
  </div>
</div>

<style>
  #layout {
    display: flex;
    max-width: 64rem;
    margin: 0 auto;
  }
  #sidebar {
    position: sticky;
    top: 20px;
    align-self: flex-start;
  }
</style>
