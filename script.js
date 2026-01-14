// --- Typing Effect ---
const textElement = document.querySelector('.typing-text');
const words = ["Web Developer", "UI/UX Designer", "Freelancer", "Tech Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000); // Wait before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

document.addEventListener('DOMContentLoaded', type);


// --- Scroll Animation (Intersection Observer) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            // Optional: Remove this else block if you want animations to happen only once
           // entry.target.classList.remove('show'); 
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


// --- Mobile Navigation Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
    });
});
// --- Contact Form AJAX Submission ---
const form = document.getElementById('contact-form');
const msgDiv = document.getElementById('form-message');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop default redirect

    const data = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            msgDiv.style.display = 'block'; // show success
            form.reset(); // clear the form
            setTimeout(() => { msgDiv.style.display = 'none'; }, 5000); // hide after 5s
        } else {
            response.json().then(data => {
                alert(data.error || "Oops! Something went wrong.");
            });
        }
    }).catch(error => {
        alert("Oops! Could not send message.");
    });
});
