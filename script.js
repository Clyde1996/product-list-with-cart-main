// Initialize an empty cart array to hold items and a total to keep track of the total price
let cart = [];
let total = 0;

// Function to add an item to the cart
function addToCart(itemName, itemPrice, buttonElement) {
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    displayCart();

    // Hide "Add to Cart" button and show quantity controls
    buttonElement.style.display = 'none';
    const cartControls = buttonElement.parentElement.querySelector('.cart-controls');
    cartControls.style.display = 'flex';

    // Update the displayed quantity
    const quantityElement = document.getElementById(`quantity-${itemName}`);
    quantityElement.innerText = existingItem ? existingItem.quantity : 1;
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
    const itemIndex = cart.findIndex(item => item.name === itemName);
    if (itemIndex > -1) {
        // Decrease the item's quantity or remove it if it's the last one
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
        } else {
            cart.splice(itemIndex, 1); // Remove item from cart if its quantity is 1
        }
        displayCart();
    }
}

// Function to display the cart contents and the total price
function displayCart() {
    const emptyCart = document.getElementById('empty-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartIcons = document.getElementById('cart-icons');
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block'; // Show empty cart illustration
        cartItems.innerHTML = 'Your Cart is empty.';
        cartTotal.innerHTML = `<span class="order-total-price">$0.00</span>`; // Reset total to $0.00
        cartIcons.style.display = 'none'; // Hide icons when cart is empty
    } else {
        let itemsHTML = '';
        total = 0; // Reset total before recalculating

        cart.forEach(item => {
            const itemTotalPrice = (item.price * item.quantity).toFixed(2);
            itemsHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <strong>${item.name}</strong>
                        <div class="cart-item-details">
                            <span class="cart-item-quantity">${item.quantity}x</span>
                            <span class="cart-item-unit-price">@ $${item.price.toFixed(2)}</span>
                            <span class="cart-item-total-price">$${itemTotalPrice}</span>
                        </div>
                    </div>
                    <button onclick="removeFromCart('${item.name}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                            <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
                        </svg>
                    </button>
                </div>
            `;
            total += item.price * item.quantity; // Calculate total price
        });

        cartItems.innerHTML = itemsHTML;
        cartTotal.innerHTML = `<div class="order-total-details">
                                   <span class="order-total-label">Order Total</span> 
                                   <span class="order-total-price">$${total.toFixed(2)}</span>
                               </div>`;

        emptyCart.style.display = 'none'; // Hide empty cart illustration
        cartIcons.style.display = 'block'; // Show icons when cart has items
    }
}

// Function to update the quantity of items in the cart
function updateQuantity(productName, change) {
    // Update the quantity in the cart array and display the updated cart
    const quantityElement = document.getElementById(`quantity-${productName}`);
    let currentQuantity = parseInt(quantityElement.innerText) || 0;

    currentQuantity += change;
    if (currentQuantity < 0) currentQuantity = 0;

    quantityElement.innerText = currentQuantity;

    if (currentQuantity > 0) {
        const item = cart.find(item => item.name === productName);
        if (item) {
            item.quantity = currentQuantity; // Update existing item quantity
        } else {
            addToCart(productName, 6.50, quantityElement.parentElement.previousElementSibling); // Replace with the correct price
        }
    } else {
        removeFromCart(productName);
        const cartControls = quantityElement.parentElement;
        cartControls.style.display = 'none'; // Hide controls if no items
        const addToCartButton = cartControls.previousElementSibling;
        addToCartButton.style.display = 'block'; // Show "Add to Cart" button again
    }

    displayCart(); // Update the cart display
}
