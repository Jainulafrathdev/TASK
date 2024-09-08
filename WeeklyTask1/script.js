document.addEventListener('DOMContentLoaded', function () {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginButton = document.getElementById('loginButton');
  const togglePasswordButton = document.getElementById('togglePassword');
  const loadingIndicator = document.getElementById('loading');
  const errorMessage = document.getElementById('errorMessage');
  const loginForm = document.getElementById('loginForm');
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
  });

  // Handle form submission
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Show loading spinner
    const spinner = document.getElementById('loader');
    spinner.style.display = 'block';

    setTimeout(function () {
      spinner.style.display = 'none'; // Hide loading spinner

      // Simulate login validation (Replace this with actual login logic)
      if (usernameInput.value === 'afrath.zangroups@gmail.com' && passwordInput.value === 'Welcome@2024') {
        if (rememberMeCheckbox.checked) {
          sessionStorage.setItem('rememberMe', 'true');
          sessionStorage.setItem('username', usernameInput.value);
          sessionStorage.setItem('password', passwordInput.value);
          } else {
          localStorage.setItem('username', usernameInput.value);
          localStorage.setItem('password', passwordInput.value);
        }
        window.location.href = 'welcome.html';
      } else {
        errorMessage.textContent = 'Invalid username or password';
      }
    }, 1500); // Simulate loading delay
  });

  // Check if the user is already remembered
  if (localStorage.getItem('rememberMe') === 'true') {
    window.location.href = 'welcome.html';
  }
});
