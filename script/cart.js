document.addEventListener('DOMContentLoaded', function() {
    // Quantity buttons functionality
    const minusButtons = document.querySelectorAll('.minus');
    const plusButtons = document.querySelectorAll('.plus');
    const removeButtons = document.querySelectorAll('.remove-btn');
    
    // Update quantity
    function updateQuantity(button, change) {
        const quantityElement = button.parentElement.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        quantity += change;
        
        if (quantity < 1) quantity = 1;
        
        quantityElement.textContent = quantity;
        updateCartSummary();
    }
    
    // Update cart summary
    function updateCartSummary() {
        let subtotal = 0;
        let totalItems = 0;
        
        document.querySelectorAll('.cart-item').forEach(item => {
            const priceText = item.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            
            subtotal += price * quantity;
            totalItems += quantity;
        });
        
        const tax = subtotal * 0.07; // 7% tax
        const total = subtotal + tax;
        
        document.querySelector('.summary-row:nth-child(1) span:last-child').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.summary-row:nth-child(1) span:first-child').textContent = `Subtotal (${totalItems} ${totalItems === 1 ? 'item' : 'items'})`;
        document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = `$${tax.toFixed(2)}`;
        document.querySelector('.summary-row.total span:last-child').textContent = `$${total.toFixed(2)}`;
    }
    
    // Remove item
    function removeItem(button) {
        const item = button.closest('.cart-item');
        item.remove();
        updateCartSummary();
        
        // Show empty cart message if no items left
        if (document.querySelectorAll('.cart-item').length === 0) {
            const cartItems = document.querySelector('.cart-items');
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty. Start shopping to add items.</p>';
        }
    }
    
    // Event listeners
    minusButtons.forEach(button => {
        button.addEventListener('click', () => updateQuantity(button, -1));
    });
    
    plusButtons.forEach(button => {
        button.addEventListener('click', () => updateQuantity(button, 1));
    });
    
    removeButtons.forEach(button => {
        button.addEventListener('click', () => removeItem(button));
    });
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', function() {
        alert('Proceeding to checkout...');
    });
});
fetch("http://localhost:8080/api/cart/add?productId=1&quantity=2", {
    method: "POST",
  })
    .then(res => res.json())
    .then(data => {
      console.log("Cart updated:", data);
    });