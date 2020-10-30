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
const likeButton = document.querySelector('.like-btn')

toyForm.addEventListener('submit', function(event) {
    event.preventDefault()
    submitData(event.target)

  }
)

// else if (event.target.matches(likeButton)) {
//   console.log("add likes")
// }


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

// for each reference
// const object = { a: 1, b: 2, c: 3 };
// for (const property in object) {  console.log(`${property}: ${object[property]}`);}
// expected output:// "a: 1"// "b: 2"// "c: 3"