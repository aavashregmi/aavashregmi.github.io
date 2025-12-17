document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Animation Setup (GSAP) ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Entrance
    const tl = gsap.timeline();
    tl.from(".reveal-text", {
        y: 100,
        opacity: 0,
        skewY: 10,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
    })
    .from(".hero-sub", { opacity: 0, y: 20, duration: 1 }, "-=0.8")
    .from("nav", { y: -50, opacity: 0, duration: 1 }, "-=1");

    // Marquee Rotation Effect on Scroll
    gsap.to(".marquee-section", {
        scrollTrigger: {
            trigger: ".marquee-section",
            start: "top bottom",
            scrub: 1
        },
        rotate: 2,
        scale: 1,
        ease: "none"
    });

    // --- 2. Custom Cursor Magnetic Effect ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    const magnets = document.querySelectorAll('.magnet');

    // Move cursor
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
        gsap.to(cursorCircle, { x: e.clientX, y: e.clientY, duration: 0.3 });
    });

    // Magnetic Hover Effect
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
            gsap.to(cursorCircle, { scale: 1.5, borderColor: '#d4af37', duration: 0.3 });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.3 });
            gsap.to(cursorCircle, { scale: 1, borderColor: 'rgba(255,255,255,0.3)', duration: 0.3 });
        });
    });

    // --- 3. About Section Overlay Logic ---
    const openAbout = document.getElementById('open-about');
    const closeAbout = document.getElementById('close-about');
    const modal = document.getElementById('about-modal');

    openAbout.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Animate elements inside
        gsap.fromTo(".modal-right > *", 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3 }
        );
    });

    closeAbout.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close if clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // --- 4. Live Date & Time (Footer) ---
    function updateFooterData() {
        const now = new Date();
        
        // Time with Seconds
        const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
        // Date
        const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });

        document.getElementById('clock').innerText = timeStr;
        document.getElementById('date').innerText = dateStr;
    }
    setInterval(updateFooterData, 1000);
    updateFooterData();

    // --- 5. Contact Form Simulation ---
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = "Sending...";
        btn.style.opacity = "0.7";

        // Simulate network request
        setTimeout(() => {
            btn.innerHTML = "Message Sent";
            btn.style.background = "#d4af37";
            btn.style.borderColor = "#d4af37";
            btn.style.color = "#000";
            
            feedback.innerText = "Thanks Aavash will get back to you shortly.";
            feedback.style.color = "#d4af37";
            
            form.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = "transparent";
                btn.style.color = "#fff";
                btn.style.borderColor = "rgba(255,255,255,0.2)";
                feedback.innerText = "";
            }, 3000);
        }, 1500);
    });
});