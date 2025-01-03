function typeWriter(text, element, index = 0) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(() => typeWriter(text, element, index), 100);
    }
}

function initWelcome() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage) {
        const text = "Добро пожаловать на LIPA";
        typeWriter(text, welcomeMessage);
    }
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const isActive = mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active', isActive);
            hamburger.setAttribute('aria-expanded', isActive);
            mobileMenu.setAttribute('aria-hidden', !isActive);
        });

        document.addEventListener('click', (event) => {
            if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', false);
                mobileMenu.setAttribute('aria-hidden', true);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === "Escape") {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', false);
                mobileMenu.setAttribute('aria-hidden', true);
            }
        });
    }
}

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (isDark) => {
        body.classList.toggle('dark-theme', isDark);
    };

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        applyTheme(savedTheme === 'dark');
    } else {
        applyTheme(prefersDarkScheme.matches);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.classList.toggle('dark-theme');
            if (isDark) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches);
        }
    });
}

// Инициализация всех функций при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    //initWelcome();
    initMobileMenu();
});

const text = baffle('.welcome-message');
text.set({
  characters: '!/|~#.^+*$#%nwf',
  speed: 100
});
text.start();
text.reveal(2000);
