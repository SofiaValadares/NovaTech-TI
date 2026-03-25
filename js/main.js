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

    adjustHeaderLinks();
    initCarousel(); // inicia o carrossel
});

function adjustHeaderLinks() {
    const nav = document.querySelector(".header nav");
    if (!nav) return;

    const homeLink = nav.querySelector('a[href="index.html"]');
    const loginLink = nav.querySelector('a[href="login.html"]');
    const cadastroLink = nav.querySelector('a[href="cadastro.html"]');

    const currentPage = window.location.pathname.split('/').pop().toLowerCase();
    const isHome = !currentPage || currentPage === 'index.html';

    if (isHome) {
        if (homeLink) homeLink.style.display = 'none';
        if (loginLink) loginLink.style.display = '';
        if (cadastroLink) cadastroLink.style.display = '';
    } else {
        if (homeLink) homeLink.style.display = '';
        if (loginLink) loginLink.style.display = 'none';
        if (cadastroLink) cadastroLink.style.display = 'none';
    }
}