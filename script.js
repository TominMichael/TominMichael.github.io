// Custom Cursor Logic
const cursorDot = document.getElementById('cursorDot');
const cursorGlow = document.getElementById('cursorGlow');

// Only run cursor on non-touch devices
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows strictly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Glow follows with slight delay visually (smooth effect handled by transform if we use requestAnimationFrame, but sticking to basics works here too)
        cursorGlow.style.left = `${posX}px`;
        cursorGlow.style.top = `${posY}px`;
    });

    // Add hover effects on clickable elements
    const clickables = document.querySelectorAll('a, button, .project-card, input, textarea');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorGlow.style.opacity = '0.8';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0)';
        });
        el.addEventListener('mouseleave', () => {
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorGlow.style.opacity = '0.6';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Sticky Navbar Logic
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Optional: stop observing once faded in
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// Add glitch effect to hero title periodically (optional micro-interaction)
const glitchText = document.querySelector('.glitch-text');
setInterval(() => {
    glitchText.style.transform = `skew(${Math.random() * 2 - 1}deg)`;
    setTimeout(() => {
        glitchText.style.transform = 'none';
    }, 50);
}, 3000);
