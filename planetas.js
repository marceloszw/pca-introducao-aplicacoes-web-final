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
    //pega os filhos de fieldset e v?? se pelo menos um est?? marcado (quest??o respondida)

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

// classe de gera????o de perguntas e respostas
class Questao {
    constructor(pergunta, respostas) {
        this.pergunta = pergunta;
        this.respostas = respostas;
    }

    // funcao para print das questao (pergunta e resposta)
    printQuestao() {
        const pergunta = `<legend>${this.pergunta}</legend>`;

        // map do array de respostas para impress??o em radio buttons
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
    var pergunta = "Qual ?? o primeiro planeta do sistema solar, mais pr??ximo ao Sol?";
    
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
            resposta : "V??nus",
            correta : false
        },
        {
            resposta : "J??piter",
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

  
    pergunta = "Qual elemento abundante existe na atmosfera de Merc??rio?"

    respostas = [
        {
            resposta : "Oxig??nio",
            correta : false
        },
        {
            resposta : "H??lio",
            correta : true
        },
        {
            resposta : "Ferro",
            correta : false
        },
        {
            resposta : "??gua",
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

nome = "Merc??rio";
descricao = `<p>Merc??rio ?? o primeiro planeta do sistema solar, a contar a partir da proximidade com o Sol, distando-se em apenas 57,9 milh??es de quil??metros da estrela em m??dia. Com um di??metro de 4878 km, ?? o menor entre os planetas do nosso sistema solar e tamb??m o que realiza mais rapidamente o seu movimento de transla????o, executado a uma velocidade de aproximadamente 47,87 km/s, levando, assim, 88 dias para completar sua volta ao redor do sol.</p>
<p>Quanto ao movimento de rota????o, o planeta Merc??rio executa-o apenas tr??s vezes durante duas ??rbitas de transla????o, o que faz com que o seu dia solar seja o equivalente a 173 dias terrestres. Al??m disso, esse movimento de rota????o acontece com o seu eixo perpendicular ao plano da ??rbita, por isso, Merc??rio n??o apresenta esta????es do ano e alguns locais n??o recebem a luz do sol.</p>
<p>A atmosfera de Merc??rio ?? basicamente composta por ??tomos de ??rgon, n??on e h??lio e apresenta uma press??o muito baixa, cerca de um bilh??o de vezes menor do que a da Terra ao n??vel do mar. As altas temperaturas, em raz??o da proximidade com o sol, fazem com que esses ??tomos se dispersem pelo espa??o, o que tem como consequ??ncias: o pequeno ??ndice de eros??o h??drica e e??lica; a baixa prote????o da atmosfera frente a meteoritos e a incapacidade de se conservar as m??dias t??rmicas. Por conta desse ??ltimo fator, as temperaturas no planeta Merc??rio variam entre 430??C e -170??C durante a noite.</p>`;

let mercurio = new Planeta(nome, descricao);
planetas.push(mercurio);

nome = "V??nus";
descricao = `<p>V??nus possui tamanho e massa semelhante a do planeta Terra, por isso os planetas citados eram considerados g??meos, no entanto, as caracter??sticas parecidas se limitam ?? propor????o corporal. Salvo esse ponto apresentado, os dois planetas s??o totalmente distintos, uma vez que V??nus n??o oferece condi????es para prolifera????o de vida.</p>
<p>Em V??nus a atmosfera ?? muito compacta, formada por uma enorme quantidade de g??s carb??nico, por ser muito densa desenvolve um elevado efeito estufa que faz o planeta produzir alt??ssimas temperaturas. Onde os raios solares incidem de forma perpendicular na superf??cie do planeta as temperaturas atingem at?? 460??C.</p>
<p>Outra particularidade do planeta V??nus ?? quanto aos movimentos de rota????o e transla????o. Para a realiza????o total do primeiro movimento s??o necess??rios 243 dias (referente aos dias terrestres) e no segundo, 224 dias, dessa forma um ano em V??nus ?? menor que 1 dia.</p>
<p>O planeta em quest??o j?? recebeu diversos nomes, como L??cifer e V??sper, no Brasil ?? conhecido como Estrela Dalva. O planeta emite grande luz, diante desse fator ?? superado somente pela lua, por isso pode ser visualizado a olho nu.</p>`;

let venus = new Planeta(nome, descricao);
planetas.push(venus);

nome = "Terra";
descricao = `<p>Nosso planeta ?? um dos oito que est??o no Sistema Solar orbitando em torno de uma estrela central: o Sol. Essa ??rbita permite o desenvolvimento da vida devido ?? temperatura que chega at?? n??s, o que chamamos de radia????o solar.</p>
<p>Estima-se que nosso planeta tenha sido formado h??, mais ou menos, 4,6 bilh??es de anos. De l?? pra c??, a Terra passou por constantes mudan??as, algumas n??tidas, outras bem longas e que os seres humanos n??o percebem. Tais mudan??as podem ocorrer de fatores internos, como a energia do n??cleo, ou fatores externos, como chuvas, processos erosivos, a????o humana.</p>
<p>A forma????o do Sistema Solar foi resultado de um colapso entre grandes estrelas, o que gerou uma grande jun????o de energia. Essa energia, posteriormente, formou os componentes do sistema, como o Sol e demais planetas.</p>
<p>A Terra, h?? 4,6 bilh??es de anos, era uma massa de mat??ria magm??tica que, ao longo de milh??es de anos, resfriou-se. Esse resfriamento deu origem a uma camada rochosa, a camada litosf??rica. Esse per??odo ?? chamado de Era Pr??-cambriana.</p>
<p>Ao longo desses bilh??es de anos, v??rias muta????es aconteceram no planeta, muitas violentas, como os terremotos e maremotos, tamb??m conhecidos por abalos s??smicos. Esses abalos ocorrem de dentro para fora, nas camadas internas da Terra, alterando de forma significativa a superf??cie terrestre.</p>`;

let terra = new Planeta(nome, descricao);
planetas.push(terra);

nome = "Marte";
descricao = `<p>Marte ?? chamado de planeta vermelho, em virtude da grande concentra????o de ??xido de ferro no solo. Ele ?? o quarto planeta do sistema solar, tendo o Sol como ponto de partida. Sua dist??ncia para o Sol ?? de aproximadamente 228 milh??es de quil??metros, fato que justifica a baixa temperatura m??dia registrada nesse planeta (-60 ??C).</p>
<p>Com essa temperatura, n??o h?? possibilidade de existir ??gua no estado l??quido. Entretanto, imagens registradas em 2001 pela sonda Mars Global Surveyor mostraram marcas de eros??o no planeta, provavelmente provocadas pelo escoamento de ??gua no estado l??quido.</p>
<p>O di??metro de Marte ?? de 6.794 quil??metros ??? quase metade do di??metro da Terra. A atmosfera, muito rarefeita, ?? composta por g??s carb??nico, di??xido de carbono, nitrog??nio, arg??nio, n??on e oxig??nio. Esse planeta possui dois sat??lites (luas ??? Phobos e Deimos) e ?? vis??vel a olho nu durante a noite.</p>`;

let marte = new Planeta(nome, descricao);
planetas.push(marte);