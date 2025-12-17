document.addEventListener('DOMContentLoaded', () => {
    
    // --- GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Entrance
    gsap.to(".hero-title .line span", {
        y: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2
    });

    // Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
        gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
    });

    // Hover effect for links
    const links = document.querySelectorAll('a, button, .close-about');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(follower, { scale: 2, borderColor: '#fff', duration: 0.3 });
            gsap.to(cursor, { opacity: 0, duration: 0.1 });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(follower, { scale: 1, borderColor: 'rgba(255,255,255,0.5)', duration: 0.3 });
            gsap.to(cursor, { opacity: 1, duration: 0.1 });
        });
    });

    // --- About Overlay Logic ---
    const aboutBtn = document.querySelector('.about-btn');
    const aboutOverlay = document.getElementById('about-overlay');
    const closeAbout = document.querySelector('.close-about');

    aboutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        aboutOverlay.classList.add('active');
        
        // Animate elements inside about
        gsap.fromTo(".about-text > *", 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.3 }
        );
        gsap.fromTo(".profile-placeholder",
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: "power2.out", delay: 0.3 }
        );
    });

    closeAbout.addEventListener('click', () => {
        aboutOverlay.classList.remove('active');
    });

    // --- Real-time Date & Time ---
    function updateTime() {
        const now = new Date();
        
        // Date Format: Feb 02, 2024
        const dateOptions = { month: 'short', day: '2-digit', year: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', dateOptions);
        
        // Time Format: 10:45:02 PM
        const timeString = now.toLocaleTimeString('en-US', { hour12: true });

        document.getElementById('live-date').textContent = dateString;
        document.getElementById('live-time').textContent = timeString;
    }
    
    setInterval(updateTime, 1000);
    updateTime(); // Initial call

    // --- Contact Form Handling ---
    const form = document.getElementById('contactForm');
    const status = document.getElementById('form-status');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        status.innerHTML = "Sending...";
        
        // Simulate sending (or use Fetch API with Web3Forms/Formspree)
        // To make this real, replace the URL with your service endpoint
        
        setTimeout(() => {
            status.innerHTML = "Message Sent! I will get back to you soon.";
            status.style.color = "#4BB543"; // Success Green
            form.reset();
        }, 1500);
    });
});