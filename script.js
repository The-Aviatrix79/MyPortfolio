// Enhanced Theme Manager
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themeToggle = null;
        this.themeIcon = null;
        this.init();
    }

    init() {
        this.loadSavedTheme();
        this.setupThemeToggle();
        this.bindEvents();
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.currentTheme = 'dark';
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        }
    }

    setupThemeToggle() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.querySelector('.theme-toggle-icon');
        
        if (this.themeToggle && this.themeIcon) {
            this.updateThemeIcon();
        }
    }

    bindEvents() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('portfolio-theme', this.currentTheme);
        this.updateThemeIcon();
        this.animateToggle();
    }

    updateThemeIcon() {
        if (this.themeIcon) {
            if (this.currentTheme === 'dark') {
                this.themeIcon.className = 'theme-toggle-icon fas fa-moon';
            } else {
                this.themeIcon.className = 'theme-toggle-icon fas fa-sun';
            }
        }
    }

    animateToggle() {
        if (this.themeToggle) {
            this.themeToggle.style.transform = 'translateY(-50%) scale(0.9) rotate(180deg)';
            setTimeout(() => {
                this.themeToggle.style.transform = 'translateY(-50%) scale(1) rotate(0deg)';
            }, 200);
        }
    }
}

// Enhanced Tooltip System
class TooltipManager {
    constructor() {
        this.tooltip = null;
        this.init();
    }

    init() {
        this.createTooltip();
        this.bindEvents();
    }

    createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'tooltip';
        this.tooltip.style.cssText = `
            position: fixed;
            background: var(--gray-900);
            color: var(--white);
            padding: 0.5rem 0.75rem;
            border-radius: var(--radius);
            font-size: 0.75rem;
            font-weight: 500;
            pointer-events: none;
            z-index: 10000;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.2s ease;
            white-space: nowrap;
            backdrop-filter: blur(10px);
        `;
        document.body.appendChild(this.tooltip);
    }

    bindEvents() {
        document.addEventListener('mouseover', (e) => {
            const element = e.target.closest('[data-tooltip]');
            if (element) {
                this.showTooltip(e, element.getAttribute('data-tooltip'));
            }
        });

        document.addEventListener('mouseout', (e) => {
            const element = e.target.closest('[data-tooltip]');
            if (element) {
                this.hideTooltip();
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (this.tooltip.style.opacity === '1') {
                this.tooltip.style.left = e.pageX + 10 + 'px';
                this.tooltip.style.top = e.pageY - this.tooltip.offsetHeight - 10 + 'px';
            }
        });
    }

    showTooltip(e, text) {
        this.tooltip.textContent = text;
        this.tooltip.style.left = e.pageX + 10 + 'px';
        this.tooltip.style.top = e.pageY - this.tooltip.offsetHeight - 10 + 'px';
        this.tooltip.style.opacity = '1';
        this.tooltip.style.transform = 'translateY(0)';
    }

    hideTooltip() {
        this.tooltip.style.opacity = '0';
        this.tooltip.style.transform = 'translateY(10px)';
    }
}

// Clean loading system
let loadingProgress = 0;
const loadingTexts = [
    'Loading interface...',
    'Preparing components...',
    'Setting up interactions...',
    'Finalizing experience...',
    'Ready!'
];

function updateLoadingProgress() {
    const loadingBar = document.getElementById('loadingBar');
    const loadingText = document.getElementById('loadingText');
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (loadingProgress < 100) {
        loadingProgress += Math.random() * 20 + 15;
        if (loadingProgress > 100) loadingProgress = 100;
        
        if (loadingBar) loadingBar.style.width = loadingProgress + '%';
        
        const textIndex = Math.min(Math.floor((loadingProgress / 100) * loadingTexts.length), loadingTexts.length - 1);
        if (loadingText) loadingText.textContent = loadingTexts[textIndex];
        
        setTimeout(updateLoadingProgress, Math.random() * 80 + 40);
    } else {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    initializeWebsite();
                }, 500);
            }
        }, 200);
    }
}

