document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const cyberText = document.querySelector('.cyber-text');
    const hero = document.querySelector('.hero');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effects
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 100);
        if (hero) hero.style.backgroundPosition = `center ${window.scrollY * 0.5}px`;

        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) current = section.getAttribute('id');
        });
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                document.getElementById('nav-toggle').checked = false;
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Animation observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.skill-item, .section-header, .portfolio-item').forEach(item => observer.observe(item));

    // Typing effect
    if (cyberText) {
        const text = cyberText.textContent;
        cyberText.textContent = '';
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) cyberText.textContent += text.charAt(i++);
            else clearInterval(typeInterval);
        }, 50);
    }

    // Form focus effects
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
        input.addEventListener('blur', () => {
            if (!input.value) input.parentElement.classList.remove('focused');
        });
    });
});