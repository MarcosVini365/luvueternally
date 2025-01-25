document.addEventListener('DOMContentLoaded', () => {
    const numHearts = 15;  // Quantidade de corações

    for (let i = 0; i < numHearts; i++) {
        let heart = document.createElement('div');
        heart.classList.add('falling-heart');
        heart.style.left = `${Math.random() * 94}vw`;  // Posição aleatória no eixo X
        heart.style.animationDuration = `${Math.random() * 2 + 3}s`;  // Duração aleatória para a animação
        heart.style.animationDelay = `${Math.random() * 2}s`;  // Atraso aleatório para a animação
        document.body.appendChild(heart);
    }
});