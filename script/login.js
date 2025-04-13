document.addEventListener('DOMContentLoaded', function() {
    // Password toggle functionality
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    
    if (togglePassword && password) {
        togglePassword.addEventListener('click', function() {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Form submission handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email format validation
            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would typically send the data to your server
            console.log('Login attempt with:', { email, password });
            
            // For demo purposes, show success message
            alert('Login successful! Redirecting...');
            
            // Redirect to home page after successful login
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
    
    // "Join Now" link functionality
    const joinNowLink = document.querySelector('.join-now');
    if (joinNowLink) {
        joinNowLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Redirecting to registration page...');
            // window.location.href = 'register.html';
        });
    }
    
    // "Forgot password" link functionality
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = prompt('Please enter your email to reset password:');
            if (email) {
                if (validateEmail(email)) {
                    alert(`Password reset link sent to ${email}`);
                } else {
                    alert('Please enter a valid email address');
                }
            }
        });
    }
    
    // Email validation helper function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});