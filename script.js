// --- 1. GLOBAL THEME LOADER (RUNS IMMEDIATELY) ---
// We must run this *before* the 'DOMContentLoaded' event
// to prevent the "flash" of the wrong theme.

// Get the elements we need to update
const themeToggleButtonApp = document.getElementById('theme-toggle');
const logoImageApp = document.getElementById('logo-img');

function loadAppTheme() {
    let currentTheme = localStorage.getItem('theme');

    // If no theme is saved, default to 'dark'
    if (currentTheme === null) {
        currentTheme = 'dark';
        localStorage.setItem('theme', 'dark');
    }

    // Apply the theme to the body and update the UI
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

// Run the theme loader as soon as the script loads
loadAppTheme();


// --- 2. ALL OTHER PAGE LOGIC ---
// Wait for the HTML document to be fully loaded for the rest
document.addEventListener('DOMContentLoaded', () => {

    // --- THEME TOGGLE (NOW SAVES THEME) ---
    // We already got 'themeToggleButtonApp' and 'logoImageApp' from above
    if (themeToggleButtonApp) {
        themeToggleButtonApp.addEventListener('click', () => {
            
            // Toggle the class on the body
            document.body.classList.toggle('dark-mode');
            
            let newTheme;
            // Check the new state, save it, and update UI
            if (document.body.classList.contains('dark-mode')) {
                newTheme = 'dark';
                if (logoImageApp) logoImageApp.src = '2.png';
                themeToggleButtonApp.textContent = 'Light Mode';
            } else {
                newTheme = 'light';
                if (logoImageApp) logoImageApp.src = '1.png';
                themeToggleButtonApp.textContent = 'Dark Mode';
            }
            
            // Save the user's choice to the "notebook"
            localStorage.setItem('theme', newTheme);
        });
    }


    // --- PROFILE TAB LOGIC (Only runs on profile.html) ---
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