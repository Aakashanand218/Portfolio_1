
        // Update time
        function updateTime() {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
            document.getElementById('time').textContent = time;
        }
        
        updateTime();
        setInterval(updateTime, 1000);

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Create floating particles
        function createParticles() {
            const background = document.querySelector('.background');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                background.appendChild(particle);
            }
        }

        createParticles();

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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

        // Cursor trail effect
        let trail = [];
        let maxTrail = 5;

        document.addEventListener('mousemove', (e) => {
            trail.push({ x: e.clientX, y: e.clientY });
            
            if (trail.length > maxTrail) {
                trail.shift();
            }

            // Remove existing trail elements
            document.querySelectorAll('.cursor-trail').forEach(el => el.remove());

            // Create new trail elements
            trail.forEach((point, index) => {
                const trailElement = document.createElement('div');
                trailElement.className = 'cursor-trail';
                trailElement.style.left = point.x + 'px';
                trailElement.style.top = point.y + 'px';
                trailElement.style.opacity = index / maxTrail;
                trailElement.style.transform = `scale(${index / maxTrail})`;
                document.body.appendChild(trailElement);

                // Remove trail element after a short delay
                setTimeout(() => {
                    if (trailElement.parentNode) {
                        trailElement.parentNode.removeChild(trailElement);
                    }
                }, 100);
            });
        });

        // Add hover effects to buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero-content');
            const speed = scrolled * 0.5;
            
            if (parallax) {
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });

        // Add typing effect to greeting
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            setTimeout(type, 1000);
        }

        // Initialize typing effect
        window.addEventListener('load', () => {
            const greeting = document.querySelector('.greeting');
            if (greeting) {
                const originalText = greeting.textContent;
                typeWriter(greeting, originalText, 50);
            }
        });



        window.addEventListener('load', function() {
  const bgMusic = document.getElementById('bgMusic');
  if (bgMusic) {
    bgMusic.play().catch(() => {
      // Autoplay was prevented—consider prompting user to interact
    });
  }
});


        const clickSound = document.getElementById('clickSound');
        const bgMusic = document.getElementById('bgMusic');

        let soundOn = localStorage.getItem('soundOn') === 'true' || true;

        // To track if background music was playing before toggle off (for resume)
        let wasBgMusicPlaying = false;

        const soundToggle = document.querySelector('.nav-toggle span:nth-child(2)');
        soundToggle.style.cursor = 'pointer';

        function updateToggleText() {
            soundToggle.textContent = soundOn ? 'Sound On' : 'Sound Off';
        }

        function playClickSound() {
            if (soundOn && clickSound) {
                clickSound.currentTime = 0;
                clickSound.play().catch(() => {
                    // Handle play() promise rejection silently
                });
            }
        }

        function updateBgMusic() {
            if (soundOn && bgMusic) {
                if (wasBgMusicPlaying) {
                    bgMusic.play().catch(() => { });
                } else {
                    bgMusic.volume = 1;
                    bgMusic.play().catch(() => { });
                    wasBgMusicPlaying = true;
                }
            } else if (bgMusic) {
                wasBgMusicPlaying = !bgMusic.paused;
                bgMusic.pause();
            }
        }

        // Toggle sound on/off on button click
        soundToggle.addEventListener('click', () => {
            soundOn = !soundOn;
            localStorage.setItem('soundOn', soundOn);
            updateToggleText();
            updateBgMusic();
        });

        // Initial setup on page load
        updateToggleText();
        updateBgMusic();

        // Play click sound ONLY if sound is ON and after interaction
        document.addEventListener('click', (e) => {
            // Avoid playing click sound when user clicks toggle button itself to prevent double sound
            if (!e.target.closest('.nav-toggle')) {
                playClickSound();
            }
        });


        
