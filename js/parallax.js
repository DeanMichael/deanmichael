// Initialize ScrollMagic Controller
const controller = new ScrollMagic.Controller();

// Function to create parallax effect for a section
function createParallaxEffect(sectionId) {
    const section = document.querySelector(sectionId);
    const background = section.querySelector('.parallax-bg');
    const content = section.querySelector('.parallax-content');

    // Create timeline for the background
    const timeline = gsap.timeline()
        .to(background, {
            y: '50%',
            ease: 'none'
        });

    // Create the scene
    new ScrollMagic.Scene({
        triggerElement: section,
        triggerHook: 1, // Start at the bottom of the viewport
        duration: '200%', // Scene lasts for 200% of the viewport height
    })
    .setTween(timeline)
    .addTo(controller);

    // Add a fade effect for the content
    const contentTimeline = gsap.timeline()
        .from(content, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out'
        });

    new ScrollMagic.Scene({
        triggerElement: section,
        triggerHook: 0.8,
    })
    .setTween(contentTimeline)
    .addTo(controller);
}

// Apply parallax effect to all sections
document.addEventListener('DOMContentLoaded', () => {
    // Create parallax effect for each section
    ['#home', '#experience', '#interests', '#contact'].forEach(createParallaxEffect);

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Handle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Refresh ScrollMagic scenes
        controller.update(true);
    }, 250);
});

// Disable parallax on mobile devices for better performance
function isMobile() {
    return window.innerWidth <= 768;
}

if (isMobile()) {
    controller.enabled(false);
} 