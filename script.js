// --- Custom Cursor Logic ---
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    cursor2.style.left = e.clientX + "px";
    cursor2.style.top = e.clientY + "px";
});

// Hover effect on interactive elements
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

// --- Sticky Navbar on Scroll ---
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// --- Scroll Reveal Animation ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
});

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

// --- Smooth Scrolling for Anchors ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// --- Real Date & Time for Visitor ---
function updateVisitorTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const formattedTime = now.toLocaleString('en-US', options);
    const visitorTime = document.getElementById('visitor-time');
    if(visitorTime) visitorTime.textContent = `Current Date & Time: ${formattedTime}`;
}

// Update every second
setInterval(updateVisitorTime, 1000);
updateVisitorTime(); // Initial call
