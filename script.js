// Initialize an empty cart array to hold items and a total to keep track of the total price
let cart = [];
let total = 0;

// Function to add an item to the cart
function addToCart(itemName, itemPrice) {
    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        // If the item is already in the cart, increase its quantity
        existingItem.quantity++;
    } else {
        // If the item is not in the cart, add it with a quantity of 1
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    // Update the cart display
    displayCart();
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
    // Find the item in the cart
    const itemIndex = cart.findIndex(item => item.name === itemName);

    if (itemIndex > -1) {
        // Decrease the item's quantity if more than one, or remove it if it's the last one
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
        } else {
            cart.splice(itemIndex, 1); // Remove item from cart if its quantity is 1
        }

        // Update the cart display
        displayCart();
    }
}

// Function to display the cart contents and the total price
function displayCart() {
    // Sélection des éléments HTML où les articles et le total du panier seront affichés
    const emptyCart = document.getElementById('empty-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartIcons = document.getElementById('cart-icons'); // Get the icons container
    
     // Vérifie si le panier est vide
    if (cart.length === 0) {
        // Si le panier est vide, affiche un message et fixe le total à $0.00
        emptyCart.style.display = 'block'; // Show empty cart illustration
        cartItems.innerHTML = 'Your Cart is empty.';
        cartIcons.style.display = 'none'; // Hide icons when cart is empty
    } else {
        let itemsHTML = '';  // Variable pour accumuler le HTML des articles du panier
        total = 0; // Réinitialise le total avant de recalculer

        // Parcourt chaque article dans le panier
        cart.forEach(item => {
            // Calcule le prix total pour cet article (quantité x prix unitaire)
            const itemTotalPrice = (item.price * item.quantity).toFixed(2);
            
            // Crée le HTML pour chaque article du panier
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
            // Ajoute le prix total de cet article au total global du panier
            total += item.price * item.quantity;
        });

        // Injecte le HTML des articles dans l'élément "cart-items"
        cartItems.innerHTML = itemsHTML;

        // Met à jour l'affichage du total global dans l'élément "cart-total"
        cartTotal.innerHTML = `
            <div class="order-total-detials">
                <span class="order-total-label">Order Total</span> 
                <span class="order-total-price">$${total.toFixed(2)}</span>
            </div>
        `;

        emptyCart.style.display = 'none'; // Hide empty cart illustration
        cartIcons.style.display = 'block'; // Show icons when cart has items
    }
}


