// funcao executada no body onload da pagina
function load() {
    // pega os elementos mais usados na pagina e coloca em variaveis globais
    pegarElementos();
}

// variaveis globais para pegar os elementos por id
var secPrincipal;
var secinsetos;
var secDescricao;
var secQuestoes;
var botaoAprender;
var botaoTestar;
var botaoEnviar;
function pegarElementos() {
    secPrincipal = document.getElementById("principal");
    secinsetos = document.getElementById("insetos");
    secDescricao = document.getElementById("descricao");
    secQuestoes = document.getElementById("questoes");
    botaoAprender = document.getElementById("aprender");
    botaoTestar = document.getElementById("testar");
    botaoEnviar = document.getElementById("enviar");
}

// esconde o texto e exibe o teste multipla escolha
function teste() {
    secinsetos.style.display = "none";
    secPrincipal.style.display = "none";
    secDescricao.style.display = "none";
    secQuestoes.style.display = "block";
    botaoAprender.style.display = "inline";
    botaoTestar.style.display = "none";
    botaoEnviar.style.display = "inline";


    mostrarQuestoes();
}

function enviar() {
    //pega os filhos de fieldset e vê se pelo menos um está marcado (questão respondida)

    let questoesRespondidas = 0;
    const radios = document.getElementsByTagName("input");
    for (var i=0; i < radios.length; i++) {
        if (radios[i].type="radio") {
            if (radios[i].checked) {
                questoesRespondidas++;
            }
        }
    }

    if (questoesRespondidas < 3) {
        document.writeln("Vc nao respondeu todas as questoes");
    }

    else {
        for (var i=0; i < radios.length; i++) {
            if (radios[i].type="radio") {
                if (radios[i].checked) {
                    if (radios[i].value == "true") {
                        let parentField = radios[i].parentElement.parentElement;
                        const retorno = parentField.querySelector(".retorno")
                        retorno.innerHTML = "<span style='background-color: lightgreen'>ACERTOU</span>";
                    }

                    else {
                        let parentField = radios[i].parentElement.parentElement;
                        const retorno = parentField.querySelector(".retorno")
                        retorno.innerHTML = "<span style='background-color: orange'>ERROU</span>";
                    }
                }
            }
        }
    }
}

// esconde o teste multipla escolha e exibe o conteudo
function aprender() {
    secPrincipal = document.getElementById("principal");
    secinsetos = document.getElementById("insetos");
    secDescricao = document.getElementById("descricao");
    secQuestoes = document.getElementById("questoes")
    botaoAprender = document.getElementById("aprender")

    secinsetos.style.display = "block";
    secPrincipal.style.display = "block";
    secDescricao.style.display = "block";
    secQuestoes.style.display = "none";
    botaoAprender.style.display = "none";
    botaoTestar.style.display = "block";
    botaoEnviar.style.display = "none";

}

// classe de geração de perguntas e respostas
class Questao {
    constructor(pergunta, respostas) {
        this.pergunta = pergunta;
        this.respostas = respostas;
    }

    // funcao para print das questao (pergunta e resposta)
    printQuestao() {
        const pergunta = `<legend>${this.pergunta}</legend>`;

        // map do array de respostas para impressão em radio buttons
        const respostas = this.respostas.map(function(item, indice){
            return `<div><input type="radio" id="${indice}" name="${pergunta}" value="${item.correta}" >
            <label for="${indice}">${item.resposta}</label></div>`
        });

        const retorno = `<fieldset id="questao">
            ${pergunta}
            ${respostas.join("")}
            <br>
            <div class="retorno"></div>
        </fieldset>`;

      return retorno;
    }
}


// monta a questao com pergunta e array respostas
function mostrarQuestoes() {
    var pergunta = "De que é composto o ar?";
    
    // cria um array key:value com as respostas
    var respostas = [
        {
            resposta : "Somente oxigênio",
            correta : false
        },
        {
            resposta : "Nitrogênio e oxigênio",
            correta : true
        },
        {
            resposta : "Somente nitrogênco",
            correta : false
        },
        {
            resposta : "Gás hélio",
            correta : false
        }  
    ];

    // cria o objeto de questao
    var questao = new Questao(pergunta, respostas);
    document.getElementById("questoes").innerHTML = questao.printQuestao();

    pergunta = "Qual é um dos fatores que causa a poluição do ar?"

    respostas = [
        {
            resposta : "As águas de esgoto",
            correta : false
        },
        {
            resposta : "O crescimento das cidades",
            correta : true
        },
        {
            resposta : "A má alimentação",
            correta : false
        },
        {
            resposta : "O uso de computadores",
            correta : false
        }  
    ];

    questao = new Questao(pergunta, respostas);
    document.getElementById("questoes").innerHTML += questao.printQuestao();

  
    pergunta = "O que as plantas fazem para melhorar a qualidade do ar?"

    respostas = [
        {
            resposta : "Absorvem os gases",
            correta : false
        },
        {
            resposta : "Adubam o solo",
            correta : false
        },
        {
            resposta : "Liberam oxigênio e obsorvem gás carbônico",
            correta : true
        },
        {
            resposta : "Produzem frutos",
            correta : false
        }  
    ];

    questao = new Questao(pergunta, respostas);
    document.getElementById("questoes").innerHTML += questao.printQuestao();

}