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
  // function renderAllAnimals(animalData) {
  //     .forEach takes a callback function (function definition/reference); renderOneAnimal is a function reference
  //     animalData.forEach(renderOneAnimal)
  //   }



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




// const testCard = createCard("test name", "url", "3")
initialize()
// put card on dom

/********** Render Functions **********/ 
// takes one animal object and creates the necessary DOM elements
// function renderOneAnimal(animalObj) {
//   // step 1. create the outer element using createElement (& assign necessary attributes)
//   const card = document.createElement("li")
//   card.className = "card"
//   card.dataset.id = animalObj.id
//   // step 2. use innerHTML to create all of its children
//   card.innerHTML = `
//   <div class="image">
//     <img src="${animalObj.imageUrl}" alt="${animalObj.name}">
//     <button class="button delete-button" data-action="delete">X</button>
//   </div>
//   <div class="content">
//     <h4>${animalObj.name}</h4>
//     <div class="donations">
//       $<span class="donation-count">${animalObj.donations}</span> Donated
//     </div>
//     <p class="description">${animalObj.description}</p>
//   </div>
//   <button class="button donate-button" data-action="donate">
//     Donate $10
//   </button>
//   `
//   // step 3. slap it on the DOM!
//   animalList.append(card)
// }
// function renderAllAnimals(animalData) {
//   // .forEach takes a callback function (function definition/reference); renderOneAnimal is a function reference
//   animalData.forEach(renderOneAnimal)
// }
// /********** Initial Render **********/
// function initialize() {
//   fetch("http://localhost:3000/animals")
//     .then(response => response.json())
//     .then(renderAllAnimals)
  // animalData is an array of animal objects from data.js
// }

// get response data
// for each toy object make a <div class="card">
// each card will have H2, img, p, button, and dataset id tags

// when done looks like this:

// <div class="card">
//     <h2>Woody</h2>
//     <img src=toy_image_url class="toy-avatar" />
//     <p>4 Likes </p>
//     <button class="like-btn">Like <3</button>
//   </div>


// const object = { a: 1, b: 2, c: 3 };
// for (const property in object) {  console.log(`${property}: ${object[property]}`);}
// expected output:// "a: 1"// "b: 2"// "c: 3"