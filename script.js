// Animation du menu au défilement
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Animation des éléments au scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('expertise-item')) {
                const bar = entry.target.querySelector('.bar-fill');
                if (bar) {
                    bar.style.width = bar.parentElement.dataset.progress || '0%';
                }
            }
        }
    });
}, observerOptions);

// Observer les éléments
document.querySelectorAll('.service-card, .about-stats .stat-item, .expertise-item').forEach(item => {
    item.classList.add('fade-in');
    observer.observe(item);
});

// Animation des compteurs
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    let current = 0;
    const increment = target / 50;
    const updateCount = () => {
        if (current < target) {
            current += increment;
            stat.textContent = Math.ceil(current) + '+';
            requestAnimationFrame(updateCount);
        } else {
            stat.textContent = target + '+';
        }
    };
    observer.observe(stat.parentElement);
    stat.parentElement.addEventListener('transitionend', updateCount);
});

// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gestion du formulaire
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = form.querySelector('button');
        const originalText = button.textContent;
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        // Validation simple
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            button.textContent = 'Envoi en cours...';
            button.disabled = true;
            
            // Simulation d'envoi
            setTimeout(() => {
                button.textContent = 'Message envoyé !';
                button.classList.add('success');
                form.reset();
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.classList.remove('success');
                }, 2000);
            }, 1500);
        }
    });
    
    // Retirer la classe d'erreur lors de la saisie
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
}

// Animation des boutons CTA
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    button.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Effet parallaxe sur le hero
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
}

// DOM Elements
const searchForm = document.querySelector('.search-box');
const loginModal = document.querySelector('.modal');
const closeModal = document.querySelector('.close');
const loginButton = document.querySelector('[data-action="login"]');
const searchInput = document.querySelector('.search-box input');
const searchFilters = document.querySelectorAll('.search-filters input');

// Search functionality
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    const filters = Array.from(searchFilters)
        .filter(filter => filter.checked)
        .map(filter => filter.value);
    
    // Here you would typically make an API call with the search parameters
    console.log('Search query:', query);
    console.log('Active filters:', filters);
});

// Modal functionality
function openModal() {
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

if (loginButton) {
    loginButton.addEventListener('click', openModal);
}

if (closeModal) {
    closeModal.addEventListener('click', closeModalFunc);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeModalFunc();
    }
});

// Handle login form submission
const loginForm = document.querySelector('.login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        
        // Here you would typically make an API call to authenticate
        console.log('Login attempt:', { email });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add fade-in animation to elements when they become visible
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

// Observe all sections and cards
document.querySelectorAll('section, .featured-item, .subject-card, .tool-card, .article-item').forEach(element => {
    observer.observe(element);
});

// Advanced search toggle
const advancedSearchLink = document.querySelector('.advanced-search-link');
if (advancedSearchLink) {
    advancedSearchLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Implement advanced search toggle functionality
        console.log('Toggle advanced search');
    });
}

// Handle article actions
document.querySelectorAll('.article-actions button').forEach(button => {
    button.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        const articleId = e.target.closest('.article-item').dataset.id;
        
        switch(action) {
            case 'download':
                console.log('Download article:', articleId);
                break;
            case 'cite':
                console.log('Cite article:', articleId);
                break;
            case 'save':
                console.log('Save article:', articleId);
                break;
        }
    });
});

// Add responsive navigation toggle
const navToggle = document.createElement('button');
navToggle.className = 'nav-toggle';
navToggle.setAttribute('aria-label', 'Toggle navigation');
navToggle.innerHTML = '<i class="fas fa-bars"></i>';

const mainNav = document.querySelector('.main-nav');
if (mainNav) {
    mainNav.parentElement.insertBefore(navToggle, mainNav);
    
    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
    });
}

// Handle scroll events for header
let lastScroll = 0;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down & past the header
        header.classList.add('header-hidden');
    } else {
        // Scrolling up
        header.classList.remove('header-hidden');
    }
    
    lastScroll = currentScroll;
});

// Initialize tooltips
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', (e) => {
        const tooltipText = e.target.dataset.tooltip;
        const tooltipEl = document.createElement('div');
        tooltipEl.className = 'tooltip';
        tooltipEl.textContent = tooltipText;
        document.body.appendChild(tooltipEl);
        
        const rect = e.target.getBoundingClientRect();
        tooltipEl.style.top = `${rect.top - tooltipEl.offsetHeight - 10}px`;
        tooltipEl.style.left = `${rect.left + (rect.width - tooltipEl.offsetWidth) / 2}px`;
    });
    
    tooltip.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', function() {
    // Diaporama
    const images = document.querySelectorAll('.hero-image');
    let currentIndex = 0;

    // Vérifier que les images sont bien chargées
    console.log('Nombre d\'images trouvées:', images.length);

    function switchImage() {
        // Masquer l'image actuelle
        images[currentIndex].classList.remove('active');
        
        // Passer à l'image suivante
        currentIndex = (currentIndex + 1) % images.length;
        
        // Afficher la nouvelle image
        images[currentIndex].classList.add('active');
        
        console.log('Changement vers l\'image:', currentIndex);
    }

    // Démarrer le diaporama seulement s'il y a plus d'une image
    if (images.length > 1) {
        console.log('Démarrage du diaporama');
        // Premier changement après 3 secondes
        setTimeout(switchImage, 3000);
        // Puis toutes les 3 secondes
        setInterval(switchImage, 3000);
    }

    // Menu mobile
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
});
