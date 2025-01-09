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

// Gestion des menus déroulants
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Gestion des menus déroulants
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        // Gestion du clic sur le toggle
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const isActive = dropdown.classList.contains('active');
                
                // Fermer tous les autres dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                
                // Toggle le dropdown actuel
                dropdown.classList.toggle('active');
            });
        }
    });

    // Fermer les dropdowns quand on clique en dehors
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Gestion de la navigation au clavier
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        const items = menu ? menu.querySelectorAll('a') : [];
        
        if (toggle && items.length) {
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    if (dropdown.classList.contains('active')) {
                        items[0].focus();
                    }
                }
            });

            items.forEach((item, index) => {
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        if (index < items.length - 1) {
                            items[index + 1].focus();
                        }
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        if (index > 0) {
                            items[index - 1].focus();
                        } else {
                            toggle.focus();
                        }
                    } else if (e.key === 'Escape') {
                        e.preventDefault();
                        dropdown.classList.remove('active');
                        toggle.focus();
                    }
                });
            });
        }
    });
});

// Gestion de la connexion/déconnexion
function handleAuth(action) {
    if (action === 'login') {
        window.location.href = 'login.html';
    } else if (action === 'logout') {
        // Ajoutez ici la logique de déconnexion
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }
}

// Vérifie si l'utilisateur est connecté
function checkAuthStatus() {
    const user = localStorage.getItem('user');
    const authDropdown = document.querySelector('.auth-dropdown');
    
    if (user) {
        // Utilisateur connecté
        authDropdown.innerHTML = `
            <span class="dropdown-toggle">
                <i class="fas fa-user-circle"></i>
                <span>${JSON.parse(user).name}</span>
                <i class="fas fa-chevron-down"></i>
            </span>
            <div class="dropdown-menu">
                <a href="#profile"><i class="fas fa-user"></i> Profile</a>
                <div class="menu-divider"></div>
                <a href="#" onclick="handleAuth('logout')">
                    <i class="fas fa-power-off"></i> Déconnexion
                </a>
            </div>
        `;
    } else {
        // Utilisateur non connecté
        authDropdown.innerHTML = `
            <span class="dropdown-toggle">
                <i class="fas fa-user-circle"></i>
                <span>Compte</span>
                <i class="fas fa-chevron-down"></i>
            </span>
            <div class="dropdown-menu">
                <a href="#" onclick="handleAuth('login')">
                    <i class="fas fa-sign-in-alt"></i> Connexion
                </a>
            </div>
        `;
    }
}

// Vérifie le statut de connexion au chargement de la page
document.addEventListener('DOMContentLoaded', checkAuthStatus);

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
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Fermer le menu quand on clique sur un lien
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !menuToggle.contains(event.target) && mainNav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour marquer le lien actif
    function setActivePage() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Retirer la classe active de tous les liens
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Trouver et activer le bon lien
        document.querySelectorAll('.main-nav a:not(.dropdown-toggle)').forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            
            const linkPage = href.split('/').pop();
            
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Appliquer l'état actif au chargement
    setActivePage();

    // Gérer les clics sur les liens
    document.querySelectorAll('.main-nav a:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.getAttribute('href').startsWith('#')) {
                document.querySelectorAll('.main-nav a').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Gérer les toggles de dropdown
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = this.closest('.dropdown');
            const wasActive = dropdown.classList.contains('active');
            
            // Fermer tous les dropdowns
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
            
            // Réouvrir celui-ci s'il n'était pas actif
            if (!wasActive) {
                dropdown.classList.add('active');
            }
        });
    });

    // Fermer les dropdowns au clic en dehors
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Image switching for collections header
    const headerImages = document.querySelectorAll('.header-background .bg-image');
    if (headerImages.length > 1) {
        let currentImageIndex = 0;
        setInterval(() => {
            headerImages[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % headerImages.length;
            headerImages[currentImageIndex].classList.add('active');
        }, 5000); // Switch every 5 seconds
    }
});
