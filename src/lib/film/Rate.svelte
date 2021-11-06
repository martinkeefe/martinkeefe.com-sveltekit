<script lang="ts">
  export let seen: string

  const COLOR = {
    love: '#0FB',
    like: '#0A0',
    ok: '#BB0',
    dislike: '#F80',
    hate: '#D00',
  }
  const EMOJI = {
    love: '❤',
    like: '👍',
    ok: '😐',
    dislike: '👎',
    hate: '🤬',
  }
</script>

{#if seen}
  <span class={seen}> {EMOJI[seen]}</span>
  <!-- <svg width="14" height="19">
    <rect width="14" height="14" fill={COLOR[seen]} />
  </svg> -->
{/if}

<style>
  span.love {
    color: red;
  }
</style>
