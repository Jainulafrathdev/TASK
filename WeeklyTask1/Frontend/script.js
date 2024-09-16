document.addEventListener('DOMContentLoaded', () => {
    // Attach an event listener to the login form
    const loginForm = document.querySelector('form');
    //const togglePasswordButton=document.querySelector('[id="togglePassword"]');
    const togglePasswordButton = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const usernameInput = document.getElementById('username');
    const rememberMeCheckbox = document.getElementById('rememberMe');



    // Enable login button if both fields are filled
    function validateForm() {
        if (usernameInput.value.trim() !== '' && passwordInput.value.trim() !== '') {
            loginButton.disabled = false;
        } else {
            loginButton.disabled = true;
        }
    }
    usernameInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);

    // Toggle password visibility
    togglePasswordButton.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePasswordButton.textContent = type === 'password' ? 'Show' : 'Hide';
    })



    if (loginForm) {

        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');
        const isRemembered = localStorage.getItem('rememberMe') === 'true';
       
            if (savedUsername && savedPassword && isRemembered) {
            if (getWithExpiry('rememberMeExpireDate')) {
                usernameInput.value = savedUsername;
                passwordInput.value = savedPassword
                rememberMeCheckbox.checked = isRemembered;
            }

            validateForm();
        }
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // Prevent the default form submissio


            // Extract the username and password from the form
            const username = document.querySelector('[name="username"]').value;
            const password = document.querySelector('[name="password"]').value;

            // Send the login request using Fetch API
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                // Parse the JSON response
                const result = await response.json();



                if (result.success) {

                    if (rememberMeCheckbox.checked) {
                        localStorage.setItem('username', usernameInput.value);
                        localStorage.setItem('password', passwordInput.value);
                        localStorage.setItem('rememberMe', 'true');
                        // localStorage.setItem('rememberMeStoredDate', new Date() + (15 * 24 * 60 * 60 * 1000));
                        setWithExpiry('rememberMeExpireDate', (15 * 24 * 60 * 60 * 1000));


                    } else {
                        sessionStorage.setItem('rememberMe', 'true');
                        sessionStorage.setItem('username', usernameInput.value);
                        sessionStorage.setItem('password', passwordInput.value);

                    }


                    // On success, redirect to the home page with the username as a query parameter
                    window.location.href = `/Welcome.html?username=${encodeURIComponent(result.username)}`;
                } else {
                    // Show an error message if login fails
                    alert(result.message);
                }
            } catch (err) {
                // Handle network or other errors
                console.error('Error during login:', err);
                alert('An error occurred during login. Please try again.');
            }
        });
    }
    function setWithExpiry(key, ttl) {
        const now = new Date();

        // `item` is an object which will store the value and expiry time
        const item = {
            expiry: now.getTime() + ttl
        };

        localStorage.setItem(key, JSON.stringify(item));
    }
    function getWithExpiry(key) {
        const itemStr = localStorage.getItem(key);

        // If the item doesn't exist, return null
        if (!itemStr) {
            return null;
        }

        const item = JSON.parse(itemStr);
        const now = new Date();

        // Check if the item has expired
        if (now.getTime() > item.expiry) {
            // If expired, remove the item from storage and return null
            // localStorage.removeItem(key);
            return false;
        }

        // If not expired, return the stored value
        return true;
    }
});
