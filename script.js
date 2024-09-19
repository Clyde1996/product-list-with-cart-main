// Initialize an empty cart array to hold items and a total to keep track of the total price
let cart = [];
let total = 0;

// Function to add an item to the cart
function addToCart(itemName, itemPrice) {
    
    // Add item to cart array
    cart.push({ name: itemName, price: itemPrice });

    // Update the cart display
    displayCart();
}

// Function to display the cart contents and the total price
function displayCart() {
    // Get the HTML elements for displaying cart items and the total price
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // If the cart is empty, show a message and set the total to $0.00
    if (cart.length === 0) {
    cartItems.innerHTML = 'Your Cart is empty.';
    cartTotal.innerHTML = 'Total: $0.00';
    } else {
    // If there are items in the cart, display them
    let itemsHTML = ''; // String to hold the HTML for cart items
    total = 0; // Reset the total before recalculating
    // Loop through each item in the cart to display and calculate the total price
    cart.forEach(item => {
        itemsHTML += `<p>${item.name}: $${item.price.toFixed(2)}</p>`; // Display item name and price
        total += item.price; // Add the price of the item to the total
    });
    // Update the inner HTML of the cart items with the constructed items list
    cartItems.innerHTML = itemsHTML;

    // Display total price
    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
    }
}