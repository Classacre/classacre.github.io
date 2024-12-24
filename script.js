document.addEventListener('DOMContentLoaded', () => {
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
});