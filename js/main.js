/**
 * ============================================================================
 *  SCRIPT PRINCIPAL - NOVATECH TI
 * ============================================================================
 * Responsável pela inicialização global do aplicativo
 * - Carregamento de componentes (header e footer)
 * - Inicialização do carrossel
 * - Gerenciamento da autenticação
 * - Ajuste dinâmico de navegação baseado no status do usuário
 * ============================================================================
 */

/**
 * Carrega um componente HTML externo dinamicamente
 * @param {string} id - ID do elemento onde inserir o componente
 * @param {string} file - Caminho do arquivo HTML a carregar
 */
async function loadComponent(id, file) {
    const el = document.getElementById(id);
    if (!el) return;

    try {
        const res = await fetch(file);
        if (!res.ok) {
            throw new Error(`Erro ao carregar ${file}: ${res.status} ${res.statusText}`);
        }
        el.innerHTML = await res.text();
    } catch (error) {
        console.error("Erro ao carregar componente:", error);
        // Fallback: exibir mensagem de erro ou conteúdo padrão
        el.innerHTML = `<p style="color: #da1011; text-align: center;">Erro ao carregar componente: ${file}</p>`;
    }
}

/**
 * Inicializa o carrossel com navegação por botões e teclado
 * Suporta: setas esquerda/direita, Home, End
 */
function initCarousel() {
    const track = document.getElementById("carouselTrack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // se não existir na página, não faz nada
    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const cardWidth = 300;
    const containerEl = document.querySelector(".track-container");

    // ========== FUNÇÃO PARA ATUALIZAR POSIÇÃO ==========
    const updateCarousel = () => {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        // Atualizar atributos ARIA para acessibilidade
        track.setAttribute("aria-live", "polite");
    };

    // ========== NAVEGAÇÃO BY BOTÃO DIREITO ==========
    nextBtn.addEventListener("click", () => {
        const cards = document.querySelectorAll(".card");
        if (currentIndex < cards.length - 3) {
            currentIndex++;
            updateCarousel();
        }
    });

    // ========== NAVEGAÇÃO BY BOTÃO ESQUERDO ==========
    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // ========== NAVEGAÇÃO POR TECLADO (ACESSIBILIDADE) ==========
    /* Setas esquerda/direita, Home para início, End para fim */
    document.addEventListener("keydown", (e) => {
        if (!containerEl) return;
        
        // Verifica se o foco está no carrossel
        if (document.activeElement === containerEl || 
            document.activeElement === prevBtn || 
            document.activeElement === nextBtn) {
            
            if (e.key === "ArrowRight") {
                e.preventDefault();
                nextBtn.click();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                prevBtn.click();
            } else if (e.key === "Home") {
                e.preventDefault();
                currentIndex = 0;
                updateCarousel();
            } else if (e.key === "End") {
                e.preventDefault();
                const cards = document.querySelectorAll(".card");
                currentIndex = Math.max(0, cards.length - 3);
                updateCarousel();
            }
        }
    });

    // Tornar os botões acessíveis com tabindex
    prevBtn.setAttribute("tabindex", "0");
    nextBtn.setAttribute("tabindex", "0");
    prevBtn.setAttribute("role", "button");
    nextBtn.setAttribute("role", "button");
    prevBtn.setAttribute("aria-label", "Carrossel anterior");
    nextBtn.setAttribute("aria-label", "Carrossel próximo");
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

    // Aguardar a API do YouTube carregar antes de inicializar o player
    if (typeof YT !== 'undefined' && YT.Player) {
        initVideoSoundControl();
    } else {
        // Se a API ainda não carregou, esperar pelo evento
        window.onYouTubeIframeAPIReady = function() {
            initVideoSoundControl();
        };
    }
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

/**
 * Inicializa o controle de som do vídeo do YouTube
 * Permite ao usuário ativar o som clicando no botão
 */
let youtubePlayer;

function initVideoSoundControl() {
    const unmuteBtn = document.getElementById('unmuteBtn');

    if (!unmuteBtn) return;

    // Criar player do YouTube usando a API
    youtubePlayer = new YT.Player('youtubePlayer', {
        videoId: 'l8DOoqFqq4A',
        playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            fs: 0,
            cc_load_policy: 0,
            iv_load_policy: 3,
            autohide: 0
        },
        events: {
            onReady: function(event) {
                // Player está pronto, autoplay já iniciou mutado
                console.log('YouTube player ready');
            },
            onStateChange: function(event) {
                // Opcional: lidar com mudanças de estado
            }
        }
    });

    unmuteBtn.addEventListener('click', () => {
        if (youtubePlayer && youtubePlayer.unMute) {
            youtubePlayer.unMute();
            unmuteBtn.classList.add('hidden');
            console.log('Som do vídeo ativado!');
        }
    });
}