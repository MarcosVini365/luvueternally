// Espera o carregamento completo da página
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
  
    // Simula o carregamento (tempo de exibição da tela de loading)
    setTimeout(() => {
      loadingScreen.style.opacity = '0'; // Altera a opacidade para 0 (invisível)+
     // Após o tempo, esconde a tela de loading
    }, 3000);// Exibe por 3 segundos
  
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 5000);
});