const dataInicio = new Date('2024-11-03T22:50:00');
  function atualizaContador(){
    const hoje = new Date();
    let resultado = hoje - dataInicio;

    const anos = Math.floor(resultado / (1000 * 60 * 60 * 24 * 365));
    resultado -= anos * (1000 * 60 * 60 * 24 * 365);

    const meses = Math.floor(resultado / (1000 * 60 * 60 * 24 * 30)); // Considerando 30 dias por mês
    resultado -= meses * (1000 * 60 * 60 * 24 * 30);

    const dias = Math.floor(resultado / (1000 * 60 * 60 * 24));
    resultado -= dias * (1000 * 60 * 60 * 24);

    const horas = Math.floor(resultado / (1000 * 60 * 60));
    resultado -= horas * (1000 * 60 * 60);

    const minutos = Math.floor(resultado / (1000 * 60));
    resultado -= minutos * (1000 * 60);

    const segundos = Math.floor(resultado / 1000);

    document.getElementById("anos").innerText = `${anos} Anos`;
    document.getElementById("meses").innerText = `${meses} Meses`;
    document.getElementById("dias").innerText = `${dias} Dias`;
    document.getElementById("horas").innerText = `${horas} Horas`;
    document.getElementById("minutos").innerText = `${minutos} Minutos`;
    document.getElementById("segundos").innerText = `${segundos} Segundos`;
  }

setInterval(atualizaContador, 1000);