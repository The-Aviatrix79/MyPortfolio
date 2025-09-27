class EnhancedInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupMagneticElements();
        this.setupInteractiveButtons();
        this.setupTiltEffect();
        this.setupInteractiveSkills();
        this.setupProjectCardEffects();
        this.setupProjectCursorTracking();
    }

    setupMagneticElements() {
        const magneticElements = document.querySelectorAll('.btn, .social-link, .filter-btn');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = (e.clientX - centerX) * 0.1;
                const deltaY = (e.clientY - centerY) * 0.1;
                
                el.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }

    setupInteractiveButtons() {
        const buttons = document.querySelectorAll('.btn, .filter-btn, .btn-icon');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple-effect 0.6s ease-out;
                    pointer-events: none;
                    z-index: 10;
                `;

                btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Add ripple animation
        if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple-effect {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupTiltEffect() {
        // Only apply to stat cards now, removed email-card
        const tiltElements = document.querySelectorAll('.stat-card');
        
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const tiltX = (e.clientY - centerY) / 20;
                const tiltY = (centerX - e.clientX) / 20;
                
                el.style.transform = `
                    perspective(1000px) 
                    rotateX(${tiltX}deg) 
                    rotateY(${tiltY}deg) 
                    scale(1.02)
                `;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });
    }

    setupInteractiveSkills() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const skillIcon = item.querySelector('.skill-icon');
            const skillProgress = item.querySelector('.skill-progress');
            
            item.addEventListener('click', () => {
                // Pulse effect
                skillIcon.style.animation = 'skill-pulse 0.8s ease-out';
                
                setTimeout(() => {
                    skillIcon.style.animation = '';
                }, 800);
            });

            item.addEventListener('mouseenter', () => {
                skillIcon.style.transform = 'scale(1.1) rotate(5deg)';
                skillIcon.style.filter = 'drop-shadow(0 4px 8px rgba(37, 99, 235, 0.3))';
            });

            item.addEventListener('mouseleave', () => {
                skillIcon.style.transform = '';
                skillIcon.style.filter = '';
            });
        });
        
        // Add skill pulse animation
        if (!document.querySelector('#skill-pulse-style')) {
            const style = document.createElement('style');
            style.id = 'skill-pulse-style';
            style.textContent = `
                @keyframes skill-pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupProjectCardEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Add shimmer effect on hover
            card.addEventListener('mouseenter', () => {
                const shimmer = document.createElement('div');
                shimmer.className = 'project-shimmer';
                shimmer.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        rgba(255, 255, 255, 0.3) 50%,
                        transparent 100%
                    );
                    transition: left 0.8s ease;
                    pointer-events: none;
                    z-index: 15;
                `;
                
                card.style.position = 'relative';
                card.appendChild(shimmer);
                
                // Trigger shimmer animation
                setTimeout(() => {
                    shimmer.style.left = '100%';
                }, 10);
                
                // Remove shimmer after animation
                setTimeout(() => {
                    if (shimmer.parentNode) {
                        shimmer.remove();
                    }
                }, 820);
            });
            
            // Enhanced button hover effects
            const buttons = card.querySelectorAll('.btn-icon');
            buttons.forEach(btn => {
                btn.addEventListener('mouseenter', () => {
                    btn.style.animation = 'button-bounce 0.4s ease-out';
                });
            });
        });
        
        // Add button bounce animation
        if (!document.querySelector('#button-bounce-style')) {
            const style = document.createElement('style');
            style.id = 'button-bounce-style';
            style.textContent = `
                @keyframes button-bounce {
                    0% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-5px) scale(1.1); }
                    100% { transform: translateY(-3px) scale(1.1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupProjectCursorTracking() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Calculate mouse position relative to card center
                const deltaX = (e.clientX - centerX) * 0.15;
                const deltaY = (e.clientY - centerY) * 0.15;
                
                // Calculate tilt based on mouse position
                const tiltX = (e.clientY - centerY) / 25;
                const tiltY = (centerX - e.clientX) / 25;
                
                // Apply smooth transform with both translation and rotation
                card.style.transform = `
                    translate(${deltaX}px, ${deltaY}px) 
                    perspective(1000px) 
                    rotateX(${tiltX}deg) 
                    rotateY(${tiltY}deg) 
                    scale(1.05)
                `;
                
                // Add subtle shadow that follows the card
                card.style.boxShadow = `
                    ${deltaX * 0.5}px ${deltaY * 0.5}px 25px rgba(37, 99, 235, 0.2),
                    0 20px 40px rgba(37, 99, 235, 0.15),
                    0 0 0 1px rgba(37, 99, 235, 0.1)
                `;
            });

            card.addEventListener('mouseleave', () => {
                // Smooth return to original position
                card.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
                card.style.transform = 'translate(0px, 0px) perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                card.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.15), 0 0 0 1px rgba(37, 99, 235, 0.1)';
                
                // Remove transition after animation completes for smooth mouse tracking
                setTimeout(() => {
                    card.style.transition = '';
                }, 500);
            });
        });
    }
}

// Keep only essential scroll triggers
class ScrollTriggers {
    constructor() {
        this.init();
    }

    init() {
        this.setupCounterAnimations();
        this.setupProgressBars();
        this.setupStaggeredAnimations();
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-counted')) {
                    this.animateCounter(entry.target);
                    entry.target.setAttribute('data-counted', 'true');
                }
            });
        });
        
        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        let current = 0;
        const increment = target / 60;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    }

    setupProgressBars() {
        const progressBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                    entry.target.setAttribute('data-animated', 'true');
                }
            });
        });
        
        progressBars.forEach(bar => observer.observe(bar));
    }

    setupStaggeredAnimations() {
        const animationGroups = document.querySelectorAll('.stats-grid, .projects-grid, .skill-grid');
        
        animationGroups.forEach(group => {
            const items = group.children;
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        Array.from(items).forEach((item, index) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0) scale(1)';
                            }, index * 100);
                        });
                    }
                });
            });
            
            // Set initial state
            Array.from(items).forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px) scale(0.95)';
                item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            });
            
            observer.observe(group);
        });
    }
}