function initializeWebsite() {
    console.log('Initializing website...');
    document.body.classList.add('loaded');
    
    try {
        new ThemeManager();
        new SkillsManager();
        new SharpAnimations();
        new CleanInteractions();
        new SmoothScrolling();
        new TooltipManager();
        console.log('All systems initialized');
    } catch (error) {
        console.error('Error initializing:', error);
    }
    
    // Animate hero stats
    setTimeout(() => {
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            heroStats.style.opacity = '1';
            heroStats.style.transform = 'translateY(0)';
        }
    }, 800);
    
    // Clean hero entrance
    setTimeout(() => {
        document.querySelectorAll('.hero-buttons .btn').forEach((btn, index) => {
            setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 600);
}

// Clean vector background
class VectorBackground {
    constructor() {
        this.container = document.getElementById('vectorBackground');
        if (!this.container) return;
        this.shapes = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        this.createShapes();
        this.bindEvents();
        this.animate();
    }

    createShapes() {
        const shapeTypes = ['circle', 'square', 'triangle'];
        const numberOfShapes = 6;

        for (let i = 0; i < numberOfShapes; i++) {
            const shape = document.createElement('div');
            const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            
            shape.className = `vector-shape ${shapeType}`;
            
            const shapeData = {
                element: shape,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
            };

            this.shapes.push(shapeData);
            this.container.appendChild(shape);
        }
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    animate() {
        this.shapes.forEach(shape => {
            shape.x += shape.speedX;
            shape.y += shape.speedY;

            if (shape.x <= 0 || shape.x >= window.innerWidth) shape.speedX *= -1;
            if (shape.y <= 0 || shape.y >= window.innerHeight) shape.speedY *= -1;

            shape.element.style.transform = `translate(${shape.x}px, ${shape.y}px)`;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Enhanced Sharp animations system
class SharpAnimations {
    constructor() {
        this.observedElements = new Set();
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.observeElements();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.observedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.observedElements.add(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
    }

    observeElements() {
        const selectors = [
            '.section-title',
            '.section-subtitle',
            '.stat-card',
            '.project-card',
            '.skill-item',
            '.contact-item',
            '.profile-card',
            '.contact-form',
            '.feature-item',
            '.timeline-item',
            '.newsletter-content'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, index) => {
                el.classList.add('scroll-animate');
                el.style.transitionDelay = `${index * 80}ms`;
                this.observer.observe(el);
            });
        });
    }

    animateElement(element) {
        element.classList.add('animate-in');

        if (element.classList.contains('stat-card')) {
            setTimeout(() => this.animateCounter(element), 300);
        }

        if (element.classList.contains('skill-item')) {
            setTimeout(() => this.animateSkillBar(element), 400);
        }
    }

    animateCounter(statCard) {
        const counter = statCard.querySelector('.stat-number');
        if (!counter || counter.hasAttribute('data-animated')) return;

        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };

        counter.setAttribute('data-animated', 'true');
        updateCounter();
    }

    animateSkillBar(skillItem) {
        const skillBar = skillItem.querySelector('.skill-progress');
        if (!skillBar || skillBar.hasAttribute('data-animated')) return;
        
        const width = skillBar.getAttribute('data-width');
        setTimeout(() => {
            skillBar.style.width = width;
            skillBar.setAttribute('data-animated', 'true');
        }, 200);
    }
}

// Enhanced Clean interactions
class CleanInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupTechGrid();
        this.setupCards();
        this.setupNavigation();
        this.setupForms();
    }

    setupTechGrid() {
        const techIcons = document.querySelectorAll('.tech-icon');
        
        techIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.15) rotate(5deg)';
            });

            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            });

            icon.addEventListener('click', () => {
                this.createRipple(icon);
            });
        });
    }

    setupCards() {
        const cards = document.querySelectorAll('.stat-card, .project-card, .contact-item, .skill-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    setupForms() {
        const forms = document.querySelectorAll('.interactive-form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.style.transform = 'translateY(-2px)';
                });
                
                input.addEventListener('blur', () => {
                    input.style.transform = 'translateY(0)';
                });
            });
        });
    }

    createRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(37, 99, 235, 0.3);
            transform: translate(-50%, -50%);
            animation: clean-ripple 0.6s ease-out;
            pointer-events: none;
        `;

        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
}

// Smooth scrolling
class SmoothScrolling {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollProgress();
        this.setupSmoothScrolling();
    }

    setupScrollProgress() {
        if (document.querySelector('.scroll-progress')) return;
        
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
            z-index: 9999;
            transition: width 0.1s ease;
            box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.smoothScrollTo(target);
                }
            });
        });
    }

    smoothScrollTo(target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 64;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Add enhanced animations
    const enhancedStyles = document.createElement('style');
    enhancedStyles.textContent = `
        @keyframes clean-ripple {
            to {
                width: 60px;
                height: 60px;
                opacity: 0;
            }
        }
        
        .hero-buttons .btn {
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.4s ease;
        }
    `;
    document.head.appendChild(enhancedStyles);

    setTimeout(() => {
        console.log('Starting loading');
        updateLoadingProgress();
    }, 100);

    // Enhanced typing animation with your name
    setTimeout(() => {
        const typingText = document.querySelector('.typing-text');
        if (typingText) {
            const phrases = [
                'Divyam Arora',
                'AI/ML Student',
                'Full Stack Developer',
                'Web Developer',
                'Problem Solver',
                'Tech Enthusiast'
            ];
            let phraseIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function typeEffect() {
                const currentPhrase = phrases[phraseIndex];
                
                if (isDeleting) {
                    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                    charIndex++;
                }

                let typeSpeed = isDeleting ? 30 : 60;

                if (!isDeleting && charIndex === currentPhrase.length) {
                    typeSpeed = 2000;
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    typeSpeed = 300;
                }

                setTimeout(typeEffect, typeSpeed);
            }

            typeEffect();
        }
    }, 1500);

    // Clean menu interaction
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Clean project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach((card, index) => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // Clean contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = '#059669';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1000);
        });
    }

    // Initialize vector background
    new VectorBackground();
});

// Clean scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - 64;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Fallback loading screen removal
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen && loadingScreen.style.display !== 'none') {
            console.log('Fallback: Hiding loading screen');
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                if (!document.body.classList.contains('loaded')) {
                    initializeWebsite();
                }
            }, 300);
        }
    }, 2000);
});

// Enhanced Skills Category Manager
class SkillsManager {
    constructor() {
        this.navItems = document.querySelectorAll('.skill-nav-item');
        this.categories = document.querySelectorAll('.skill-category');
        this.currentCategory = 'aiml'; // Start with AI/ML
        this.init();
    }

    init() {
        this.bindEvents();
        this.showCategory(this.currentCategory);
    }

    bindEvents() {
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                this.switchCategory(category);
            });
        });
    }

    switchCategory(category) {
        if (category === this.currentCategory) return;

        // Update navigation
        this.navItems.forEach(item => item.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        // Hide current category
        this.hideCategory(this.currentCategory);

        // Show new category after a brief delay
        setTimeout(() => {
            this.showCategory(category);
            this.currentCategory = category;
        }, 200);
    }

    hideCategory(category) {
        const categoryEl = document.getElementById(category);
        if (categoryEl) {
            categoryEl.style.opacity = '0';
            categoryEl.style.transform = 'translateY(20px)';
            setTimeout(() => {
                categoryEl.classList.remove('active');
            }, 300);
        }
    }

    showCategory(category) {
        const categoryEl = document.getElementById(category);
        if (categoryEl) {
            categoryEl.classList.add('active');
            setTimeout(() => {
                categoryEl.style.opacity = '1';
                categoryEl.style.transform = 'translateY(0)';
                this.animateSkillBars(categoryEl);
            }, 50);
        }
    }

    animateSkillBars(categoryEl) {
        const skillBars = categoryEl.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, index * 150);
        });
    }
}
