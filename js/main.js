// Smooth scrolling with requestAnimationFrame
let ticking = false;
let lastScrollY = 0;

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

// Smooth scroll for navigation links
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

// Add this CSS dynamically for smoother transitions
const style = document.createElement('style');
style.textContent = `
    .opacity-0 {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .fade-in {
        animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
`;
document.head.appendChild(style);

// Carousel logic for skills and interests
function setupCarousel(carouselContainer) {
    const track = carouselContainer.querySelector('.carousel-track');
    let items = Array.from(track.children);
    const itemCount = items.length;
    const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginLeft) + parseInt(getComputedStyle(items[0]).marginRight);

    // Duplicate items for seamless infinite scroll
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    let scrollOffset = 0;
    let scrollDirection = 0; // -1 for left, 1 for right, 0 for none
    let rafId = null;
    const scrollSpeed = 2.2; // px per frame

    function animateScroll() {
        if (scrollDirection === 0) return;
        scrollOffset += scrollDirection * scrollSpeed;
        // Loop the scroll offset
        if (scrollOffset <= -itemWidth * itemCount) {
            scrollOffset += itemWidth * itemCount;
        } else if (scrollOffset >= 0) {
            scrollOffset -= itemWidth * itemCount;
        }
        track.style.transition = 'none';
        track.style.transform = `translateX(${scrollOffset}px)`;
        rafId = requestAnimationFrame(animateScroll);
    }

    // Hover zones for scrolling
    const leftZone = carouselContainer.querySelector('.carousel-hover-zone.left');
    const rightZone = carouselContainer.querySelector('.carousel-hover-zone.right');
    const indicatorLeftZone = carouselContainer.querySelector('.carousel-hover-zone.indicator-left');
    const indicatorRightZone = carouselContainer.querySelector('.carousel-hover-zone.indicator-right');
    const leftArrow = carouselContainer.querySelector('.carousel-arrow.left-arrow');
    const rightArrow = carouselContainer.querySelector('.carousel-arrow.right-arrow');

    function startScroll(direction) {
        if (scrollDirection !== 0) return;
        scrollDirection = direction;
        rafId = requestAnimationFrame(animateScroll);
    }
    function stopScroll() {
        scrollDirection = 0;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
    }

    leftZone.addEventListener('mouseenter', () => startScroll(-1));
    leftZone.addEventListener('mouseleave', stopScroll);
    rightZone.addEventListener('mouseenter', () => startScroll(1));
    rightZone.addEventListener('mouseleave', stopScroll);
    indicatorLeftZone.addEventListener('mouseenter', () => startScroll(-1));
    indicatorLeftZone.addEventListener('mouseleave', stopScroll);
    indicatorRightZone.addEventListener('mouseenter', () => startScroll(1));
    indicatorRightZone.addEventListener('mouseleave', stopScroll);

    // Arrow button click events (continuous scroll while held)
    let arrowInterval = null;
    leftArrow.addEventListener('mousedown', () => startScroll(-1));
    leftArrow.addEventListener('mouseup', stopScroll);
    leftArrow.addEventListener('mouseleave', stopScroll);
    rightArrow.addEventListener('mousedown', () => startScroll(1));
    rightArrow.addEventListener('mouseup', stopScroll);
    rightArrow.addEventListener('mouseleave', stopScroll);
    // Also trigger scroll on hover for accessibility
    leftArrow.addEventListener('mouseenter', () => startScroll(-1));
    leftArrow.addEventListener('mouseleave', stopScroll);
    rightArrow.addEventListener('mouseenter', () => startScroll(1));
    rightArrow.addEventListener('mouseleave', stopScroll);
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.carousel-row').forEach(setupCarousel);
}); 