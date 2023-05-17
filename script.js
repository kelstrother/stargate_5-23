const glyphs = document.querySelectorAll('.glyph');
const glyphContainers = document.querySelectorAll('.glyph-container');

glyphContainers.forEach((container) => {
  container.firstElementChild.addEventListener('click', (e) => {
    console.log('container glyph: ', e.target.value);
  })
  // container.addEventListener('click', (e) => console.log(e.target))
})

glyphs.forEach((glyph) => {
  glyph.addEventListener('click', (e) => {
    console.log('glyph: ', e.target.value);
  })
})