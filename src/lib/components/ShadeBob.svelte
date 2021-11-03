<script lang="ts">
  import { onDestroy } from 'svelte'

  let canvas: HTMLCanvasElement
  let canvas_w = 0
  let canvas_h = 0
  let context: CanvasRenderingContext2D

  function tap(node) {
    document.addEventListener('keypress', reset)

    return {
      destroy() {
        document.removeEventListener('keypress', reset)
      },
    }
  }

  $: if (canvas) {
    canvas_w = canvas.clientWidth
    canvas_h = canvas_w
    canvas.width = canvas_w
    canvas.height = canvas_h
    context = canvas.getContext('2d')
    reset()
    window.addEventListener('keypress', reset)
  }

  const fps = 10
  const angle = (Math.PI / 180) * 8
  const limit1 = Math.PI * 1.5
  const limit2 = Math.PI * 1.79
  const c = new Array(6)
  const d = new Array(6)

  let x, y
  let p_x, p_y
  let a = 0
  let b = 0
  let r, e, radius
  let prv_x, prv_y, prv_x2, prv_y2
  let timeout

  function reset() {
    context.fillStyle = 'rgb(54,50,65)'
    context.fillRect(0, 0, canvas_w, canvas_h)
    clearTimeout(timeout)
    a = Math.random() * angle
    b = Math.random() * angle
    r = 0
    for (var i = 0; i < 6; i++) {
      c[i] = Math.random() / 2
      d[i] = Math.random() / 2
    }
    radius = Math.round((canvas_w + canvas_h) / 4.5)
    e = radius * 0.2 /* 0.15 */
    p_x = Math.round(canvas_w / 2)
    p_y = Math.round(canvas_h / 2)
    x =
      radius * c[0] * Math.cos(a * d[1]) +
      radius * c[2] * Math.sin(a * d[3]) +
      radius * c[4] * Math.sin(a * d[5])
    y =
      radius * c[5] * Math.sin(a * d[4]) +
      radius * c[3] * Math.cos(a * d[2]) +
      radius * c[1] * Math.cos(a * d[0])
    anim()
  }

  function anim() {
    const a1 = Math.cos(a * 2)
    const a2 = Math.cos(a * 4)
    const a3 = Math.cos(a)
    const a4 = Math.sin(a)

    if (b > limit1 && b < limit2) {
      r += radius * 0.02 * a1
      prv_x = x
      prv_y = y
      x = prv_x2 + r * a3
      y = prv_y2 + r * a4
    } else {
      prv_x = x
      prv_y = y
      prv_x2 = x
      prv_y2 = y
      x =
        radius * c[0] * Math.cos(a * d[1]) +
        radius * c[2] * Math.sin(a * d[3]) +
        radius * c[4] * Math.sin(a * d[5])
      y =
        radius * c[5] * Math.sin(a * d[4]) +
        radius * c[3] * Math.cos(a * d[2]) +
        radius * c[1] * Math.cos(a * d[0])
    }

    const c3 = 16 * Math.cos(a * 10)
    const c1 = Math.floor(56 * Math.cos(a * angle * 4) + c3)
    const c2 = Math.floor(56 * Math.sin(a * angle * 4) - c3)

    context.lineCap = 'round'
    context.strokeStyle =
      'rgba(' + (192 + c1) + ',' + (192 + c2) + ',' + (192 - c1) + ',' + (0.01 - 0.005 * -a1) + ')'
    context.lineWidth = e * 1.4 + e * 0.8 * a3
    draw_line(p_x, p_y, prv_x, prv_y, x, y)

    context.lineWidth = e + e * 0.8 * a3
    draw_line(p_x, p_y, prv_x, prv_y, x, y)

    context.strokeStyle =
      'rgba(' + (192 + c1) + ',' + (192 + c2) + ',' + (192 - c1) + ',' + (0.06 - 0.03 * -a1) + ')'
    context.lineWidth = e * 0.6 + e * 0.35 * a3
    draw_line(p_x, p_y, prv_x, prv_y, x, y)

    context.strokeStyle = 'rgba(0,0,0,0.06)'
    context.lineWidth = e * 0.4 + e * 0.225 * a3
    draw_line(p_x, p_y, prv_x, prv_y, x, y)

    context.strokeStyle =
      'rgba(' + (192 + c1) + ',' + (192 + c2) + ',' + (192 - c1) + ',' + (0.1 - 0.075 * -a1) + ')'
    context.lineWidth = e * 0.2 + e * 0.1 * a3
    draw_line(p_x, p_y, prv_x, prv_y, x, y)

    context.strokeStyle = 'rgba(255,255,255,0.4)'
    context.lineWidth = e * (0.1 - 0.05 * -a2)
    draw_line(p_x, p_y, prv_x, prv_y, x, y)

    a += angle * Math.cos(b)
    b += angle * 0.1
    //if (b > limit1) {
    //    context.fillStyle='rgba(0.2,0.2,0.27,0.08)'
    //    context.fillRect(0,0,canvas_w,canvas_h)
    //}
    if (b < limit2) {
      timeout = setTimeout(anim, fps)
    }
    // else {
    //     //reset()
    //     //pause = true
    // }
  }

  function draw_line(x, y, x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x + x1, y + y1)
    context.lineTo(x + x2, y + y2)
    context.moveTo(x - x1, y + y1)
    context.lineTo(x - x2, y + y2)
    context.moveTo(x - x1, y - y1)
    context.lineTo(x - x2, y - y2)
    context.moveTo(x + x1, y - y1)
    context.lineTo(x + x2, y - y2)
    context.moveTo(x + y1, y + x1)
    context.lineTo(x + y2, y + x2)
    context.moveTo(x - y1, y + x1)
    context.lineTo(x - y2, y + x2)
    context.moveTo(x - y1, y - x1)
    context.lineTo(x - y2, y - x2)
    context.moveTo(x + y1, y - x1)
    context.lineTo(x + y2, y - x2)
    context.moveTo(x, y + x2)
    context.lineTo(x, y + x1)
    context.moveTo(x, y - x2)
    context.lineTo(x, y - x1)
    context.moveTo(x + x2, y)
    context.lineTo(x + x1, y)
    context.moveTo(x - x2, y)
    context.lineTo(x - x1, y)
    context.stroke()
    context.closePath()
  }
</script>

<canvas style="width: 100%" on:click={reset} bind:this={canvas} />
<p use:tap style="text-align: center">Tap or hit any key for a new pattern.</p>
