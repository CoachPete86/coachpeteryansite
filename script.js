// --- Updated script.js ---

document.addEventListener('DOMContentLoaded', function() {
    // Create and insert mobile menu button if it doesn't exist
    const header = document.querySelector('header .container');
    if (!document.querySelector('.mobile-menu-btn') && window.innerWidth <= 768) {
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.className = 'mobile-menu-btn';
        
        // Create the three bars
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            mobileMenuBtn.appendChild(span);
        }
        
        header.appendChild(mobileMenuBtn);
    }
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // If mobile menu is open, close it after clicking a link
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileMenuBtn) {
                        const spans = mobileMenuBtn.querySelectorAll('span');
                        spans.forEach(span => span.classList.remove('active'));
                    }
                }
            }
        });
    });
    
    // Add active class to nav links based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Run once on page load
    setActiveNavLink();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
            const header = document.querySelector('header .container');
            const mobileMenuBtn = document.createElement('div');
            mobileMenuBtn.className = 'mobile-menu-btn';
            
            for (let i = 0; i < 3; i++) {
                const span = document.createElement('span');
                mobileMenuBtn.appendChild(span);
            }
            
            header.appendChild(mobileMenuBtn);
            
            // Add event listener to the newly created button
            mobileMenuBtn.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach(span => span.classList.toggle('active'));
            });
        } else if (window.innerWidth > 768) {
            // Remove mobile menu button on larger screens
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileMenuBtn) {
                mobileMenuBtn.remove();
            }
            
            // Make sure navigation is visible on larger screens
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    });
});
