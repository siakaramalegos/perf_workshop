---
theme: style.css
verticalSeparator: -v-
highlightTheme: github
---

<!-- .slide: data-background="./images/hero_bg.jpg" -->
<h1 class="title dark-background"><span class="translucent">Get in the Fast Lane:</span> Measuring Web Performance</h1>
<h2 class="subtitle">Sia Karamalegos</h2>

-v-

## hi, i'm sia

<img src="./images/sia.gif" alt="Sia at Mardi Gras" height="500px">

-v-

## introduce yourself to your neighbors

Note: Suggest pair programming and give them an opportunity to change seats.

-v-

## Take out a piece of paper...

<img src="./images/notes.jpg" alt="Note paper with three columns of implement, research, or seek assistance" height="500px">

-v-

<!-- .slide: data-background="./images/elevator2.jpg" -->
<h1 class="dark-background">
  <span class="highlighter">Why do elevators have mirrors?</span>
</h1>

---

# Why Should I Care?

-v-

> Pinterest reduced load times by 40% and saw a 15% increase in sign ups.

<small>https://wpostats.com/</small>

-v-

> Starbucks implemented a 2x faster time to interactive resulting in a 65% increase in rewards registrations.

<small>[Chrome Dev Summit](https://www.youtube.com/watch?v=Xryhxi45Q5M&t=1113s&index=6&list=PLNYkxOF6rcIDjlCx1PcphPpmf43aKOAdF )</small>

-v-

> AliExpress reduced load by 36% and saw a 10.5% increase in orders.

<small>https://wpostats.com/</small>

-v-

> Speed is now used as a ranking factor for mobile searches.

<small>https://developers.google.com/web/updates/2018/07/search-ads-speed</small>

Note: In 2016, Doubleclick by Google released a report saying that 53% of mobile sites are abandoned if pages take longer than 3 seconds to load.

---

# Performance Auditing

Note: Audit the crap site with Lighthouse, webpagetest.org. Build agenda from there.

---

# Optimized, Responsive Images

-v-

## Goals

1. Users shouldn't download unnecessary bytes.
2. Our images should look good.

-v-

<section>
  <h1>Image Responsiveness Toolbox</h1>
  <ul>
	  <li class="fragment fade-in-then-semi-out">Best file format</li>
	  <li class="fragment fade-in-then-semi-out">Right size and resolution</li>
	  <li class="fragment fade-in-then-semi-out">Art direction</li>
  </ul>
</section>

Note: These are the 3 main topics I'm going to talk about today.

-v-

# 💾  File Format  💾

-v-

> Choosing the right image format... can be far more important than any flashy new “responsive image” technique.

<small>Mat Marquis, [Image Performance](https://abookapart.com/products/image-performance)</small>

Note: Responsive Issues Community Group (RICG) chair. Getting the right image format is more important than any responsive image technique.

-v-

## Raster vs Vector

<img src="./images/raster_vs_vector.png" alt="Raster vs Vector scaling" width="80%">

<small>https://commons.wikimedia.org/wiki/File:Bitmap_VS_SVG.svg</small>

Note: Raster images contain a set of data about a 2D grid of pixels. Vectors are a system of coordinates and "vectors" than can be redrawn at any size. Rasters are good for photo-realism. Raster file formats are really just different compression methods.

-v-

## File Format Options

- `svg` (vector) - best for limited colors and sharp lines (e.g., logos)
- `gif` (lossy) - fun but terrible. Use svg or video instead.
- `png` (lossless) - best for photo-realistic with transparency.
- `jpg` (lossy) - much better compression based on hue
- `webp` (lossy or lossless) - best of both `png` and `jpg` with smaller file sizes

Note: Raster file formats are really just different compression methods. **SVG**: Can style and animate with CSS or make basic edits in XML. **GIF**: huge file sizes for animation, use video instead. svg or jpg are better for stills. Twitter converts GIF to video. **Lossless compression** - like using ZIP for a file but all the data is still saved. **PNG**: Use jpg if don't need transparency. **JPG**: much better compression algos.

-v-

# 📺 Size &amp; Resolution 📺

-v-

## `srcset`

- Defines a set of images and the natural size of each image
- Always include a **base src** attribute for older browsers.
- The browser chooses the best image to download based on assumed display width of `100vw` and the user's screen resolution.

**`srcset` files are candidates, not commands.**

```html
<img srcset="https://placekitten.com/300/200 300w,
             https://placekitten.com/600/400 600w,
             https://placekitten.com/900/500 900w"
     src="https://placekitten.com/300/200"
     alt="cute random kitten" />
```

Note: `srcset` is an attribute for `<img>`. Width is in pixels even though is says `w`. Format is filename, space, actual image width in pixels. Alternatively, use x-descriptors.

-v-

## `sizes`

- Defines a set of media conditions and sizes intended for display of the image
- Leave out the media condition for the last one (serves as default for no matches)
- **Order matters! First match is used.**
- Browser chooses the best image to load based on matching display width and user's screen resolution.
- Add analogous CSS

```html
<img src="https://placekitten.com/300/200"
  srcset="https://placekitten.com/300/200 300w,
          https://placekitten.com/600/400 600w,
          https://placekitten.com/900/500 900w"
  sizes="(max-width: 320px) 280px,
         (max-width: 640px) 580px,
         1000px"
  alt="cute random kitten" />
```

Note: Format is [media condition][space][display width]. Once again, these are candidates, not commands. We are letting the browser choose which file to use ultimately.

-v-

## Demystifying Resolution

- **DPR (device pixel ratio)** = viewport CSS pixels/actual screen resolution
- **In layman's terms**: on a 2x screen, a displayed image width of 100px needs a 200px file/natural width image to look good.
- **Example**: If the viewport is 320px, the pixel ratio for the medium image would be 800/320 = 2.5x. Thus, the browser would choose the medium image for a Retina (2x) display:

```html
<img
  src="fallback.jpg"
  srcset="small.jpg 400w,
          medium.jpg 800w,
          large.jpg 1600w"
  alt="..." />
```

Note: `srcset` can accept DPR instead of widths, though I find this more confusing.

-v-

## Helpful Debugging Tools: DevTools

- Screen DPR: `window.devicePixelRatio`.
- Inspect `<img>` then hover on filename to see displayed and natural sizes
- Which file is being used:
  - Inspect > Properties > `img` > `currentSrc`, or...
  - `performance.getEntriesByType('resource')` and pair with `.filter()`, then look for the resource `name`

```javascript
performance.getEntriesByType('resource').filter(resource =>
  resource.name.includes('pug')
)
```

-v-

## Helpful Performance Tools: RespImageLint

For performance, try out the [RespImageLint](https://ausi.github.io/respimagelint/) bookmarklet.

<img src="./images/RespImageLint.png" alt="Screenshot of RespImageLint feedback saying multiple images for different screen sizes needed" style="border:none;box-shadow:none;">

-v-

# 🎨 Art Direction 🎨

<img src="./images/art-direction.png" alt="examples of the same image on multiple devices" style="border:none;box-shadow:none;">

Note: (1) Art direction is a technique for drawing attention to the most important parts, or targeting specific features of an image, even when it’s viewed on different devices or platforms. (2) So how do we do art direction?

-v-

## `<picture>`

- Provide multiple images based on device size, resolution, orientation, and more.
- Use `media` attribute for viewport spec. First match is used.
- Always provide `<img>` last for no match or browsers that do not support `<picture>` and `<source>`

```html
<picture>
  <source media="(min-width: 800px)"
          srcset="wide_800.jpg 800w,
                  wide_1600.jpg 1600w">
  <source media="(min-width: 400px)"
          srcset="narrow_400.jpg 400w,
                  narrow_800.jpg 800w">
  <img src="wide_800.jpg"
       alt="Woman with dog looking at Grand Canyon">
</picture>
```

Note: (1) In this `picture` tag, we have 2 sources and an img. Older browsers simply ignore the picture and source tags and use the img tag. (2) The video tag also works this way and can have multiple `source` tags

-v-

## Bonus: Bleeding-Edge File Formats

- Use `<picture>` for new file formats like `webp`!
- The browser uses the first compatible file type listed.
- The `<img>` source should be a fallback file format for browsers that don't support the previous formats listed.

```html
<picture>
  <source type="image/webp" srcset="pyramid.webp">
  <source type="image/svg+xml" srcset="pyramid.svg">
  <img src="pyramid.png"
       alt="regular pyramid built from four equilateral triangles">
</picture>
```

-v-

# Tooling

Note: Do I really have to write all that markup myself? No.

-v-

## Some (not all) tooling options:

- Simple markup and server selects better image
- Cloud-based services like [Cloudinary](https://cloudinary.com)
- Build tools like various webpack loaders

Note: (1) Many people have their server hijack the request and serve the best image to minimize markup. Could also use a serverless function. (2) Cost money. (3) So many options - both create your srcset code and process the images

-v-

# Exercise

<video autoplay loop>
  <source src="./images/arnold_cats.mp4" type="video/mp4">
  Sorry, your browser doesn't support embedded videos.
</video>

---

# Resource Hints and Fonts

-v-

## Webfonts

<ul class="plus-minus">
  <li class="plus">Hosted on fast and reliable CDNs</li>
  <li class="plus">Can provide optimized variants based on user's browser</li>
  <li class="minus">Minumum of 2 separate requests</li>
  <li class="minus">Can't use resource hints</li>
  <li class="minus">Doesn't take advantage of HTTP2 multiplexing</li>
  <li class="minus">No control over FOUT or FOIT</li>
</ul>

-v-

## Loading Google Fonts

```html
<link href="https://fonts.googleapis.com/css?family=Muli:400"
      rel="stylesheet">
```

<img src="./images/webfonts_before.png" alt="Google fonts load waterfall showing wasted time">

-v-


<img src="./images/resource-hints.jpg_large" alt="Resource hints cheatsheet find pdf at https://storage.googleapis.com/resource-hints/resource-hints-cheatsheet.pdf" />

<small>https://twitter.com/addyosmani/status/743571393174872064?lang=en</small>

Note: pdf version of this is in the replies to this tweet

-v-

## Loading Google Fonts with preconnect to fonts.gstatic.com

```html
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
<link href="https://fonts.googleapis.com/css?family=Muli:400"
      rel="stylesheet">
```

<img src="./images/webfonts_preconnect.png" alt="Google fonts load waterfall showing preconnect">

-v-

## Self-Hosting Fonts

```html
<link as="font" type="font/woff2"
  href="./fonts/muli-v12-latin-regular.woff2" crossorigin>

<link as="font" type="font/woff2"
  href="./fonts/muli-v12-latin-700.woff2" crossorigin>
```

Note: This alone does not fix perf problem.

-v-

## Preloading self-hosted fonts

```html
<link rel="preload" as="font" type="font/woff2"
  href="./fonts/muli-v12-latin-regular.woff2" crossorigin>

<link rel="preload" as="font" type="font/woff2"
  href="./fonts/muli-v12-latin-700.woff2" crossorigin>
```

<img src="./images/font_preload.png" alt="Self-hosted waterfall showing preload">

<small>Note that `preload` loads a resource whether used or not. Only preload resources that are needed on a particular page.</small>

Note: `rel="preload"` tells the browser to declaratively fetch the resource but not “execute” it (our CSS will queue usage). `as="font"` tells the browser what it will be downloading so that it can set an appropriate priority. Without it, the browser would set a default low priority. `type="font/woff2` tells the browser the file type so that it only downloads the resource if it supports that file type. `crossorigin` is required because fonts are fetched using anonymous mode CORS.

-v-

## FOIT

<img src="./images/FOIT.png" alt="FOIT in action — note the missing navbar text in the filmstrip screenshot (throttled to slow 3G)">

Note: FOIT in action — note the missing navbar text in the filmstrip screenshot (throttled to slow 3G)

-v-

## `font-display`

<img src="./images/font-display.png" alt="comparison of different font-display values" width="80%">

<small>https://font-display.glitch.me/</small>

Note: add the `font-display` property to the `@font-face` declaration

-v-

## subset

- The [subfont](https://github.com/Munter/subfont) npm package also dynamically subsets your fonts.
- Are you a fan of Gatsby? There’s even a [subfont plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-subfont/) for it.

-v-

# Exercise

<video autoplay loop playsinline muted>
  <source src="./images/hamster.mp4" type="video/mp4">
  Sorry, your browser doesn't support embedded videos.
</video>

---

# Service Workers for Performance

---

# Third-Party Scripts

---

# Code Splitting and Bundle Optimization

---

# Lazy Loading

---

# Perceived Performance

Note: Using psychology to make an app feel faster than it actually is

-v-

<!-- .slide: data-background="./images/baggage_claim.jpg" -->
<h1 class="dark-background">
  <span class="highlighter">Houston's Baggage Claim Complaints</span>
</h1>

<small>http://www.nytimes.com/2012/08/19/opinion/sunday/why-waiting-in-line-is-torture.html</small>

Note: “Often the psychology of queuing is more important than the statistics of the wait itself,” notes the M.I.T. operations researcher Richard Larson. Occupied time (walking to baggage claim) feels shorter than unoccupied time (standing at the carousel).

---

> Are you better off making the site load faster or ensuring that users complete their tasks?

<small>Christine Perfetti, [The Truth About Download Time](https://articles.uie.com/download_time/) 2006</small>

---

<!-- .slide: data-background="./images/hero_bg.jpg" -->
<h1 class="title dark-background">Thanks!</h1>
Slides, resources, and more at <a href="https://bit.ly/siaspeaks" class="dark-background">bit.ly/siaspeaks</a>

