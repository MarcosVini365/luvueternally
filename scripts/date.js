const dataInicio = new Date('2024-11-03T00:00:00');

function atualizaContador() {
  const hoje = new Date();
  console.log(hoje);
  let resultado = hoje - dataInicio;

  const anos = Math.floor(resultado / (1000 * 60 * 60 * 24 * 365));
  resultado -= anos * (1000 * 60 * 60 * 24 * 365);

  // Verificando se o ano de "hoje" é bissexto para ajustar fevereiro
  let bissexto = false;
  const anoInicio = dataInicio.getFullYear();
  if ((hoje.getFullYear() % 4 === 0 && hoje.getFullYear() % 100 !== 0) || (hoje.getFullYear() % 400 === 0)) {
    bissexto = true;
  }

  // Meses com 31 dias: janeiro, março, maio, julho, agosto, outubro, dezembro
  // Meses com 30 dias: abril, junho, setembro, novembro
  // Fevereiro: 28 ou 29 dias
  const mesesCom31 = [0, 2, 4, 6, 7, 9, 11];  // 0 = janeiro, 2 = março, etc
  const mesesCom30 = [3, 5, 8, 10]; // 3 = abril, 5 = junho, etc

  let meses = 0;
  const mesInicio = dataInicio.getMonth(); // Mes da data de início (0 = janeiro, 11 = dezembro)
  
  // Calculando os meses completos
  while (resultado >= (1000 * 60 * 60 * 24 * 30)) {
    meses++;
    const mesAtual = (mesInicio + meses) % 12; // mês atual no ciclo

    if (mesAtual === 1) { // Fevereiro
      if (bissexto) {
        if (resultado >= (1000 * 60 * 60 * 24 * 29)) {
          resultado -= 1000 * 60 * 60 * 24 * 29; // Fevereiro (ano bissexto)
        }
      } else {
        if (resultado >= (1000 * 60 * 60 * 24 * 28)) {
          resultado -= 1000 * 60 * 60 * 24 * 28; // Fevereiro (ano não bissexto)
        }
      }
    } else if (mesesCom31.includes(mesAtual)) { // Meses com 31 dias
      if (resultado >= (1000 * 60 * 60 * 24 * 31)) {
        resultado -= 1000 * 60 * 60 * 24 * 31;
      }
    } else if (mesesCom30.includes(mesAtual)) { // Meses com 30 dias
      if (resultado >= (1000 * 60 * 60 * 24 * 30)) {
        resultado -= 1000 * 60 * 60 * 24 * 30;
      }
    }
  }

  // Calculando os dias, horas, minutos e segundos restantes
  const dias = Math.floor(resultado / (1000 * 60 * 60 * 24));
  resultado -= dias * (1000 * 60 * 60 * 24);

  const horas = Math.floor(resultado / (1000 * 60 * 60));
  resultado -= horas * (1000 * 60 * 60);

  const minutos = Math.floor(resultado / (1000 * 60));
  resultado -= minutos * (1000 * 60);

  const segundos = Math.floor(resultado / 1000);

  // Atualizando os elementos no HTML
  document.getElementById("anos").innerText = `${anos} Anos`;
  document.getElementById("meses").innerText = `${meses} Meses`;
  document.getElementById("dias").innerText = `${dias} Dias`;
  document.getElementById("horas").innerText = `${horas} Horas`;
  document.getElementById("minutos").innerText = `${minutos} Minutos`;
  document.getElementById("segundos").innerText = `${segundos} Segundos`;
}

setInterval(atualizaContador, 1000);
