  // Attach an event listener to the Pay Now button
  document.getElementById('payButton').addEventListener('click', function() {
    var email = document.getElementById('email').value;
    var amount = document.getElementById('amount').value * 100; // Convert amount to kobo (minimum currency unit)

    // Initialize Paystack Inline
    var handler = PaystackPop.setup({
      key: 'pk_test_1b4ac526b028b145b6c95fcbebd61ab4f6dcee64', // Replace with your Paystack public key
      email: email,
      amount: amount,
      currency: 'NGN', // Replace with your desired currency code
      ref: 'PAYSTACK_' + Math.floor((Math.random() * 1000000000) + 1), // Generate a unique reference for the transaction
      onClose: function() {
        // Handle the close event (optional)
      },
      callback: function(response) {
        // Handle the payment callback
        console.log(response); // Log the response object to the console

        // Redirect or display a success message to the user
      }
    });

    // Open the Paystack payment form
    handler.openIframe();
  });

