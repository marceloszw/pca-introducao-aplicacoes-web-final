// funcao executada no body onload da pagina
function load() {
    // funcao que monta os elementos da pagina
    montarPagina();
    
    // funcao que checa o planeta selecionado
    checarPlaneta();

    // pega os elementos mais usados na pagina e coloca em variaveis globais
    pegarElementos();
}

// funcao de selecao do planeta ao clicar sobre a box do mesmo
function selecionar(planeta) {
    // retorna todas as bordas dos boxes para preto e background dos boxes para branco (nao selecionado)
    let boxes = document.querySelectorAll(".box");
        
    
    // funcoes mouseover e mouseout
    let mouseOverFunction = function () {
        this.style.borderColor = "orange";
    }

    let mouseOutFunction = function () {
        this.style.borderColor = "black";
    }

    boxes.forEach((box) => {
        box.style.backgroundColor = "white";
        box.style.borderColor = "black";
        box.onmouseover = mouseOverFunction;
        box.onmouseout = mouseOutFunction;
    });


    let descricao = document.getElementById('descricao');
    
    //encontra o planeta selecionado no array global de planetas
    let planetaSelecionado = planetas.find(o => o.nome === planeta);
    
    //muda a cor de borda do box selecionado
    let boxSelecionado = document.getElementById(planeta);
    boxSelecionado.style.backgroundColor = "orange";
    boxSelecionado.style.borderColor = "yellow";

    descricao.innerHTML = planetaSelecionado.descricao;
}

// funcao de criacao dos elementos html baseados nos planetas do array 'planetas'
function montarPagina() {
    let secPlanetas = document.getElementById('planetas');
        
    planetas.forEach(planeta => {
        secPlanetas.innerHTML += `
            <div id="${planeta.nome}" class="box" onclick="selecionar('${planeta.nome}')">
                <h4>${planeta.nome}</h4>
                <p>Aprenda sobre o planeta ${planeta.nome}</p>
            </div>`
    });
} 

// funcao que checa os parametros da url em busca do planeta selecionado
function checarPlaneta() {
    const urlParams = new URLSearchParams(window.location.search);
    const planetaSelecionado = urlParams.get('planeta');
    console.log(planetaSelecionado)
}


// variaveis globais para pegar os elementos por id
var secPrincipal;
var secPlanetas;
var secDescricao;
var secQuestoes;
var botaoAprender;
var botaoTestar;
var botaoEnviar;
function pegarElementos() {
    secPrincipal = document.getElementById("principal");
    secPlanetas = document.getElementById("planetas");
    secDescricao = document.getElementById("descricao");
    secQuestoes = document.getElementById("questoes");
    botaoAprender = document.getElementById("aprender");
    botaoTestar = document.getElementById("testar");
    botaoEnviar = document.getElementById("enviar");
}

// esconde o texto e exibe o teste multipla escolha
function teste() {
    secPlanetas.style.display = "none";
    secPrincipal.style.display = "none";
    secDescricao.style.display = "none";
    secQuestoes.style.display = "block";
    botaoAprender.style.display = "inline";
    botaoTestar.style.display = "none";
    botaoEnviar.style.display = "inline";

    mostrarQuestoes();
}

