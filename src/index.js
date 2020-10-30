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

fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => toyData = data);


// create 1 card

function createCard(name, img, likes) {
  const div = document.createElement('div')
  div.classList = 'card'
  div.textContent = `<h2>${name}</h2>
      <img src="${img}" />
      <p>${likes} Likes </p>
      <button class="like-btn">Like <3</button>`
  addToToyCollection(div)
}

function addToToyCollection(card) {
  toyCollection.append(card)
}

const testCard = createCard("test name", "url", "3")

// put card on dom



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