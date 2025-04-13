document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality would go here
    // Currently the menu is always visible in this basic version
    
    // Product hover effects
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.cta form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value) {
                alert('Thanks for subscribing! Check your email for confirmation.');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});// For all pages
document.addEventListener('DOMContentLoaded', function() {
    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // Here you would add filtering logic
        });
    });
});

// For sale page countdown
if (document.querySelector('.countdown-timer')) {
    // Set the date we're counting down to (24 hours from now)
    const countDownDate = new Date();
    countDownDate.setHours(countDownDate.getHours() + 48);
    
    // Update the count down every 1 second
    const x = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the count down date
        const distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.querySelector('.countdown-unit .number:nth-child(1)').textContent = days.toString().padStart(2, '0');
        document.querySelector('.countdown-unit .number:nth-child(2)').textContent = hours.toString().padStart(2, '0');
        document.querySelector('.countdown-unit .number:nth-child(3)').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('.countdown-unit .number:nth-child(4)').textContent = seconds.toString().padStart(2, '0');
        
        // If the count down is finished, clear interval
        if (distance < 0) {
            clearInterval(x);
            document.querySelector('.countdown-timer').innerHTML = "SALE HAS ENDED";
        }
    }, 1000);
}document.getElementById('loginRedirectBtn').addEventListener('click', function() {
    window.location.href = 'login.html';
});
// Fetch products from backend API
async function fetchProducts() {
    const response = await fetch("http://localhost:8080/api/products");
    const products = await response.json();

    // Display products on the frontend
    const productsContainer = document.getElementById("products-grid");
    productsContainer.innerHTML = ''; // Clear existing products

    products.forEach(product => {
        const productCard = `
            <div class="product-card">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productsContainer.innerHTML += productCard;
    });
}

// Call the function when the page loads
window.onload = fetchProducts;
let cart = [];

function addToCart(productId) {
    // Find product by ID (you may want to fetch product details or use a more advanced cart system)
    fetch("http://localhost:8080/api/products")
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            if (product) {
                cart.push(product);
                console.log("Product added to cart:", product);
                alert("Product added to cart!");
            }
        });
}