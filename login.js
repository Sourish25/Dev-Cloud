document.addEventListener('DOMContentLoaded', () => {
    
    
    const toggleButton = document.getElementById('theme-toggle');
    const formLogo = document.getElementById('form-logo');
    
    function loadTheme() {
        let currentTheme = localStorage.getItem('theme');

        
        if (currentTheme === null) {
            currentTheme = 'dark';
            localStorage.setItem('theme', 'dark');
        }

        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            toggleButton.textContent = '☀️ Rise';
            formLogo.src = '2.png'; 
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            toggleButton.textContent = '🌙 Set';
            formLogo.src = '1.png'; 
        }
    }
    loadTheme(); 

    
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const loginButton = loginForm.querySelector('button');
        loginButton.textContent = 'Logging in...';
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    });

   
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        document.body.classList.toggle('dark-mode');

     
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            toggleButton.textContent = '☀️ Rise';
            formLogo.src = '2.png';
        } else {
            localStorage.setItem('theme', 'light');
            toggleButton.textContent = '🌙 Set';
            formLogo.src = '1.png';
        }
    });

  
    const quotes = [
        "The best way to predict the future is to create it.",
        "Code is like humor. When you have to explain it, it’s bad.",
        "The journey of a thousand miles begins with a single line of code.",
        "Talk is cheap. Show me the code.",
        "First, solve the problem. Then, write the code."
    ];
    const quoteElement = document.querySelector('.quote');
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.textContent = `"${quotes[randomIndex]}"`;
    }, 6000);


    const starsContainer = document.getElementById('stars');
    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(star);
    }

});
