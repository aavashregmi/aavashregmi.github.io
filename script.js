/**
 * AAVASH REGMI - PREMIUM PORTFOLIO SCRIPT
 * Features: Custom Cursor, Typing Effect, Live Clock, Weather/Location, Smooth Animations, Form Handling
 */

// --- 1. Custom Neon Cursor ---
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const interactables = 'a, .btn-primary, .btn-liquid, .project-card, .skill-card, .social-icons a, .hamburger';
document.querySelectorAll(interactables).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

// --- 2. Typing Effect ---
const textElement = document.querySelector('.typing-text');
const words = ["Web Developer", "UI/UX Designer", "Freelancer", "Tech Enthusiast"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

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
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 80 : 150);
    }
}

// --- 3. Live Clock & Date ---
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const timeEl = document.getElementById('live-time');
    const dateEl = document.getElementById('live-date');

    if (timeEl) timeEl.innerText = timeString;
    if (dateEl) dateEl.innerText = now.toLocaleDateString(undefined, dateOptions);
}

// --- 4. Weather & Geolocation (Mobile-Friendly) ---
const weatherIcons = {
    0: '<i class="fas fa-sun"></i>',
    1: '<i class="fas fa-cloud-sun"></i>', 2: '<i class="fas fa-cloud-sun"></i>',
    3: '<i class="fas fa-cloud"></i>',
    45: '<i class="fas fa-smog"></i>', 48: '<i class="fas fa-smog"></i>',
    61: '<i class="fas fa-cloud-rain"></i>', 63: '<i class="fas fa-cloud-showers-heavy"></i>',
    95: '<i class="fas fa-bolt"></i>'
};

function displayWeatherAndLocation(lat, lon) {
    // Reverse Geocoding
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
        .then(res => res.json())
        .then(data => {
            const place = data.locality || data.city || data.countryName || "Unknown Location";
            document.getElementById('location-name').innerText = place;
        })
        .catch(() => { document.getElementById('location-name').innerText = "Location Hidden"; });

    // Weather API
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then(res => res.json())
        .then(data => {
            const temp = Math.round(data.current_weather.temperature);
            const code = data.current_weather.weathercode;
            document.getElementById('temperature').innerText = `${temp}°C`;
            document.getElementById('weather-icon').innerHTML = weatherIcons[code] || '<i class="fas fa-cloud"></i>';

            let desc = "Clear Skies";
            if (code > 0 && code <= 3) desc = "Partly Cloudy";
            if (code > 3) desc = "Overcast";
            if (code >= 61) desc = "Rainy Day";
            if (code >= 95) desc = "Storm Alert";
            document.getElementById('weather-desc').innerText = desc;
        })
        .catch(() => {
            document.getElementById('temperature').innerText = "--";
            document.getElementById('weather-icon').innerHTML = '<i class="fas fa-cloud"></i>';
            document.getElementById('weather-desc').innerText = "Unavailable";
        });
}

function fetchWeatherAndLocation() {
    if (!navigator.geolocation) {
        document.getElementById('location-name').innerText = "Geolocation not supported";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            displayWeatherAndLocation(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
            console.warn(error);
            // Show button if mobile blocks auto prompt
            document.getElementById('location-name').innerHTML = `
                <button id="enable-location-btn" class="btn-primary">Enable Location</button>
            `;
            document.getElementById('enable-location-btn').addEventListener('click', () => {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        displayWeatherAndLocation(pos.coords.latitude, pos.coords.longitude);
                        document.getElementById('enable-location-btn').remove();
                    },
                    () => { document.getElementById('location-name').innerText = "Location access denied"; }
                );
            });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

// --- 5. Navigation & Hamburger Menu ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('nav-active'));
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('nav-active'));
    });
}

// --- 6. Form Handling (Formspree) ---
const form = document.getElementById('contact-form');
const msgDiv = document.getElementById('form-message');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        })
        .then(res => {
            if (res.ok) {
                msgDiv.style.display = 'block';
                form.reset();
                setTimeout(() => { msgDiv.style.display = 'none'; }, 5000);
            } else {
                alert("Error: Could not reach server.");
            }
        })
        .catch(() => alert("Error: Could not reach server."));
    });
}

// --- 7. Scroll Animations ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

// --- 8. Initialize All ---
document.addEventListener('DOMContentLoaded', () => {
    type(); // Typing effect
    updateClock(); // Initial clock
    setInterval(updateClock, 1000); // Clock ticking
    fetchWeatherAndLocation(); // Weather & location
});
