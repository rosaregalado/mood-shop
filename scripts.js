import data from './data.js';
const itemsContainer = document.querySelector('#items');

const itemList = document.getElementById('item-list');
const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');
const addForm = document.getElementById('add-form');
const itemName = document.getElementById('item-name');


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
  button.id = data[i].name;
  //create a data-price attribute for each element
  button.dataset.price = data[i].price;
  //name the button in HTML
  button.innerHTML = "Add to Cart";
  //add button to div
  newDiv.appendChild(button);
}

const cart = [];

//handle change events on update input
itemList.onchange = function(event) {
  if (event.target && event.target.classList.contains('update')) {
    const name = event.target.dataset.name;
    const qty = parseInt(event.target.value);
    updateCart(name, qty);
  }
}

//handle clicks on item list
itemList.onclick = function(event) {
  if (event.target && event.target.classList.contains('remove')) {
    const name = event.target.dataset.name;
    removeItem(name);
  } else if (event.target && event.target.classList.contains('add-one')) {
    const name = event.target.dataset.name;
    addItem(name);
  } else if (event.target && event.target.classList.contains('remove-one')) {
    const name = event.target.dataset.name;
    removeItem(name, 1);
  }
}

//handle add form submit button
addForm.onsubmit = function(event) {
  event.preventDefault();
  const name = itemName.nodeValue;
  addItem(name);
  showItems();
}

//add item
function addItem(name, price) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].qty += 1;
      showItems();
      //ends loop, does not run next lines of code
      return;
    }
  }
  const item = {name, price, qty: 1};
  cart.push(item);
}

//show items
function showItems() {
  const qty = getQty();
  cartQty.innerHTML = `You have ${qty} items in your cart`;

  let itemStr = '';
  for (let i = 0; i < cart.length; i++) {
    // const name = cart[i].name;
    // const price = cart[i].price;
    // const qty = cart[i].qty;
    const {name, price, qty} = cart[i];
    itemStr += `<li> 
      ${name} $${price} x ${qty} = ${qty * price} 
      <button class='remove' data-name="${name}">Remove</button>
      <button class='add-one' data-name="${name}"> + </button>
      <button class='remove-one' data-name="${name}"> - </button>
      <input class="update" type="number" data-name="${name}">
    </li>`
  }
  itemList.innerHTML = itemStr;

  // console.log(`Total in cart: $${getTotal()}`)
  cartTotal.innerHTML = `Total in cart: $${getTotal()}`;
}

const all_items_button = Array.from(document.querySelectorAll("button"));
// add event listener to add clicked item to the shopping cart
all_items_button.forEach(elt => elt.addEventListener('click', () => {
  addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
  showItems()
}))

//get qty
function getQty() {
  // set initial qty to zero
  let qty = 0;
  for (let i = 0; i < cart.length; i++) { 
    qty += cart[i].qty;
  }
  return qty;
}

//get total
function getTotal() {
  //set initial cart total to zero
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    //add item price * item qty to total price
    total += cart[i].price * cart[i].qty;
  }
  return total.toFixed(2);
}

// remove item
function removeItem(name, qty = 0) {
  for (let i = 0; i < cart.length; i++) {
     if (cart[i].name === name) {
       //if qty greater than zero
       if (qty > 0) {
        cart[i].qty -= qty;
       }
        //if qty is less than one or equal to zero, splice to remove all items
        if (cart[i].qty < 1 || qty === 0) {
          cart.splice(i, 1);
      }
      showItems();
      return;
    }
  }
}

function updateCart(name, qty) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      if (qty < 1) {
        removeItem(name);
      }
      cart[i].qty = qty;
      showItems();
      return;
    }
  }
}