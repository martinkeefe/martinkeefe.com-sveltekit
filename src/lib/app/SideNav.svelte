<script lang="ts">
  import type { NavItem } from '$lib/types'
  export let items: NavItem[]
  export let ident: string

  $: idents = ident.split('.')
</script>

<ul>
  {#each items as item}
    {#if item.sub && idents.includes(item.ident)}
      <li id={item.ident}>{item.text}<svelte:self {ident} items={item.sub} /></li>
    {:else if idents.includes(item.ident)}
      <li id={item.ident}>{item.text}</li>
    {:else}
      <li id={item.ident}><a href={item.href}>{item.text}</a></li>
    {/if}
  {/each}
</ul>