// esconde o teste multipla escolha e exibe o conteudo
function aprender() {
    secPlanetas.style.display = "block";
    secPrincipal.style.display = "block";
    secDescricao.style.display = "block";
    secQuestoes.style.display = "none";
    botaoAprender.style.display = "none";
    botaoTestar.style.display = "inline";
    botaoEnviar.style.display = "none";

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

        const retorno = `<fieldset class="questao">
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
    var pergunta = "Qual é o primeiro planeta do sistema solar, mais próximo ao Sol?";
    
    // cria um array key:value com as respostas
    var respostas = [
        {
            resposta : "Marte",
            correta : true
        },
        {
            resposta : "Terra",
            correta : false
        },
        {
            resposta : "Vênus",
            correta : false
        },
        {
            resposta : "Júpiter",
            correta : false
        }  
    ];

    // cria o objeto de questao
    var questao = new Questao(pergunta, respostas);
    document.getElementById("questoes").innerHTML = questao.printQuestao();

    pergunta = "Quantos planetas existem no sistema solar?"

    respostas = [
        {
            resposta : "6",
            correta : false
        },
        {
            resposta : "8",
            correta : true
        },
        {
            resposta : "9",
            correta : false
        },
        {
            resposta : "10",
            correta : false
        }  
    ];

    questao = new Questao(pergunta, respostas);
    document.getElementById("questoes").innerHTML += questao.printQuestao();

  
    pergunta = "Qual elemento abundante existe na atmosfera de Mercúrio?"

    respostas = [
        {
            resposta : "Oxigênio",
            correta : false
        },
        {
            resposta : "Hélio",
            correta : true
        },
        {
            resposta : "Ferro",
            correta : false
        },
        {
            resposta : "Água",
            correta : false
        }  
    ];

    questao = new Questao(pergunta, respostas);
    document.getElementById("questoes").innerHTML += questao.printQuestao();

}

// classe de construcao do planeta, pega nome e descricao
class Planeta {
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }
}

// criacao do array 'planetas' com os devidos planetas e suas descricoes
let planetas = new Array();

let nome = new String();
let descricao = new String();

nome = "Mercúrio";
descricao = `<p>Mercúrio é o primeiro planeta do sistema solar, a contar a partir da proximidade com o Sol, distando-se em apenas 57,9 milhões de quilômetros da estrela em média. Com um diâmetro de 4878 km, é o menor entre os planetas do nosso sistema solar e também o que realiza mais rapidamente o seu movimento de translação, executado a uma velocidade de aproximadamente 47,87 km/s, levando, assim, 88 dias para completar sua volta ao redor do sol.</p>
<p>Quanto ao movimento de rotação, o planeta Mercúrio executa-o apenas três vezes durante duas órbitas de translação, o que faz com que o seu dia solar seja o equivalente a 173 dias terrestres. Além disso, esse movimento de rotação acontece com o seu eixo perpendicular ao plano da órbita, por isso, Mercúrio não apresenta estações do ano e alguns locais não recebem a luz do sol.</p>
<p>A atmosfera de Mercúrio é basicamente composta por átomos de árgon, néon e hélio e apresenta uma pressão muito baixa, cerca de um bilhão de vezes menor do que a da Terra ao nível do mar. As altas temperaturas, em razão da proximidade com o sol, fazem com que esses átomos se dispersem pelo espaço, o que tem como consequências: o pequeno índice de erosão hídrica e eólica; a baixa proteção da atmosfera frente a meteoritos e a incapacidade de se conservar as médias térmicas. Por conta desse último fator, as temperaturas no planeta Mercúrio variam entre 430ºC e -170ºC durante a noite.</p>`;

let mercurio = new Planeta(nome, descricao);
planetas.push(mercurio);

nome = "Vênus";
descricao = `<p>Vênus possui tamanho e massa semelhante a do planeta Terra, por isso os planetas citados eram considerados gêmeos, no entanto, as características parecidas se limitam à proporção corporal. Salvo esse ponto apresentado, os dois planetas são totalmente distintos, uma vez que Vênus não oferece condições para proliferação de vida.</p>
<p>Em Vênus a atmosfera é muito compacta, formada por uma enorme quantidade de gás carbônico, por ser muito densa desenvolve um elevado efeito estufa que faz o planeta produzir altíssimas temperaturas. Onde os raios solares incidem de forma perpendicular na superfície do planeta as temperaturas atingem até 460ºC.</p>
<p>Outra particularidade do planeta Vênus é quanto aos movimentos de rotação e translação. Para a realização total do primeiro movimento são necessários 243 dias (referente aos dias terrestres) e no segundo, 224 dias, dessa forma um ano em Vênus é menor que 1 dia.</p>
<p>O planeta em questão já recebeu diversos nomes, como Lúcifer e Vésper, no Brasil é conhecido como Estrela Dalva. O planeta emite grande luz, diante desse fator é superado somente pela lua, por isso pode ser visualizado a olho nu.</p>`;

let venus = new Planeta(nome, descricao);
planetas.push(venus);

nome = "Terra";
descricao = `<p>Nosso planeta é um dos oito que estão no Sistema Solar orbitando em torno de uma estrela central: o Sol. Essa órbita permite o desenvolvimento da vida devido à temperatura que chega até nós, o que chamamos de radiação solar.</p>
<p>Estima-se que nosso planeta tenha sido formado há, mais ou menos, 4,6 bilhões de anos. De lá pra cá, a Terra passou por constantes mudanças, algumas nítidas, outras bem longas e que os seres humanos não percebem. Tais mudanças podem ocorrer de fatores internos, como a energia do núcleo, ou fatores externos, como chuvas, processos erosivos, ação humana.</p>
<p>A formação do Sistema Solar foi resultado de um colapso entre grandes estrelas, o que gerou uma grande junção de energia. Essa energia, posteriormente, formou os componentes do sistema, como o Sol e demais planetas.</p>
<p>A Terra, há 4,6 bilhões de anos, era uma massa de matéria magmática que, ao longo de milhões de anos, resfriou-se. Esse resfriamento deu origem a uma camada rochosa, a camada litosférica. Esse período é chamado de Era Pré-cambriana.</p>
<p>Ao longo desses bilhões de anos, várias mutações aconteceram no planeta, muitas violentas, como os terremotos e maremotos, também conhecidos por abalos sísmicos. Esses abalos ocorrem de dentro para fora, nas camadas internas da Terra, alterando de forma significativa a superfície terrestre.</p>`;

let terra = new Planeta(nome, descricao);
planetas.push(terra);

nome = "Marte";
descricao = `<p>Marte é chamado de planeta vermelho, em virtude da grande concentração de óxido de ferro no solo. Ele é o quarto planeta do sistema solar, tendo o Sol como ponto de partida. Sua distância para o Sol é de aproximadamente 228 milhões de quilômetros, fato que justifica a baixa temperatura média registrada nesse planeta (-60 °C).</p>
<p>Com essa temperatura, não há possibilidade de existir água no estado líquido. Entretanto, imagens registradas em 2001 pela sonda Mars Global Surveyor mostraram marcas de erosão no planeta, provavelmente provocadas pelo escoamento de água no estado líquido.</p>
<p>O diâmetro de Marte é de 6.794 quilômetros – quase metade do diâmetro da Terra. A atmosfera, muito rarefeita, é composta por gás carbônico, dióxido de carbono, nitrogênio, argônio, néon e oxigênio. Esse planeta possui dois satélites (luas – Phobos e Deimos) e é visível a olho nu durante a noite.</p>`;

let marte = new Planeta(nome, descricao);
planetas.push(marte);