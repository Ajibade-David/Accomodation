// Cart items array
var cartItems = [];

// Render the cart items
function renderCartItems() {
  var cartItemsElement = document.querySelector('.cart-items');
  var subtotalElement = document.getElementById('subtotal');
  var checkoutButton = document.getElementById('checkoutButton');

  // Clear the cart items element
  cartItemsElement.innerHTML = '';

  // Calculate subtotal
  var subtotal = 0;

  // Loop through the cart items array and generate the HTML
  cartItems.forEach(function(item) {
    var itemTotal = item.price * item.hours;
    subtotal += itemTotal;

    var cartItemHTML = `
      <div class="cart-item">
        <div class="item-details">
          <h3>${item.title}</h3>
          <p>Price: $${item.price} per hour</p>
          <p>Hours: ${item.hours}</p>
        </div>
        <div class="item-total">
          <p>Total: $${itemTotal}</p>
          <button class="remove-item btn btn-danger"><i class="fas fa-trash-alt"></i> Remove</button>
        </div>
      </div>
    `;

    cartItemsElement.innerHTML += cartItemHTML;
  });

  // Update the subtotal and checkout button
  subtotalElement.textContent = `Subtotal: $${subtotal}`;
  checkoutButton.disabled = cartItems.length === 0;

  // Add event listeners to the remove buttons
  var removeButtons = document.getElementsByClassName('remove-item');
  Array.prototype.forEach.call(removeButtons, function(button, index) {
    button.addEventListener('click', function() {
      cartItems.splice(index, 1);
      renderCartItems();
    });
  });
}

// Function to handle adding a room to the cart
function handleAddToCart() {
  var room = {
    title: this.parentNode.querySelector('h2').textContent,
    price: parseInt(this.parentNode.querySelector('p').textContent.replace(/\D/g, '')),
    hours: parseInt(this.parentNode.querySelector('.hours').textContent),
  };

  // Check if the room already exists in the cart
  var existingItem = cartItems.find(function(item) {
    return item.title === room.title;
  });

  if (existingItem) {
    existingItem.hours++;
  } else {
    cartItems.push(room);
  }

  renderCartItems();
}

// Function to handle increasing hours
function handleIncreaseHours() {
  var hoursElement = this.parentNode.querySelector('.hours');
  var hours = parseInt(hoursElement.textContent);
  hours++;
  hoursElement.textContent = hours;
}

// Function to handle decreasing hours
function handleDecreaseHours() {
  var hoursElement = this.parentNode.querySelector('.hours');
  var hours = parseInt(hoursElement.textContent);
  if (hours > 1) {
    hours--;
    hoursElement.textContent = hours;
  }
}

// Initialize the date range picker
$(function() {
  $('input#start-date').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    minYear: 2022,
    maxYear: 2025,
    locale: {
      format: 'YYYY-MM-DD'
    }
  });
});

// Add event listeners to the buttons
var addToCartButtons = document.getElementsByClassName('add-to-cart');
var increaseButtons = document.getElementsByClassName('increase-hours');
var decreaseButtons = document.getElementsByClassName('decrease-hours');

Array.prototype.forEach.call(addToCartButtons, function(button) {
  button.addEventListener('click', handleAddToCart);
});

Array.prototype.forEach.call(increaseButtons, function(button) {
  button.addEventListener('click', handleIncreaseHours);
});

Array.prototype.forEach.call(decreaseButtons, function(button) {
  button.addEventListener('click', handleDecreaseHours);
});
