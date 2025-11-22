document.addEventListener('DOMContentLoaded', () => {

    const toggleButton = document.getElementById('theme-toggle');
    const formLogo = document.getElementById('form-logo');

    function loadTheme() {
        let currentTheme = localStorage.getItem('theme');

        if (!currentTheme) {
            currentTheme = 'dark';
            localStorage.setItem('theme', 'dark');
        }

        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            if (toggleButton) toggleButton.innerHTML = '<span>☀️</span> Light Mode';
            if (formLogo) formLogo.src = '2.png';
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            if (toggleButton) toggleButton.innerHTML = '<span>🌙</span> Dark Mode';
            if (formLogo) formLogo.src = '1.png';
        }
    }
    loadTheme();

    let canvas = document.getElementById('bg-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'bg-canvas';
        document.body.prepend(canvas);
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '1';
        canvas.style.pointerEvents = 'none';
    }

    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    const STAR_COUNT = 200;
    const CONNECTION_DISTANCE = 120;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    class Star {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = 0;
            this.vy = 0;
            this.size = Math.random() * 2;
            this.opacity = Math.random();
            this.fadeSpeed = 0.005 + Math.random() * 0.01;
        }

        update() {
            this.opacity += this.fadeSpeed;
            if (this.opacity > 1 || this.opacity < 0.2) {
                this.fadeSpeed = -this.fadeSpeed;
            }
        }

        draw() {
            const isDark = document.body.classList.contains('dark-mode');
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = isDark
                ? `rgba(255, 255, 255, ${this.opacity})`
                : `rgba(0, 0, 0, ${this.opacity * 0.3})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new Star());
    }

    let constellationOpacity = 0;
    let constellationFadeSpeed = 0.005;
    let constellationDirection = 1;

    function animate() {
        ctx.clearRect(0, 0, width, height);

        const isDark = document.body.classList.contains('dark-mode');

        constellationOpacity += constellationFadeSpeed * constellationDirection;
        if (constellationOpacity > 0.5) { 
            constellationDirection = -1;
        } else if (constellationOpacity < 0) { 
            constellationDirection = 1;
            constellationOpacity = 0; 
        }


        if (isDark && constellationOpacity > 0) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${constellationOpacity})`;
            ctx.lineWidth = 0.5;
            for (let i = 0; i < stars.length; i++) {
             
                if (i % 2 !== 0) continue;

                for (let j = i + 1; j < stars.length; j++) {
                    const dx = stars[i].x - stars[j].x;
                    const dy = stars[i].y - stars[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECTION_DISTANCE) {
                        ctx.beginPath();
                        ctx.moveTo(stars[i].x, stars[i].y);
                        ctx.lineTo(stars[j].x, stars[j].y);
                        ctx.stroke();
                    }
                }
            }
        }


        stars.forEach(star => {
            star.update();
            star.draw();
        });

        requestAnimationFrame(animate);
    }
    animate();


    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const loginButton = loginForm.querySelector('button');

            loginButton.textContent = 'Logging in...';
            loginButton.style.opacity = '0.8';

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            document.body.classList.toggle('dark-mode');

            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                toggleButton.innerHTML = '<span>☀️</span> Light Mode';
                if (formLogo) formLogo.src = '2.png';
            } else {
                localStorage.setItem('theme', 'light');
                toggleButton.innerHTML = '<span>🌙</span> Dark Mode';
                if (formLogo) formLogo.src = '1.png';
            }
        });
    }

   
    const quotes = [
        "The best way to predict the future is to create it.",
        "Code is like humor. When you have to explain it, it’s bad.",
        "The journey of a thousand miles begins with a single line of code.",
        "Talk is cheap. Show me the code.",
        "First, solve the problem. Then, write the code."
    ];
    const quoteElement = document.querySelector('.quote');
    if (quoteElement) {
        setInterval(() => {
            quoteElement.style.opacity = '0';
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * quotes.length);
                quoteElement.textContent = `"${quotes[randomIndex]}"`;
                quoteElement.style.opacity = '0.7';
            }, 300);
        }, 6000);
    }
});
