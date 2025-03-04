const dataInicio = new Date('2024-11-03T00:00:00');

function atualizaContador() {
  const hoje = new Date(); // Pega a data atual
  
  // Cálculo da diferença em anos, meses e dias
  let anos = hoje.getFullYear() - dataInicio.getFullYear();
  let meses = hoje.getMonth() - dataInicio.getMonth();
  let dias = hoje.getDate() - dataInicio.getDate();

  // Ajusta os meses e anos caso o mês atual seja anterior ao mês de início
  if (meses < 0) {
    anos--;
    meses += 12;
  }

  // Ajusta os dias se o dia atual for menor que o dia de início
  if (dias < 0) {
    meses--;
    const ultimoDiaMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
    dias += ultimoDiaMesAnterior;
  }

  // Calcula horas, minutos e segundos restantes
  const horas = hoje.getHours();
  const minutos = hoje.getMinutes();
  const segundos = hoje.getSeconds();

  // Atualizando os elementos no HTML
  document.getElementById("anos").innerText = `${anos} Anos`;
  document.getElementById("meses").innerText = `${meses} Meses`;
  document.getElementById("dias").innerText = `${dias} Dias`;
  document.getElementById("horas").innerText = `${horas} Horas`;
  document.getElementById("minutos").innerText = `${minutos} Minutos`;
  document.getElementById("segundos").innerText = `${segundos} Segundos`;
}

setInterval(atualizaContador, 1000);

