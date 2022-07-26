// write your code here
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('ramen-menu')
  const form = document.getElementById('new-ramen')
  form.addEventListener('submit', submitRamen)
  fetchRamens()
})

function submitRamen(e) {
  e.preventDefault()
  // debugger
  // grab all the info submitted in the form
  const name = e.target.children[2].value
  const restaurant = e.target.children[4].value
  const image = e.target.children[6].value
  const rating = e.target.children[8].value
  const comment = e.target.children[10].value

  const ramenObj = {
    name: name,
    restaurant: restaurant,
    image: image,
    rating: rating,
    comment: comment
  }

  renderRamen(ramenObj)
}

function fetchRamens() {
  fetch('http://localhost:3000/ramens')
  .then(r => r.json())
  .then(r => renderRamens(r))
}

function showRamen(ramen) {
  console.log('showRamen was hit!', ramen.id)
  // all of these elements are in the html
  // so no appending elements was needed
  const details = document.getElementById('ramen-detail')
  const rating = document.getElementById('rating-display')
  const comment = document.getElementById('comment-display')
  // debugger
  const img = details.children[0]
  const name = details.children[1]
  const restaurant = details.children[2]
  img.src = ramen.image
  name.innerText = ramen.name
  restaurant.innerText = ramen.restaurant
  rating.innerText = ramen.rating
  comment.innerText = ramen.comment
}

function renderRamens(ramens) {
  ramens.forEach(ramen => {
    // show the first ramen on load
    if (ramen.id === 1) {
      renderRamen(ramen)
      showRamen(ramen)
    }
    renderRamen(ramen)
  });
}

function renderRamen(ramen) {
  const menu = document.getElementById('ramen-menu')
  let img = document.createElement('img')
  img.src = ramen.image
  img.addEventListener('click', () => showRamen(ramen))
  menu.appendChild(img)
}