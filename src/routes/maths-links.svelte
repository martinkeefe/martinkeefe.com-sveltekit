<script lang="ts">
  import NormalPage from '$lib/components/NormalPage.svelte'

  import bourke_img from '/img/math-bourke.png'
  import bugman_img from '/img/math-bugman.png'
  import miqel_img from '/img/math-miqel.png'
  import dim_img from '/img/math-dim.png'
  import jos_img from '/img/math-jos.png'
  import beth_img from '/img/math-beth.png'
  import anti_img from '/img/math-anti.png'
</script>

<title>Martin's Maths Links</title>

<NormalPage ident="maths" date="2016-09-17">
  <h1>Maths Links</h1>

  <div class="card">
    <img src={bourke_img} alt="bourke" />
    <p>
      <a href="http://paulbourke.net/">Paul Bourke</a>: The inspiration for my own web site. Paul
      has been adding stuff to his site since the 90s. Wonderful collection of articles on 2D and 3D
      maths as well as some source code for C and POV-Ray.
    </p>
  </div>

  <div class="card">
    <img src={bugman_img} alt="bugman" />
    <p>
      <a href="http://www.bugman123.com/index.html">Paul Nylander</a>: Lots of great images and
      animations, often with Mathmatica and POV-Ray code.
    </p>
  </div>

  <div class="card">
    <img src={miqel_img} alt="miqel" />
    <p>
      <a
        href="http://web.archive.org/web/20160110200622/http://miqel.com/fractals_math_patterns/visual_math_varieties.html"
        >Michael Coleman</a
      >: An eclectic site full of interesting stuff. It seems to have disappeared so this is a link
      to the Wayback Machine.
    </p>
  </div>

  <div class="card">
    <img src={dim_img} alt="dim" />
    <p>
      <a href="http://www.dimensions-math.org/Dim_E.htm">Dimensions</a>: A walk through mathematics.
      A film for a wide audience in nine chapters. Two hours of maths, that take you gradually up to
      the fourth dimension. Mathematical vertigo guaranteed!
    </p>
  </div>

  <div class="card">
    <img src={jos_img} alt="jos" />
    <p>
      <a href="http://www.josleys.com/index.php">Jos Leys</a>: More images by one of the people
      responsible for the <a href="http://www.dimensions-math.org/">Dimensions</a> and
      <a href="http://www.chaos-math.org/">Chaos</a> films.
    </p>
  </div>

  <div class="card">
    <img src={beth_img} alt="beth" />
    <p>
      <a href="http://www.bathsheba.com/">Bathsheba Grossman</a>: The art of geometry. Stunning 3D
      printed metal sculptures and laser etched crystals.
    </p>
  </div>

  <div class="card">
    <img src={anti_img} alt="anti" />
    <p>
      <a href="http://www.antiprism.com/">Antiprism</a>: Open source polyhedron modelling software.
      Create, transform, analyse, and visualise polyhedra.
    </p>
  </div>
</NormalPage>
