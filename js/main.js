// Smooth scrolling with requestAnimationFrame
let ticking = false;
let lastScrollY = 0;

// Parallax scrolling effect with performance optimization
function updateParallax() {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    parallaxSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const speed = 0.5;
        
        // Only apply parallax if section is in viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = -(rect.top * speed);
            section.querySelector('::before')?.style.setProperty('transform', `translateY(${yPos}px)`);
        }
    });
    
    ticking = false;
}

// Throttled scroll handler
window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
            ticking = false;
        });
        
        ticking = true;
    }
});

// Smooth scroll for navigation links with improved performance
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const targetPosition = target.offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                
                // Easing function for smoother acceleration/deceleration
                const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                
                window.scrollTo(0, startPosition + distance * ease(progress));
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// Navbar transparency effect with performance optimization
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

function updateNavbar() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else if (currentScroll > lastScroll) {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    
    lastScroll = currentScroll;
}

// Throttled navbar update
let navbarTicking = false;
window.addEventListener('scroll', () => {
    if (!navbarTicking) {
        window.requestAnimationFrame(() => {
            updateNavbar();
            navbarTicking = false;
        });
        navbarTicking = true;
    }
});

// Add this CSS dynamically for smoother transitions
const style = document.createElement('style');
style.textContent = `
    .parallax-section {
        transform: translateZ(0);
        backface-visibility: hidden;
        will-change: transform;
    }
    
    .navbar {
        transform: translateZ(0);
        will-change: background;
        transition: background-color 0.3s ease;
    }
    
    .fade-in {
        animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
`;
document.head.appendChild(style);

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