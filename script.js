// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');

document.addEventListener('mousemove', function(e) {
    cursor.style.cssText = cursor2.style.cssText =
      "left:" + e.clientX + "px; top:" + e.clientY + "px;";
});

// Add hover effect to interactive elements
const interactables = document.querySelectorAll('a, button, .project-card, input, textarea');

interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '0px';
        cursor.style.height = '0px';
        cursor2.style.width = '50px';
        cursor2.style.height = '50px';
        cursor2.style.borderColor = 'var(--accent-glow)';
        cursor2.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.width = '8px';
        cursor.style.height = '8px';
        cursor2.style.width = '40px';
        cursor2.style.height = '40px';
        cursor2.style.borderColor = 'var(--text-color)';
        cursor2.style.backgroundColor = 'transparent';
    });
});

// Sticky Navbar on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } 
        // Optional: Remove class to re-animate when scrolling up
        // else {
        //     entry.target.classList.remove('show');
        // }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Smooth Scrolling for Anchors (Backup for Safari)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

