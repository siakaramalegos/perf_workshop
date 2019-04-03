// Create list SVG
// const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
// svg.setAttribute("width", "50px")
// svg.setAttribute("height", "50px")
// svg.setAttribute("viewBox", "0 0 50 50")
// svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")

// const path = document.createElement('path')
// path.setAttribute('d', "M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z ")
// path.setAttribute('fill', '#00A6BF')
// svg.appendChild(path)

// Create link to contents
const link = document.createElement('a')
link.setAttribute('href', '#/1')
link.innerHTML = 'menu'
link.setAttribute('id', 'footer-link')
// link.appendChild(svg)

// Add link to footer
const revealContainer = document.getElementsByClassName('reveal')[0]
revealContainer.appendChild(link)
