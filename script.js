document.addEventListener('DOMContentLoaded', () => {
    // Theme handling - add this at the top
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const themeToggle = document.getElementById('theme-toggle');
    
    function setTheme(isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        
        // Update particles
        if (window.pJSDom) {
            window.pJSDom.forEach(dom => {
                const particles = dom.pJS.particles;
                particles.opacity.value = isDark ? 0.3 : 0.5;
                particles.line_linked.opacity = isDark ? 0.2 : 0.4;
                dom.pJS.fn.particlesRefresh();
            });
        }
    }
    
    // Set initial theme
    setTheme(prefersDark.matches);
    
    // Theme toggle button
    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setTheme(currentTheme !== 'dark');
    });
    
    // System theme change detection
    prefersDark.addListener((e) => setTheme(e.matches));

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.getElementById('header');
    const logoSmall = document.querySelector('.logo-small');
    const logoLarge = document.querySelector('.logo-large');
    const headerCompanyName = document.querySelector('.header-company-name');

    // Initialize particles for each section
    particlesJS('hero-particles', heroParticles);
    particlesJS('services-particles', servicesParticles);
    particlesJS('team-particles', teamParticles);

    // Enhanced parallax scrolling
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        // Parallax effect for the hero content
        const heroContent = document.querySelector('.hero-content');
        heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        heroContent.style.opacity = 1 - scrollPosition * 0.003;
    });

    headerCompanyName.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-toggle') && 
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});