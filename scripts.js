import data from './data.js';
const itemsContainer = document.querySelector('#items');

//iterate through data array
for (let i = 0; i < data.length; i++) {
  //create new div
  const newDiv = document.createElement('div');
  newDiv.className = 'item';
  //create img element
  const img = document.createElement('img');
  // reassign image every time we go through loop
  img.src = data[i].image;
  img.width = 300;
  img.height = 300;
  // add img to div
  newDiv.appendChild(img);
  console.log(img);
  itemsContainer.appendChild(newDiv);
  //add paragraph element for desciption
  const description = document.createElement('P');
  description.innerText = data[i].description;
  //append description to div
  newDiv.appendChild(description);
  //add paragraph element for price
  const price = document.createElement('P');
  price.innerText = data[i].price;
  //add price element to div
  newDiv.appendChild(price);
  //make a cart button
  const button = document.createElement('button');
  //add an id to the button - name of the mood
  button.id == data[i].name;
  //create a data-price attribute for each element
  button.dataset.price = data[i].price;
  //name the button in HTML
  button.innerHTML = "Add to Cart";
  //add button to div
  newDiv.appendChild(button);
}
