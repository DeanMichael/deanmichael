// Parallax scrolling effect
window.addEventListener('scroll', () => {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    parallaxSections.forEach(section => {
        const distance = window.pageYOffset;
        const speed = 0.5;
        section.style.backgroundPositionY = `${distance * speed}px`;
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Navbar transparency effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else if (currentScroll > lastScroll) {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Add animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.interest-item, .timeline-item').forEach(item => {
    item.classList.add('opacity-0');
    observer.observe(item);
});

// Add this CSS to your style.css file
const style = document.createElement('style');
style.textContent = `
    .opacity-0 {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .fade-in {
        animation: fadeIn 0.8s ease forwards;
    }
    
    @keyframes fadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style); 