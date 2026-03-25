async function loadComponent(id, file) {
    const el = document.getElementById(id);
    if (!el) return;

    const res = await fetch(file);
    el.innerHTML = await res.text();
}

function initCarousel() {
    const track = document.getElementById("carouselTrack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // se não existir na página, não faz nada
    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const cardWidth = 300;

    nextBtn.addEventListener("click", () => {
        const cards = document.querySelectorAll(".card");

        if (currentIndex < cards.length - 3) {
            currentIndex++;
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadComponent("header-container", "components/header.html");
    await loadComponent("footer-container", "components/footer.html");

    if (window.Auth) {
        window.Auth.ensureDefaultUser?.();
        window.Auth.guardRoutes?.();
        window.Auth.setupHeaderAuth?.(document.querySelector('.header nav'));
    }

    adjustHeaderLinks();
    initCarousel(); // inicia o carrossel
});

function adjustHeaderLinks() {
    const nav = document.querySelector(".header nav");
    if (!nav) return;

    const homeLink = nav.querySelector('a[href="index.html"]');
    const loginLink = nav.querySelector('a[href="login.html"]');
    const cadastroLink = nav.querySelector('a[href="cadastro.html"]');
    const solicitacaoLink = nav.querySelector('#solicitacao-link');
    const logoutLink = nav.querySelector('#logout-link');

    const currentPage = window.location.pathname.split('/').pop().toLowerCase();
    const isHome = !currentPage || currentPage === 'index.html';

    const logged = window.Auth?.isLoggedIn?.() || false;

    if (logged) {
        if (homeLink) homeLink.style.display = '';
        if (loginLink) loginLink.style.display = 'none';
        if (cadastroLink) cadastroLink.style.display = 'none';
        if (solicitacaoLink) solicitacaoLink.style.display = '';
        if (logoutLink) logoutLink.style.display = '';
    } else {
        if (homeLink) homeLink.style.display = isHome ? 'none' : '';
        if (loginLink) loginLink.style.display = isHome ? '' : 'none';
        if (cadastroLink) cadastroLink.style.display = isHome ? '' : 'none';
        if (solicitacaoLink) solicitacaoLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'none';
    }
}