// Wait for the HTML document to be fully loaded before running script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. THEME TOGGLE LOGIC (Works on all pages) ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const logoImage = document.getElementById('logo-img');

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            
            // Toggle the .dark-mode class on the <body>
            document.body.classList.toggle('dark-mode');

            // Check if dark mode is now active
            if (document.body.classList.contains('dark-mode')) {
                // DARK MODE IS ON
                themeToggleButton.textContent = 'Light Mode';
                if (logoImage) logoImage.src = '2.png'; // Set to white logo
            } else {
                // LIGHT MODE IS ON
                themeToggleButton.textContent = 'Dark Mode';
                if (logoImage) logoImage.src = '1.png'; // Set to black logo
            }
        });
    }


    // --- 2. PROFILE TAB LOGIC (Only runs on profile.html) ---
    const tabContainer = document.querySelector('.tab-container');
    
    // Only run this code if we are on a page with tabs
    if (tabContainer) {
        const tabButtons = tabContainer.querySelectorAll('.tab-button');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabContainer.addEventListener('click', (event) => {
            // Find the button that was clicked
            const clickedTab = event.target.closest('.tab-button');
            
            // If the user didn't click a button, do nothing
            if (!clickedTab) return; 

            // 1. Remove 'active' class from all buttons
            tabButtons.forEach(button => button.classList.remove('active'));
            
            // 2. Add 'active' class to the clicked button
            clickedTab.classList.add('active');
            
            // 3. Get the ID of the panel to show (from 'data-tab' attribute)
            const targetPanelId = clickedTab.dataset.tab;
            const targetPanel = document.getElementById(targetPanelId);

            // 4. Hide all panels
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // 5. Show the target panel
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    }

});