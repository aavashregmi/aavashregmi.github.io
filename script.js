/**
 * AAVASH REGMI - LUXURY BLACK & GOLDEN PORTFOLIO
 * Enhanced JavaScript with Premium Animations
 */

// --- 1. Custom Cursor with Trail Effect ---
const cursor = document.getElementById('custom-cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const interactables = 'a, button, .project-card, .skill-card, .social-link, input, textarea, .hamburger';
document.querySelectorAll(interactables).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

// --- 2. Typing Effect with Multiple Words ---
const textElement = document.querySelector('.typing-text');
const words = ["a Developer", "a Designer", "a Creator", "a Visionary"];
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

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// --- 3. Live Clock & Date ---
function updateClock() {
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('en-US', dateOptions);

    const timeEl = document.getElementById('live-time');
    const dateEl = document.getElementById('live-date');

    if (timeEl) timeEl.textContent = timeString;
    if (dateEl) timeEl.textContent = dateString;
}

// --- 4. Weather & Geolocation ---
const weatherIcons = {
    0: '<i class="fas fa-sun"></i>',
    1: '<i class="fas fa-cloud-sun"></i>',
    2: '<i class="fas fa-cloud-sun"></i>',
    3: '<i class="fas fa-cloud"></i>',
    45: '<i class="fas fa-smog"></i>',
    48: '<i class="fas fa-smog"></i>',
    51: '<i class="fas fa-cloud-rain"></i>',
    61: '<i class="fas fa-cloud-rain"></i>',
    63: '<i class="fas fa-cloud-showers-heavy"></i>',
    65: '<i class="fas fa-cloud-showers-heavy"></i>',
    71: '<i class="fas fa-snowflake"></i>',
    95: '<i class="fas fa-bolt"></i>',
    96: '<i class="fas fa-bolt"></i>',
    99: '<i class="fas fa-bolt"></i>'
};

const weatherDescriptions = {
    0: 'Clear Skies',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Foggy',
    51: 'Light Drizzle',
    61: 'Light Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    71: 'Light Snow',
    95: 'Thunderstorm',
    96: 'Thunderstorm',
    99: 'Heavy Thunderstorm'
};

function displayWeatherAndLocation(lat, lon) {
    // Reverse Geocoding for location
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
        .then(res => res.json())
        .then(data => {
            const place = data.locality || data.city || data.principalSubdivision || data.countryName || "Unknown";
            document.getElementById('location-name').textContent = place;
        })
        .catch(() => {
            document.getElementById('location-name').textContent = "Location Hidden";
        });

    // Weather API
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then(res => res.json())
        .then(data => {
            const temp = Math.round(data.current_weather.temperature);
            const code = data.current_weather.weathercode;
            
            document.getElementById('temperature').textContent = `${temp}°C`;
            document.getElementById('weather-icon').innerHTML = weatherIcons[code] || '<i class="fas fa-cloud"></i>';
            document.getElementById('weather-desc').textContent = weatherDescriptions[code] || 'Unknown';
        })
        .catch(() => {
            document.getElementById('temperature').textContent = '--°C';
            document.getElementById('weather-icon').innerHTML = '<i class="fas fa-cloud-question"></i>';
            document.getElementById('weather-desc').textContent = 'Unavailable';
        });
}

function fetchWeatherAndLocation() {
    if (!navigator.geolocation) {
        document.getElementById('location-name').textContent = "Not Supported";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            displayWeatherAndLocation(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
            console.warn('Geolocation error:', error);
            document.getElementById('location-name').innerHTML = `
                <button id="enable-location-btn" style="background: var(--gold-primary); color: var(--bg-primary); border: none; padding: 5px 15px; border-radius: 5px; cursor: pointer; font-weight: 600;">
                    Enable Location
                </button>
            `;
            
            const enableBtn = document.getElementById('enable-location-btn');
            if (enableBtn) {
                enableBtn.addEventListener('click', () => {
                    navigator.geolocation.getCurrentPosition(
                        (pos) => {
                            displayWeatherAndLocation(pos.coords.latitude, pos.coords.longitude);
                            enableBtn.remove();
                        },
                        () => {
                            document.getElementById('location-name').textContent = "Access Denied";
                        }
                    );
                });
            }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

// --- 5. Navigation Scroll Effect ---
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link on scroll
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- 6. Hamburger Menu ---
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('nav-active');
        hamburger.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('nav-active');
            hamburger.classList.remove('active');
        });
    });
}

// --- 7. Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// --- 8. Form Handling ---
const form = document.getElementById('contact-form');
const msgDiv = document.getElementById('form-message');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                msgDiv.style.display = 'block';
                form.reset();
                setTimeout(() => {
                    msgDiv.style.display = 'none';
                }, 5000);
            } else {
                alert('Oops! There was a problem sending your message.');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            alert('Error: Could not reach the server.');
        });
    });
}

// --- 9. Scroll Reveal Animations ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            
            // Animate stats when in view
            if (entry.target.classList.contains('about-text')) {
                animateStats();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

// --- 10. Animate Statistics Counter ---
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };

        updateCounter();
    });
}

// --- 11. Parallax Effect for Hero ---
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    const heroOrnament = document.querySelector('.hero-ornament');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
    
    if (heroOrnament && scrolled < window.innerHeight) {
        heroOrnament.style.transform = `rotate(${scrolled * 0.1}deg)`;
    }
});

// --- 12. Project Card Tilt Effect ---
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 5,
    speed: 400,
    glare: true,
    "max-glare": 0.3,
});

// --- 13. Golden Particles Animation ---
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: var(--gold-primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        opacity: ${Math.random() * 0.5 + 0.3};
        animation: particle-float ${Math.random() * 10 + 10}s linear infinite;
    `;
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 20000);
}

// Create particles periodically
setInterval(createParticle, 2000);

// --- 14. Add CSS Animation for Particles ---
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-float {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// --- 15. Page Load Animation ---
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// --- 16. Initialize Everything ---
document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect
    type();
    
    // Initialize clock
    updateClock();
    setInterval(updateClock, 1000);
    
    // Fetch weather
    fetchWeatherAndLocation();
    
    // Add initial particles
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 100);
    }
    
    console.log('%c🌟 Welcome to Aavash Regmi\'s Portfolio 🌟', 'color: #d4af37; font-size: 20px; font-weight: bold;');
    console.log('%cCrafted with passion and precision', 'color: #d4af37; font-size: 14px;');
});

// --- 17. Prevent Right Click (Optional - Remove if not needed) ---
// document.addEventListener('contextmenu', (e) => e.preventDefault());

// --- 18. Add Golden Glow to Mouse Position ---
document.addEventListener('mousemove', (e) => {
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        left: ${e.clientX - 150}px;
        top: ${e.clientY - 150}px;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(glow);
    
    setTimeout(() => {
        glow.style.opacity = '0';
        setTimeout(() => glow.remove(), 300);
    }, 100);
});

// --- 19. Keyboard Navigation ---
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'A' to go to about
    if (e.key === 'a' || e.key === 'A') {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'P' to go to projects
    if (e.key === 'p' || e.key === 'P') {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
});

// --- 20. Easter Egg - Konami Code ---
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);