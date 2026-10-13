import { perguntas } from "./perguntas.js";
import { embaralhar } from "./aleatorio.js";

const telaInicial = document.querySelector(".tela-inicial");
const botaoIniciar = document.querySelector(".iniciar-btn");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoNovamente = document.querySelector(".novamente-btn");

let perguntasDoJogo = [];
let atual = 0;
let historiaFinal = [];

botaoIniciar.addEventListener("click", iniciaJogo);
botaoNovamente.addEventListener("click", reiniciaJogo);

function iniciaJogo() {
    atual = 0;
    historiaFinal = [];
    perguntasDoJogo = embaralhar(perguntas);

    telaInicial.style.display = "none";
    caixaPerguntas.classList.remove("mostrar");
    caixaAlternativas.classList.remove("mostrar");
    caixaResultado.classList.remove("mostrar");

    mostraPergunta();
}

function mostraPergunta() {
    if (atual >= perguntasDoJogo.length) {
        mostraResultado();
        return;
    }

    const perguntaAtual = perguntasDoJogo[atual];

    caixaPerguntas.textContent =
        `Pergunta ${atual + 1} de ${perguntasDoJogo.length}: ${perguntaAtual.enunciado}`;

    caixaAlternativas.innerHTML = "";

    perguntaAtual.alternativas.forEach((alternativa) => {
        const botao = document.createElement("button");
        botao.textContent = alternativa.texto;

        botao.addEventListener("click", () => {
            historiaFinal.push(alternativa.resultado);
            atual++;
            mostraPergunta();
        });

        caixaAlternativas.appendChild(botao);
    });

    caixaPerguntas.classList.add("mostrar");
    caixaAlternativas.classList.add("mostrar");
    caixaResultado.classList.remove("mostrar");
}

function mostraResultado() {
    caixaPerguntas.classList.remove("mostrar");
    caixaAlternativas.classList.remove("mostrar");

    textoResultado.innerHTML = "";

    const introducao = document.createElement("p");
    introducao.textContent =
        "Você concluiu sua missão! Veja o que suas escolhas nos ensinam:";

    textoResultado.appendChild(introducao);

    historiaFinal.forEach((resultado, indice) => {
        const paragrafo = document.createElement("p");
        paragrafo.textContent = `${indice + 1}. ${resultado}`;
        textoResultado.appendChild(paragrafo);
    });

    const conclusao = document.createElement("p");
    conclusao.textContent =
        "O futuro da Inteligência Artificial depende também das escolhas humanas. Use a tecnologia com responsabilidade, proteja seus dados e verifique as informações.";

    textoResultado.appendChild(conclusao);
    caixaResultado.classList.add("mostrar");
}

function reiniciaJogo() {
    atual = 0;
    historiaFinal = [];

    caixaResultado.classList.remove("mostrar");
    caixaPerguntas.classList.remove("mostrar");
    caixaAlternativas.classList.remove("mostrar");

    textoResultado.innerHTML = "";
    telaInicial.style.display = "block";
}
