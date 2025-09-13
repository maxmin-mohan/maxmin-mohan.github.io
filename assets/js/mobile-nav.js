// Function to initialize mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize icons
    lucide.createIcons();

    // Get all navigation items
    const navItems = document.querySelectorAll('.nav-item');
    const lamp = document.getElementById('lamp');

    // Function to highlight active nav item
    const setActiveNavItem = (el) => {
        // Remove active class from all nav items
        navItems.forEach(item => {
            item.classList.remove('active');
            item.style.color = 'var(--nav-text-color)';
        });

        // Add active class to clicked item
        el.classList.add('active');
        el.style.color = 'var(--nav-active-text)';

        // Position lamp (desktop only)
        if (window.innerWidth > 768) {
            const width = el.offsetWidth;
            const left = el.offsetLeft;
            lamp.style.width = width + 'px';
            lamp.style.left = left + 'px';
        }
    };

    // Add click handlers to nav items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            setActiveNavItem(e.currentTarget);
        });

        // Set initial active state based on current page
        if (window.location.href.includes(item.getAttribute('href'))) {
            setActiveNavItem(item);
        }
    });

    // Set initial active state for index.html
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        setActiveNavItem(navItems[0]);
    }

    // Initialize lamp position for active nav item
    const activeItem = document.querySelector('.nav-item.active') || navItems[0];
    if (window.innerWidth > 768) {
        lamp.style.width = activeItem.offsetWidth + 'px';
        lamp.style.left = activeItem.offsetLeft + 'px';
    }
});