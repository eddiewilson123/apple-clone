// Cart functionality
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.updateCartDisplay();
        this.initializeEventListeners();
    }

    // Add item to cart
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.showAddedToCartMessage(product.name);
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }

    // Update item quantity
    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    // Calculate total price
    calculateTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }

    // Update cart display
    updateCartDisplay() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartTotalElement = document.querySelector('.cart-total h3');
        
        if (!cartItemsContainer) return;

        // Clear existing items
        cartItemsContainer.innerHTML = '';

        // Add each item to the display
        this.items.forEach(item => {
            const cartItemElement = this.createCartItemElement(item);
            cartItemsContainer.appendChild(cartItemElement);
        });

        // Update total
        const total = this.calculateTotal();
        if (cartTotalElement) {
            cartTotalElement.textContent = `Total: £${total.toFixed(2)}`;
        }

        // Update cart count in header (if you have one)
        this.updateCartCount();
    }

    // Create cart item HTML element
    createCartItemElement(item) {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>Size: ${item.size || 'N/A'}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span class="quantity">Quantity: ${item.quantity}</span>
                    <button class="quantity-btn increase" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <p class="item-price">Price: £${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-btn" onclick="cart.removeItem('${item.id}')">Remove</button>
            </div>
        `;
        return li;
    }

    // Update cart count display
    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
        
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });
    }

    // Show "added to cart" message
    showAddedToCartMessage(productName) {
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <p>✓ ${productName} added to cart!</p>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Clear entire cart
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartDisplay();
    }

    // Initialize event listeners
    initializeEventListeners() {
        // Prevent form submission on checkout
        const checkoutForm = document.querySelector('.checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.showCheckoutMessage();
            });
        }

        // Add event listeners for "Add to Cart" buttons on product pages
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                e.preventDefault();
                const productCard = e.target.closest('.product-card');
                if (productCard) {
                    const product = this.extractProductInfo(productCard);
                    this.addItem(product);
                }
            }
        });
    }

    // Extract product information from product card
    extractProductInfo(productCard) {
        const id = productCard.dataset.productId || Math.random().toString(36).substr(2, 9);
        const name = productCard.querySelector('.product-name')?.textContent || 'Unknown Product';
        const priceText = productCard.querySelector('.product-price')?.textContent || '£0.00';
        const price = parseFloat(priceText.replace(/[£,]/g, ''));
        const image = productCard.querySelector('img')?.src || 'images/placeholder.jpg';
        const size = productCard.querySelector('.size-selector')?.value || 'One Size';

        return { id, name, price, image, size };
    }

    // Show checkout message (since actual ordering is disabled)
    showCheckoutMessage() {
        const notification = document.createElement('div');
        notification.className = 'checkout-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <h3>Order Preview</h3>
                <p>This is a demo checkout. Your order total is £${this.calculateTotal().toFixed(2)}</p>
                <p>In a real store, this would process your payment.</p>
                <button onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        
        document.body.appendChild(notification);
    }
}

// Toggle sidebar menu
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    if (menu.style.width === "250px") {
        menu.style.width = "0";
    } else {
        menu.style.width = "250px";
    }
}

// Initialize cart when page loads
let cart;
document.addEventListener('DOMContentLoaded', () => {
    cart = new ShoppingCart();
    
    // Ensure the menu starts closed on page load
    const menu = document.getElementById("sideMenu");
    if (menu) {
        menu.style.width = "0";
    }
});

// Example function to add products (you can call this from product pages)
function addToCart(productData) {
    if (cart) {
        cart.addItem(productData);
    }
}

// Example products data (you can modify this or fetch from your product pages)
const sampleProducts = [
    {
        id: 'dolce-suit-001',
        name: 'Dolce&Gabbana Silk Twill Suit',
        price: 3000.00,
        image: 'images/dolce&gabbanatwillfront.avif',
        size: 'Large'
    },
    {
        id: 'tomford-sunglasses-001',
        name: 'Tom Ford Mert Round Sunglasses',
        price: 244.00,
        image: 'images/tomfordmertsunglassesfront.avif',
        size: 'One Size'
    }
];