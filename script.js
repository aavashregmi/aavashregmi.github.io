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
        setTimeout(type, 2000); 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

// --- Scroll Animation (Intersection Observer) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
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
});

document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
    });
});

// --- Contact Form AJAX Submission ---
const form = document.getElementById('contact-form');
const msgDiv = document.getElementById('form-message');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(form);
        fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                msgDiv.style.display = 'block';
                form.reset();
                setTimeout(() => { msgDiv.style.display = 'none'; }, 5000);
            } else {
                alert("Oops! Something went wrong.");
            }
        }).catch(() => alert("Oops! Could not send message."));
    });
}

// --- NEW: Live Time, Location & Weather Logic ---

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    const timeEl = document.getElementById('live-time');
    if(timeEl) timeEl.innerText = timeString;
    
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateEl = document.getElementById('live-date');
    if(dateEl) dateEl.innerText = now.toLocaleDateString(undefined, dateOptions);
}

// Weather Icon Mapping
const weatherIcons = {
    0: '<i class="fas fa-sun"></i>', 
    1: '<i class="fas fa-cloud-sun"></i>', 2: '<i class="fas fa-cloud-sun"></i>',
    3: '<i class="fas fa-cloud"></i>',
    45: '<i class="fas fa-smog"></i>', 48: '<i class="fas fa-smog"></i>',
    61: '<i class="fas fa-cloud-rain"></i>', 63: '<i class="fas fa-cloud-showers-heavy"></i>',
    95: '<i class="fas fa-bolt"></i>'
};

function fetchWeatherAndLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;

            // 1. Detect Location Name (e.g., Gorkha, Kathmandu, India)
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
                .then(res => res.json())
                .then(data => {
                    const place = data.locality || data.city || data.countryName;
                    document.getElementById('location-name').innerText = place;
                });

            // 2. Fetch Real-time Weather
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
                .then(res => res.json())
                .then(data => {
                    const temp = Math.round(data.current_weather.temperature);
                    const code = data.current_weather.weathercode;
                    document.getElementById('temperature').innerText = `${temp}°C`;
                    document.getElementById('weather-icon').innerHTML = weatherIcons[code] || '<i class="fas fa-cloud"></i>';
                    
                    let desc = "Clear Skies";
                    if(code > 0) desc = "Mainly Clear";
                    if(code > 2) desc = "Cloudy";
                    if(code > 60) desc = "Rainy";
                    if(code > 90) desc = "Stormy";
                    document.getElementById('weather-desc').innerText = desc;
                });
        }, () => {
            document.getElementById('location-name').innerText = "Location Denied";
        });
    }
}

// Initialize all features on load
document.addEventListener('DOMContentLoaded', () => {
    type();
    setInterval(updateClock, 1000);
    updateClock();
    fetchWeatherAndLocation();
});