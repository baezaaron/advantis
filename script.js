/**
 * Advantis Website - Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    initMobileMenu();
    
    // Dropdown menus
    initDropdowns();
    
    // Smooth scrolling for anchor links
    initSmoothScroll();
    
    // Add active class to current page in navigation
    highlightCurrentPage();
});

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.classList.toggle('active');
            
            // Add the active class to the mobile toggle button
            if (this.classList.contains('active')) {
                this.setAttribute('aria-expanded', 'true');
                // Add class to animate the burger icon to an X
                this.querySelectorAll('span').forEach((span, index) => {
                    span.classList.add('active');
                });
            } else {
                this.setAttribute('aria-expanded', 'false');
                // Remove the animation class
                this.querySelectorAll('span').forEach((span, index) => {
                    span.classList.remove('active');
                });
            }
        });
    }
}

/**
 * Initialize dropdown functionality, especially for mobile devices
 */
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        // For mobile: toggle dropdown on click
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Set appropriate ARIA attributes
                    const expanded = dropdown.classList.contains('active');
                    this.setAttribute('aria-expanded', expanded.toString());
                }
            });
        }
    });
}

/**
 * Add smooth scrolling to anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Add active class to current page link in navigation
 */
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Get the href attribute
        const href = link.getAttribute('href');
        
        // Check if this link corresponds to the current page
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === '/' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
} 