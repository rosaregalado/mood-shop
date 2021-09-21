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

const cart = [];

function addItem(name, price) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].wty += 1;
      //ends loop, does not run next lines of code
      return;
    }
  }
  const item = {name, price, qty: 1};
  cart.push(item);
}

function showItems() {
  const qty = getQty();
  console.log(`You have ${qty} items in your cart`);

  for (let i = 0; i < cart.length; i++) {
    console.log(`${cart[i].name} $${cart[i].price} x ${cart[i].qty}`);
  }
  const total = getTotal();
  console.log(`Total in cart: $${total}`)
}

function getQty() {
  // set initial qty to zero
  let qty = 0;
  for (let i = 0; i < cart.length; i++) { 
    qty += cart[i].qty;
  }
  return qty;
}

function getTotal() {
  //set initial cart total to zero
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    //add item price * item qty to total price
    total += cart[i].price * cart[i].qty;
  }
  return total.toFixed(2);
}