/**
 * CSS Loading Fix for Advantis Website
 * This script ensures CSS files are loaded correctly across all devices
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('CSS fix script running...');
        
        // Check if CSS loaded correctly after a short delay
        setTimeout(checkCSSLoaded, 500);
    });
    
    /**
     * Check if external CSS files loaded correctly
     */
    function checkCSSLoaded() {
        let styleSheets = document.styleSheets;
        let mainCSSLoaded = false;
        
        // Try to check if our main stylesheet loaded properly
        for (let i = 0; i < styleSheets.length; i++) {
            try {
                // If we can access rules, the stylesheet is loaded
                if (styleSheets[i].href && 
                    styleSheets[i].href.includes('style.css') &&
                    styleSheets[i].cssRules.length > 0) {
                    mainCSSLoaded = true;
                    break;
                }
            } catch (e) {
                // CORS error or CSS failed to load
                console.warn('Error accessing stylesheet:', e);
            }
        }
        
        // Apply fallback styles if main CSS failed to load
        if (!mainCSSLoaded) {
            console.warn('Main CSS not loaded correctly, applying fallback styles');
            document.body.classList.add('css-fallback');
            applyFallbackStyles();
            
            // Try to reload the stylesheet with a fresh cache-busting parameter
            reloadStylesheet();
        } else {
            console.log('CSS loaded successfully');
        }
    }
    
    /**
     * Apply inline fallback styles if CSS failed to load
     */
    function applyFallbackStyles() {
        const style = document.createElement('style');
        style.textContent = `
            body.css-fallback {
                font-family: Arial, sans-serif !important;
                line-height: 1.6 !important;
                color: #333 !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            
            body.css-fallback .header {
                background: white !important;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
                position: relative !important;
                height: auto !important;
                padding: 15px 0 !important;
            }
            
            body.css-fallback .header-container {
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                width: 90% !important;
                max-width: 1200px !important;
                margin: 0 auto !important;
                padding: 0 15px !important;
            }
            
            body.css-fallback .logo img {
                max-height: 50px !important;
                width: auto !important;
            }
            
            body.css-fallback .nav-list {
                display: flex !important;
                list-style: none !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            
            body.css-fallback .hero {
                background: #f8f9fa !important;
                padding: 50px 0 !important;
                text-align: center !important;
            }
            
            body.css-fallback .container {
                width: 90% !important;
                max-width: 1200px !important;
                margin: 0 auto !important;
                padding: 0 15px !important;
            }
            
            body.css-fallback .btn {
                display: inline-block !important;
                background: #0066CC !important;
                color: white !important;
                padding: 10px 20px !important;
                border-radius: 4px !important;
                text-decoration: none !important;
                margin: 10px !important;
            }
            
            body.css-fallback h1, 
            body.css-fallback h2, 
            body.css-fallback h3 {
                color: #2C3E50 !important;
                margin-bottom: 20px !important;
            }
            
            body.css-fallback .section {
                padding: 40px 0 !important;
            }
            
            body.css-fallback .footer {
                background: #f8f9fa !important;
                padding: 40px 0 !important;
                margin-top: 40px !important;
            }
            
            /* Critical notice for users */
            body.css-fallback::before {
                content: "Using simplified styling due to loading issues. Please refresh the page." !important;
                display: block !important;
                text-align: center !important;
                padding: 10px !important;
                background: #ffe066 !important;
                color: #333 !important;
                font-weight: bold !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    /**
     * Reload the main stylesheet with a cache-busting parameter
     */
    function reloadStylesheet() {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        const timestamp = new Date().getTime();
        
        links.forEach(link => {
            if (link.href && link.href.includes('style.css')) {
                const originalHref = link.href.split('?')[0];
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = originalHref + '?v=' + timestamp;
                
                // Insert the new link after the original one
                link.parentNode.insertBefore(newLink, link.nextSibling);
                
                // Remove the old link after a short delay
                setTimeout(() => {
                    link.parentNode.removeChild(link);
                }, 100);
            }
        });
    }
})(); 