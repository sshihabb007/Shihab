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
        if (path.includes('/front/') || path.includes('/compressor/') || path.includes('/audio-to-text/') || path.includes('/tax-calculator/') || path.includes('/power-calculator/')) {
            basePath = '../';
        }
    }

    try {
        if (headerPlaceholder) {
            const res = await fetch(basePath + 'components/header.html');
            if (res.ok) {
                let html = await res.text();
                html = html.replace(/\{\{basePath\}\}/g, basePath);
                headerPlaceholder.outerHTML = html;
            }
        }
    } catch (e) {
        console.error('Failed to load header', e);
    }

    try {
        if (footerPlaceholder) {
            const res = await fetch(basePath + 'components/footer.html');
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
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSiteComponents);
} else {
    loadSiteComponents();
}
