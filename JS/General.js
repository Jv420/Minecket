// ==================
//   NAVBAR MOBILE
// ==================

document.addEventListener('DOMContentLoaded', function() {
    const navbars = document.querySelector('.navbars-bars');
    const navMobileMenu = document.querySelector('.nav-mobile-menu');

    if (navbars && navMobileMenu) {
        navbars.addEventListener('click', () => {
            navbars.classList.toggle('active');
            navMobileMenu.classList.toggle('active');
        });
    }

    // =====================
    //     MAIN NAV ITEM
    // =====================

    const navinicial = document.querySelector('.nav-logo');

    if (navinicial) {
        navinicial.addEventListener('click', () => {
            window.location.href = "../HTML/Index.html";
        });
    }
});