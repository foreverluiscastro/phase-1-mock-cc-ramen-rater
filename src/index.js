// write your code here
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('ramen-menu')
  const form = document.getElementById('new-ramen')
  form.addEventListener('submit', submitRamen)
  fetchRamens()
  const deleteBtn = document.getElementById('delete-button')
  deleteBtn.addEventListener('click', deleteAlert)
  const acceptDelete = document.getElementById('accept')
  const denyDelete = document.getElementById('deny')
  acceptDelete.addEventListener('click', deleteRamen)
  denyDelete.addEventListener('click', hideModal)
  const update = document.getElementById('edit-ramen')
  update.addEventListener('submit', editRamen)
})

function editRamen(e) {
  e.preventDefault()
  const ratingInput = e.target.children[2].value
  const newRating = parseInt(ratingInput, 10)
  const newComment = e.target.children[4].value
  // debugger
  let ramenId = document.getElementById('ramen-detail').children[1].id
  fetch(`http://localhost:3000/ramens/${ramenId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'Application/json',
      'Accept': 'Application/json'
    },
    body: JSON.stringify({
      rating: newRating,
      comment: newComment
    })
  })
  .then(r => r.json())
  .then((r) => {
    console.log(r)
    const rating = document.getElementById('rating-display')
    const comment = document.getElementById('comment-display')
    rating.innerText = r.rating
    comment.innerText = r.comment
    const update = document.getElementById('edit-ramen')
    update.reset()
  })
}

function deleteRamen() {
  let ramenId = document.getElementById('ramen-detail').children[1].id
  fetch(`http://localhost:3000/ramens/${ramenId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'Application/json'
    }
  })
  .then(() => fetchRamens())
}

function hideModal() {
  let modal = document.getElementById('modal')
  modal.className = "hidden"
}

function deleteAlert() {
  // alert('Are you sure you want to delete this Ramen?')
  let modal = document.getElementById('modal')
  modal.className = ""
}

function submitRamen(e) {
  e.preventDefault()
  // debugger
  // grab all the info submitted in the form
  const name = e.target.children[2].value
  const restaurant = e.target.children[4].value
  const image = e.target.children[6].value
  const rating = e.target.children[8].value
  const comment = e.target.children[10].value

  // create an object to match the other ramen
  // for submitting to the db
  const ramenObj = {
    name: name,
    restaurant: restaurant,
    image: image,
    rating: parseInt(rating, 10),
    comment: comment
  }

  postRamen(ramenObj)

  const form = document.getElementById('new-ramen')
  form.reset()
}

function postRamen(ramenToAdd) {
  fetch('http://localhost:3000/ramens', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json'
    },
    body: JSON.stringify(ramenToAdd)
  })
  .then(r => r.json())
  .then(r => renderRamen(r))
}

function fetchRamens() {
  fetch('http://localhost:3000/ramens')
  .then(r => r.json())
  .then(r => renderRamens(r))
}

function showRamen(ramen) {
  // console.log('showRamen was hit!', ramen.id)
  // all of these elements are in the html
  // so no appending elements was needed
  hideModal()
  const details = document.getElementById('ramen-detail')
  const rating = document.getElementById('rating-display')
  const comment = document.getElementById('comment-display')
  // debugger
  const img = details.children[0]
  const name = details.children[1]
  name.id = ramen.id
  const restaurant = details.children[2]
  img.src = ramen.image
  name.innerText = ramen.name
  restaurant.innerText = ramen.restaurant
  rating.innerText = ramen.rating
  comment.innerText = ramen.comment
}

function renderRamens(ramens) {
  const menu = document.getElementById('ramen-menu')
  menu.innerHTML = ""
  ramens.forEach(ramen => {
    // show the first ramen on load
    // checks if the ramen in the loop is equal to
    // the first ramen in the ramens collection
    if (ramens[0].id === ramen.id) {
      renderRamen(ramen)
      showRamen(ramen)
    } else {
      renderRamen(ramen)
    }
  });
}

function renderRamen(ramen) {
  const menu = document.getElementById('ramen-menu')
  let img = document.createElement('img')
  img.src = ramen.image
  img.addEventListener('click', () => showRamen(ramen))
  menu.appendChild(img)
}