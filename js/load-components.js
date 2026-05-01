// js/load-components.js

async function loadSiteComponents() {
    const headerPlaceholder = document.getElementById('site-header');
    const footerPlaceholder = document.getElementById('site-footer');

    // Default basePath logic based on path depth
    let basePath = './';
    if (headerPlaceholder && headerPlaceholder.getAttribute('data-basepath')) {
        basePath = headerPlaceholder.getAttribute('data-basepath');
    } else {
        const path = window.location.pathname;
        if (path.includes('/front/') || path.includes('/compressor/') || path.includes('/audio-to-text/') || path.includes('/tax-calculator/') || path.includes('/power-calculator/') || path.includes('/age-calculator/') || path.includes('/bmi-calculator/')) {
            basePath = '../';
        }
    }

    try {
        const cacheBuster = '?v=' + new Date().getTime();
        if (headerPlaceholder) {
            const res = await fetch(basePath + 'components/header.html' + cacheBuster);
            if (res.ok) {
                let html = await res.text();
                html = html.replace(/\{\{basePath\}\}/g, basePath);
                headerPlaceholder.outerHTML = html;
            }
        }
        if (footerPlaceholder) {
            const res = await fetch(basePath + 'components/footer.html' + cacheBuster);
            if (res.ok) {
                let html = await res.text();
                html = html.replace(/\{\{basePath\}\}/g, basePath);
                footerPlaceholder.outerHTML = html;
            }
        }
    } catch (e) {
        console.error('Failed to load footer', e);
    }

    // Initialize the theme toggle for the newly loaded header
    const themeBtn = document.getElementById('sshihabb007-theme-toggle');
    if (themeBtn) {
        const currentTheme = localStorage.getItem('mehedi_theme');
        if (currentTheme === 'light') {
            const icon = themeBtn.querySelector('i');
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        }
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            const icon = themeBtn.querySelector('i');
            if (icon) {
                if (isLight) {
                    icon.classList.replace('fa-moon', 'fa-sun');
                } else {
                    icon.classList.replace('fa-sun', 'fa-moon');
                }
            }
            localStorage.setItem('mehedi_theme', isLight ? 'light' : 'dark');
        });
    }

    // PWA Install Logic
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
    });

    const installBtn = document.getElementById('sshihabb007-install-btn');
    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                // Show the install prompt
                deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                // We've used the prompt, and can't use it again, throw it away
                deferredPrompt = null;
            } else {
                // Fallback for browsers that don't support beforeinstallprompt (e.g. iOS Safari)
                // or if the app is already installed
                alert("To install this app:\n\n- On iOS: Tap the Share button and select 'Add to Home Screen'\n- On Android/Chrome: Use the browser menu to 'Install App' or 'Add to Home screen'\n\nIf already installed, you can open it from your app drawer!");
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSiteComponents);
} else {
    loadSiteComponents();
}
