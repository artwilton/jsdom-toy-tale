let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


const toyCollection = document.getElementById('toy-collection')

let toyData = {}

function initialize() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(renderAllToys);
  }

function renderAllToys(toyData) {
    toyData.forEach(createCard)
}

function createCard(toyObj) {
  const div = document.createElement('div')
  div.className = 'card'
  div.dataset.id = toyObj.id
  div.innerHTML = `
    <h2>${toyObj.name}</h2>
    <img src="${toyObj.image}" />
    <p>${toyObj.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    ` 
  addToToyCollection(div)
}

function addToToyCollection(card) {
  toyCollection.append(card)
}

initialize()



body: JSON.stringify({
  "name": "Jessie",
  "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  "likes": 0
})

const sampleData = {
  name: "Jessie",
  image: "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  likes: 0
}

// submitData(sampleData)



const toyForm = document.querySelector('.add-toy-form')
const likeButton = document.querySelectorAll('.like-btn')

toyForm.addEventListener('submit', function(event) {
    event.preventDefault()
    submitData(event.target)

  }
)

function submitData(formData) {
    return fetch( 'http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        name: formData.name.value,
        image: formData.image.value,
        likes: 0
      } )
    } )
    .then( function ( response ) {
        return response.json()
    } )
    .then( function ( toyObj ) {
      createCard(toyObj)
    } )
    .catch( function ( error ) {
        document.body.innerHTML = error.message
    } )
}

document.addEventListener('click', function(event) {
  likeClick(event)
})

function likeClick(event) {
  if (event.target.className === "like-btn") {
    const likeButton = event.target
    const card = likeButton.closest(".card")
    const id = card.dataset.id
    const likeTag = card.querySelector("p")
    
    // get the donation amount from the DOM
    const likeAmount = parseInt(likeTag.textContent[0], 10)  + 1

    addLikes(id, likeAmount)
      .then(updatedLikes => {
        console.log('Success:', updatedLikes);

        likeTag.textContent = updatedLikes.likes + " Likes"
      })
      .catch(error => {
        alert(error)
      })
  }
}

function addLikes(id, likeAmount) {
  return fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        likes: likeAmount
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Error")
        }
      })
}