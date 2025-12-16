// Initialize Lucide Icons
lucide.createIcons();

// Set Current Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mouse Glow Effect
const glowBg = document.getElementById('glow-bg');
window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    glowBg.style.background = `radial-gradient(600px at ${x}px ${y}px, rgba(99, 102, 241, 0.15), transparent 80%)`;
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('glass-nav', 'py-4');
        navbar.classList.remove('bg-transparent', 'py-6');
    } else {
        navbar.classList.add('bg-transparent', 'py-6');
        navbar.classList.remove('glass-nav', 'py-4');
    }
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = menuBtn.querySelector('i');
const mobileLinks = document.querySelectorAll('.mobile-link');

let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        menuIcon.setAttribute('data-lucide', 'x');
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
}

menuBtn.addEventListener('click', toggleMenu);

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});

revealElements.forEach(el => revealObserver.observe(el));

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = submitBtn.querySelector('span');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    const originalText = btnText.textContent;
    btnText.textContent = 'Sending...';
    
    // Simulate API call
    setTimeout(() => {
        alert("Thanks for reaching out! I'll get back to you soon.");
        
        // Reset form and button
        contactForm.reset();
        submitBtn.disabled = false;
        btnText.textContent = originalText;
    }, 1500);
});