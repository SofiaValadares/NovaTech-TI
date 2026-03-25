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

    initCarousel(); // inicia o carrossel
});