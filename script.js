<<<<<<< HEAD
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
=======
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Clock Functionality ---
    function updateTime() {
        const clockElement = document.getElementById('live-clock');
        const now = new Date();
        const options = { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        };
        clockElement.textContent = now.toLocaleDateString('en-US', options);
    }
    setInterval(updateTime, 1000);
    updateTime(); // Initial call

    // --- 2. Mobile Menu Toggle ---
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    burger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // --- 3. About Overlay Logic (The "New Page/Flag" Effect) ---
    const aboutBtn = document.getElementById('about-btn');
    const mobileAboutBtn = document.getElementById('mobile-about-btn');
    const overlay = document.getElementById('about-overlay');
    const closeBtn = document.querySelector('.close-btn');

    function openOverlay(e) {
        e.preventDefault();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
        calculateAge(); // Recalculate age just in case
    }

    function closeOverlay() {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    aboutBtn.addEventListener('click', openOverlay);
    mobileAboutBtn.addEventListener('click', openOverlay);
    closeBtn.addEventListener('click', closeOverlay);

    // --- 4. Age Calculation ---
    function calculateAge() {
        const dob = new Date('2009-02-02');
        const diff_ms = Date.now() - dob.getTime();
        const age_dt = new Date(diff_ms); 
        const age = Math.abs(age_dt.getUTCFullYear() - 1970);
        
        // Animate the number
        const ageDisplay = document.getElementById('age-display');
        ageDisplay.textContent = age;
    }

    // --- 5. Scroll Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 6. Contact Form Handling ---
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate sending (Frontend only)
        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        btn.style.opacity = '0.7';

        setTimeout(() => {
            btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
            btn.style.background = '#28a745'; // Green for success
            form.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = ''; // Revert to CSS
                btn.style.opacity = '1';
                alert("Thank you, Aavash will receive your message shortly.");
            }, 3000);
        }, 1500);
>>>>>>> 8568171d8e74e1218942c519cc06c5bd0659751f
    });
});