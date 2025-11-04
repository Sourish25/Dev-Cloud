
const themeToggleButtonApp = document.getElementById('theme-toggle');
const logoImageApp = document.getElementById('logo-img');

function loadAppTheme() {
    let currentTheme = localStorage.getItem('theme');

 
    if (currentTheme === null) {
        currentTheme = 'dark';
        localStorage.setItem('theme', 'dark');
    }


    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (logoImageApp) logoImageApp.src = '2.png';
        if (themeToggleButtonApp) themeToggleButtonApp.textContent = 'Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        if (logoImageApp) logoImageApp.src = '1.png';
        if (themeToggleButtonApp) themeToggleButtonApp.textContent = 'Dark Mode';
    }
}


loadAppTheme();



document.addEventListener('DOMContentLoaded', () => {

  
    if (themeToggleButtonApp) {
        themeToggleButtonApp.addEventListener('click', () => {
            
          
            document.body.classList.toggle('dark-mode');
            
            let newTheme;
          
            if (document.body.classList.contains('dark-mode')) {
                newTheme = 'dark';
                if (logoImageApp) logoImageApp.src = '2.png';
                themeToggleButtonApp.textContent = 'Light Mode';
            } else {
                newTheme = 'light';
                if (logoImageApp) logoImageApp.src = '1.png';
                themeToggleButtonApp.textContent = 'Dark Mode';
            }
            
         
            localStorage.setItem('theme', newTheme);
        });
    }


   
    const tabContainer = document.querySelector('.tab-container');
    
    if (tabContainer) {
        const tabButtons = tabContainer.querySelectorAll('.tab-button');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabContainer.addEventListener('click', (event) => {
            const clickedTab = event.target.closest('.tab-button');
            if (!clickedTab) return; 

            tabButtons.forEach(button => button.classList.remove('active'));
            clickedTab.classList.add('active');
            
            const targetPanelId = clickedTab.dataset.tab;
            const targetPanel = document.getElementById(targetPanelId);

            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    }


});
