$(document).ready(function() {
    var products = [
        { id: 1, name: 'Product 1', price: 10.99, image: 'https://www.amenitiz.com/wp-content/uploads/2022/10/dervr7mcawpygipdzqvv.jpg' },
        { id: 2, name: 'Product 2', price: 17.99, image:'https://assets.architecturaldigest.in/photos/621f43c6fa7af6911e95b64a/16:9/w_1615,h_908,c_limit/7%20budget-friendly%20kids%E2%80%99%20room%20design%20ideas.jpg'  },
        { id: 3, name: 'Product 3', price: 30.99, image: 'https://hips.hearstapps.com/hmg-prod/images/edc100122brockschmidt-web-001-1664480031.jpg' }
      ];
      
  
    var cartItems = [];
  
    // Render product list
    products.forEach(function(product) {
      var productElement = `
        <div class="col-md-10">
          <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">Price: $${product.price.toFixed(2)}</p>
              <div class="input-group mb-3">
                <input type="number" class="form-control quantity-input" value="1" min="1">
                <div class="input-group-append">
                  <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      $('#product-list').append(productElement);
    });
  
    // Handle add to cart button click
    $(document).on('click', '.add-to-cart', function() {
      var productId = parseInt($(this).data('product-id'));
      var product = products.find(function(p) {
        return p.id === productId;
      });
  
      var quantity = parseInt($(this).parent().siblings('.quantity-input').val());
  
      var existingItem = cartItems.find(function(item) {
        return item.id === productId;
      });
  
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartItems.push({ id: productId, name: product.name, price: product.price, quantity: quantity, image: product.image });
      }
  
      renderCartItems();
    });
  
    // Render cart items
    function renderCartItems() {
      var cartItemsElement = $('#cart-items');
      var subtotalElement = $('#subtotal');
      var vatElement = $('#vat');
      var totalElement = $('#total');
      var subtotal = 0;
  
      cartItemsElement.empty();
  
      cartItems.forEach(function(item) {
        var subtotalPrice = item.price * item.quantity;
        subtotal += subtotalPrice;
  
        var cartItemElement = `
          <li class="list-group-item">
            <div class="row">
              <div class="col-md-2">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
              </div>
              <div class="col-md-6">
                <p class="font-weight-bold">${item.name}</p>
                <p class="text-muted">Price: $${item.price.toFixed(2)}</p>
                <div class="input-group mb-3">
                  <input type="number" class="form-control quantity-input" value="${item.quantity}" min="1">
                  <div class="input-group-append">
                    <button class="btn btn-primary update-quantity" data-product-id="${item.id}">Update</button>
                    <button class="btn btn-danger remove-item" data-product-id="${item.id}">Remove</button>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <p class="font-weight-bold">Subtotal: $${subtotalPrice.toFixed(2)}</p>
              </div>
            </div>
          </li>
        `;
        cartItemsElement.append(cartItemElement);
      });
  
      var vat = subtotal * 0.15;
      var total = subtotal + vat;
  
      subtotalElement.text('$' + subtotal.toFixed(2));
      vatElement.text('$' + vat.toFixed(2));
      totalElement.text('$' + total.toFixed(2));
    }
  
    // Handle quantity update
    $(document).on('click', '.update-quantity', function() {
      var productId = parseInt($(this).data('product-id'));
      var quantity = parseInt($(this).parent().siblings('.quantity-input').val());
  
      var itemIndex = cartItems.findIndex(function(item) {
        return item.id === productId;
      });
  
      if (itemIndex > -1) {
        cartItems[itemIndex].quantity = quantity;
      }
  
      renderCartItems();
    });
  
    // Handle remove item
    $(document).on('click', '.remove-item', function() {
      var productId = parseInt($(this).data('product-id'));
  
      cartItems = cartItems.filter(function(item) {
        return item.id !== productId;
      });
  
      renderCartItems();
    });
  
    // Handle checkout button click
    $('#checkout-button').on('click', function() {
      $('#checkoutModal').modal('show');
    });
  
    // Handle checkout form submission
    $('#checkoutForm').on('submit', function(event) {
      event.preventDefault();
  
      // Perform the checkout and payment process here
      var name = $('#name').val();
      var email = $('#email').val();
      var address = $('#address').val();
  
      // You can send the cartItems, name, email, and address to the server for processing
  
      // Display success message
      alert('Checkout and payment completed!');
      cartItems = [];
      renderCartItems();
  
      // Close the modal
      $('#checkoutModal').modal('hide');
    });
  });
  func
  