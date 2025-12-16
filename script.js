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

    el.add
