// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const form = document.getElementById('registrationForm');
  const successMessage = document.getElementById('successMessage');

  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const phone = document.getElementById('phone');
  const membership = document.getElementById('membership');

  const firstNameError = document.getElementById('firstNameError');
  const lastNameError = document.getElementById('lastNameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const phoneError = document.getElementById('phoneError');

  // Validation regexes
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Gmail only
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$/; // >=12, letter, digit, special
  const phoneRegex = /^\d{10}$/; // exactly 10 digits

  // Utility: show / hide errors and styling
  function showError(inputEl, errorEl, message) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    inputEl.classList.add('invalid');
  }
  function hideError(inputEl, errorEl) {
    errorEl.style.display = 'none';
    inputEl.classList.remove('invalid');
  }
  function hideAllErrors() {
    [firstNameError, lastNameError, emailError, passwordError, phoneError].forEach(e => {
      if (e) e.style.display = 'none';
    });
    [firstName, lastName, email, password, phone].forEach(i => i.classList.remove('invalid'));
  }

  hideAllErrors();
  successMessage.style.display = 'none';

  // PHONE: force only digits and limit to 10 characters while typing/pasting
  phone.addEventListener('input', () => {
    // remove non-digits
    let digits = phone.value.replace(/\D/g, '');
    // limit to 10 digits
    if (digits.length > 10) digits = digits.slice(0, 10);
    // update input value with cleaned digits
    if (phone.value !== digits) phone.value = digits;
    // hide error if it becomes valid
    if (phoneRegex.test(digits)) hideError(phone, phoneError);
  });

  // Real-time hiding of field errors when they become valid
  firstName.addEventListener('input', () => {
    if (firstName.value.trim().length >= 2) hideError(firstName, firstNameError);
  });
  lastName.addEventListener('input', () => {
    if (lastName.value.trim() !== '') hideError(lastName, lastNameError);
  });
  email.addEventListener('input', () => {
    const v = email.value.trim().toLowerCase();
    if (emailRegex.test(v)) hideError(email, emailError);
  });
  password.addEventListener('input', () => {
    if (passwordRegex.test(password.value)) hideError(password, passwordError);
  });

  // Submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAllErrors();

    let valid = true;

    // First name
    if (firstName.value.trim().length < 2) {
      showError(firstName, firstNameError, 'First name must be at least 2 characters.');
      valid = false;
    }

    // Last name
    if (lastName.value.trim() === '') {
      showError(lastName, lastNameError, 'Last name is required.');
      valid = false;
    }

    // Email (gmail only)
    const emailVal = email.value.trim().toLowerCase();
    if (!emailRegex.test(emailVal)) {
      showError(email, emailError, 'Please enter a valid Gmail address (example@gmail.com).');
      valid = false;
    }

    // Password

    // Phone
    if (!phoneRegex.test(phone.value)) {
      showError(phone, phoneError, 'Phone must be exactly 10 digits (numbers only).');
      valid = false;
    }

    if (!valid) {
      console.log('Validation failed (see field errors).');
      return;
    }

    // All good -> show success / (send to server)
    successMessage.style.display = 'block';
    successMessage.textContent = 'Registration successful! Welcome to PowerFit Gym.';
    console.log('Form data (ready to send to server):', {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: emailVal,
      password: password.value,
      phone: phone.value,
      membership: membership.value
    });

    // Reset after short delay
    setTimeout(() => {
      form.reset();
      hideAllErrors();
      successMessage.style.display = 'none';
    }, 3000);
  });
});

// Real-time validation for better UX
document.getElementById('firstName').addEventListener('input', function() {
    if (this.value.trim().length >= 2) {
        document.getElementById('firstNameError').style.display = 'none';
    }
});

document.getElementById('lastName').addEventListener('input', function() {
    if (this.value.trim() !== '') {
        document.getElementById('lastNameError').style.display = 'none';
    }
});

document.getElementById('email').addEventListener('input', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(this.value.trim())) {
        document.getElementById('emailError').style.display = 'none';
    }
});

document.getElementById('password').addEventListener('input', function() {
    if (this.value.length >= 6) {
        document.getElementById('passwordError').style.display = 'none';
    }
});

document.getElementById('phone').addEventListener('input', function() {
    const phoneRegex = /^\d{10}$/;
    if (phoneRegex.test(this.value.trim())) {
        document.getElementById('phoneError').style.display = 'none';
    }
});