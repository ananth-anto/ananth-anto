// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize fade-in animation for hero content
    initializeFadeIn();
    
    // Initialize smooth scrolling for navigation links
    initializeSmoothScrolling();
    
    // Initialize mobile navigation toggle (if needed in future)
    initializeMobileNav();
    
    // Initialize scroll animations
    initializeScrollAnimations();
});

// Fade-in animation for hero section
function initializeFadeIn() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
            heroContent.classList.add('fade-in');
        }, 100);
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile navigation toggle (for future use)
function initializeMobileNav() {
    // Create mobile menu button if needed
    const nav = document.querySelector('.nav-content');
    const navLinks = document.querySelector('.nav-links');
    
    // Check if we need to add mobile menu functionality
    const isMobile = window.innerWidth < 768;
    
    if (isMobile && navLinks) {
        // Hide nav links on mobile by default
        navLinks.style.display = 'none';
        
        // Create hamburger menu button
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.innerHTML = '☰';
        mobileMenuButton.className = 'mobile-menu-btn';
        mobileMenuButton.style.cssText = `
            display: block;
            background: none;
            border: none;
            color: #e2e8f0;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        `;
        
        // Add mobile menu styles
        const mobileMenuStyles = document.createElement('style');
        mobileMenuStyles.textContent = `
            @media (max-width: 767px) {
                .nav-links.mobile-open {
                    display: flex !important;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(15, 23, 42, 0.95);
                    padding: 1rem;
                    border-top: 1px solid #334155;
                }
                
                .mobile-menu-btn {
                    display: block !important;
                }
            }
            
            @media (min-width: 768px) {
                .mobile-menu-btn {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(mobileMenuStyles);
        
        // Insert button before nav links
        nav.insertBefore(mobileMenuButton, navLinks);
        
        // Toggle mobile menu
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-open');
            navLinks.style.display = navLinks.classList.contains('mobile-open') ? 'flex' : 'none';
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = navLinks.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('mobile-open');
                navLinks.style.display = 'none';
            });
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth < 768;
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        
        if (!newIsMobile && navLinks) {
            navLinks.style.display = 'flex';
            navLinks.classList.remove('mobile-open');
        } else if (newIsMobile && navLinks && !mobileBtn) {
            navLinks.style.display = 'none';
        }
    });
}

// Scroll animations for sections
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add scroll animation to sections
    const animatedElements = document.querySelectorAll('.journey-card, .product-card, .skill-category');
    
    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Observe the element
        observer.observe(element);
    });
}

// Utility function to handle external links
function openExternalLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Add active navigation highlighting
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navHeight = document.querySelector('.nav').offsetHeight;
        
        if (window.pageYOffset >= (sectionTop - navHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener for active navigation
window.addEventListener('scroll', updateActiveNavigation);

// Add active navigation styles
const activeNavStyles = document.createElement('style');
activeNavStyles.textContent = `
    .nav-link.active {
        color: #60a5fa !important;
        font-weight: 600;
    }
`;
document.head.appendChild(activeNavStyles);

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button when user scrolls down
function addScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: linear-gradient(to right, #2563eb, #7c3aed);
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    scrollButton.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
        } else {
            scrollButton.style.opacity = '0';
        }
    });
}

// Initialize scroll to top button
addScrollToTopButton();

// Handle form submissions and mailto links
function initializeContactForms() {
    // Handle mailto links with better user experience
    const emailButtons = document.querySelectorAll('button[onclick*="mailto"]');
    
    emailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // The onclick handler will still work, but we can add additional functionality here
            console.log('Email contact initiated');
        });
    });
}

// Initialize contact forms
initializeContactForms();

// Performance optimization: Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// Initialize lazy loading
initializeLazyLoading();

// Error handling for missing images
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with a placeholder or hide the image
            this.style.display = 'none';
            console.warn(`Failed to load image: ${this.src}`);
        });
    });
}

// Initialize image error handling
handleImageErrors();

// Analytics tracking (placeholder for future use)
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log(`Event tracked: ${eventName}`, properties);
}

// Track navigation clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.nav-link')) {
        trackEvent('navigation_click', { 
            section: e.target.getAttribute('href'),
            text: e.target.textContent 
        });
    }
    
    if (e.target.matches('.btn')) {
        trackEvent('button_click', { 
            type: e.target.className,
            text: e.target.textContent 
        });
    }
});

// Console welcome message
console.log(`
🚀 Ananth Anto's Portfolio
Built with vanilla HTML, CSS, and JavaScript
Optimized for GitHub Pages hosting

Portfolio sections loaded:
✓ Hero section with profile
✓ About & stats
✓ Career journey timeline  
✓ Products showcase
✓ Skills & expertise
✓ Blog links
✓ Contact information

Interactive features:
✓ Smooth scrolling navigation
✓ Responsive mobile design
✓ Scroll animations
✓ Active navigation highlighting
✓ Scroll to top button

Contact: anto.rocks@gmail.com
`);