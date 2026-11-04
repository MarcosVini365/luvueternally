const TARGET_DATE = new Date('2024-11-03T00:00:00');

// ==========================================
// CARROSSEL
// ==========================================
const photosArr = [
    "img/amor/amor1.jpeg",
    "img/amor/amor2.jpg",
    "img/amor/amor4.jpeg",
    "img/amor/amor3.jpeg",
    "img/amor/amor5.jpeg",
    "img/amor/amor6.jpeg",
    "img/amor/amor7.jpg",
    "img/amor/amor8.jpg",
    "img/amor/amor9.jpg",
    "img/amor/amor10.jpg",
];

const container = document.getElementById('carouselContainer');
let currentIndex = 0;
let isDragging = false;
let startX = 0;
let dragPixels = 0;

// Renderiza a estrutura inicial dos itens apenas uma vez
function initCarouselDOM() {
    container.innerHTML = '';
    photosArr.forEach((src, idx) => {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.dataset.index = idx;

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Foto ${idx + 1}`;
    item.appendChild(img);

    item.addEventListener('click', () => {
        // Permite clique direto se não estiver no meio de um arraste significativo
        if (Math.abs(dragPixels) < 10) {
        currentIndex = idx;
        dragPixels = 0;
        updateCarouselTransforms(false);
        }
    });

    container.appendChild(item);
    });
}

// Atualiza as transformações 3D dinamicamente de forma precisa e fluida
function updateCarouselTransforms(activeDrag = false) {
    const items = container.querySelectorAll('.carousel-item');
    const total = photosArr.length;
    
    // Largura base de cada passo de movimento (~240px)
    const stepWidth = 240; 
    // Deslocamento contínuo normalizado
    const offsetDrag = dragPixels / stepWidth;

    items.forEach((item) => {
    const idx = parseInt(item.dataset.index, 10);

    // Menor distância circular no array infinito
    let rawOffset = (idx - currentIndex) % total;
    if (rawOffset > total / 2) rawOffset -= total;
    if (rawOffset < -total / 2) rawOffset += total;

    // Offset dinâmico combinando índice + valor do arraste em tempo real
    const effectiveOffset = rawOffset + offsetDrag;
    const absOffset = Math.abs(effectiveOffset);

    // Transição suave só ativa quando O USUÁRIO SOLTA o clique/toque
    item.style.transition = activeDrag 
        ? 'none' 
        : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease, filter 0.4s ease';

    if (absOffset > 2.5) {
        item.style.opacity = '0';
        item.style.pointerEvents = 'none';
        item.style.transform = `translateX(${effectiveOffset * 220}px) scale(0.5) rotateY(0deg)`;
    } else {
        // Cálculo preciso de Coverflow
        const translateX = effectiveOffset * 210;
        const rotateY = effectiveOffset * -28; // Inversão correta de rotação 3D
        const translateZ = -absOffset * 140;
        const scale = Math.max(1 - absOffset * 0.15, 0.65);

        item.style.zIndex = Math.round(100 - absOffset * 10);
        item.style.opacity = (1 - absOffset * 0.22).toString();
        item.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        item.style.pointerEvents = absOffset < 1.2 ? 'auto' : 'none';
    }
    });
}

// Gestão de Eventos de Drag/Touch
function handleStart(e) {
    isDragging = true;
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    dragPixels = 0;
}

function handleMove(e) {
    if (!isDragging) return;
    const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    dragPixels = currentX - startX; // Direção intuitiva do arraste
    updateCarouselTransforms(true);
}

function handleEnd() {
    if (!isDragging) return;
    isDragging = false;
    const total = photosArr.length;
    const threshold = 60; // Sensibilidade de 60px para avançar/voltar o slide

    if (dragPixels < -threshold) {
    // Arrastou para a esquerda -> Avança foto
    currentIndex = (currentIndex + 1) % total;
    } else if (dragPixels > threshold) {
    // Arrastou para a direita -> Volta foto
    currentIndex = (currentIndex - 1 + total) % total;
    }

    // Reseta deslocamento e faz o snap suave para a nova foto centralizada
    dragPixels = 0;
    updateCarouselTransforms(false);
}

// Listeners do Mouse
container.addEventListener('mousedown', handleStart);
window.addEventListener('mousemove', handleMove);
window.addEventListener('mouseup', handleEnd);

// Listeners do Touch (Mobile)
container.addEventListener('touchstart', handleStart, { passive: true });
window.addEventListener('touchmove', handleMove, { passive: true });
window.addEventListener('touchend', handleEnd);

// Inicialização do Carrossel Corrigido
initCarouselDOM();
updateCarouselTransforms(false);

// ==================
// CONTADOR DE TEMPO
// =================
function updateTimer() {
    let now = new Date();
    let diff = Math.abs(now - TARGET_DATE);

    
    let seconds = now.getSeconds();
    let minutes = now.getMinutes();
    let hours = now.getHours();
    let daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));

    let years = now.getFullYear() - TARGET_DATE.getFullYear();
    let months = now.getMonth() - TARGET_DATE.getMonth();
    let days = now.getDate() - TARGET_DATE.getDate();

    if (months < 0){
        years--;
        months += 12;
    }

    if(days < 0){
        months--;
        const ultimoDiaMesAnterior = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += ultimoDiaMesAnterior;
    }
    
    document.getElementById('years').textContent = String(years).padStart(2, '0');
    document.getElementById('months').textContent = String(months).padStart(2, '0');
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateTimer, 1000);
updateTimer();


// ========
// PLAYER
// ========
const AUDIO_SRC = 'Miller - Congratulations feat. Bilal (No Intro) - J.mp3'; 

const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');

// Cria o elemento de áudio nativo
const audioTrack = new Audio(AUDIO_SRC);
audioTrack.play();
audioTrack.volume = 0.2;
audioTrack.loop = true; // Mantém a música tocando em loop

let isPlaying = false;

playBtn.addEventListener('click', () => {
  isPlaying = !isPlaying;

  if (isPlaying) {
    // Toca o arquivo MP3
    audioTrack.play().then(() => {
      playIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    }).catch(error => {
      console.error("Erro ao reproduzir áudio:", error);
      isPlaying = false;
    });
  } else {
    // Pausa o arquivo MP3
    audioTrack.pause();
    playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
  }
});

function criarCoracao() {
  const coracao = document.createElement('img');
  
  // Caminho
  coracao.src = 'img/red-heart-icon.png'; 
  coracao.classList.add('coracao');
  
  // Posição horizontal
  coracao.style.left = Math.random() * window.innerWidth + 'px';
  
  // Tamanho aleatório
  const tamanho = Math.random() * 20 + 20;
  coracao.style.width = tamanho + 'px';
  coracao.style.height = tamanho + 'px';
  
  // Duração da queda
  const duracao = Math.random() * 3 + 2; // entre 2s e 5s
  coracao.style.animationDuration = duracao + 's';

  document.body.appendChild(coracao);

  // Remove o elemento
  setTimeout(() => {
    coracao.remove();
  }, duracao * 1000);
}

setInterval(criarCoracao, 300);