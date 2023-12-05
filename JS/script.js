// Para diminuir o navbar em telas
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', (event) => {
        nav.classList.add('active');
        close.classList.add('active'); // Adiciona a classe 'active' ao #close quando o menu é clicado

        // Evitar que o evento seja propagado para o elemento pai (i.e., #bar)
        event.stopPropagation();
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
        close.classList.remove('active'); // Remove a classe 'active' ao #close quando o botão de fechar é clicado
    });
}

// Seleciona elementos do DOM
let iconeCarrinho = document.getElementById('icone-carrinho');
let iconeCarrinhoMobile = document.getElementById('icone-carrinho-mobile');
let carrinho = document.querySelector('.carrinho1');
let fecharCarrinho = document.getElementById('fechar-carrinho');
let conteudoCarrinho = document.querySelector('.conteudo-carrinho');
let precoTotalElemento = document.querySelector('.preco-total');
let quantidadeCarrinhoElemento = document.getElementById('quantidade-carrinho');

// Variável para armazenar a quantidade no carrinho
let quantidadeCarrinho = 0;

// Adiciona event listeners
iconeCarrinho.addEventListener('click', () => {
    carrinho.classList.add('ativo');
    carrinho.classList.add('mostrar-carrinho');
});

fecharCarrinho.addEventListener('click', () => {
    carrinho.classList.remove('ativo');
    // Adiciona um pequeno atraso para garantir que a transição da classe 'mostrar-carrinho' seja removida após o fechamento do carrinho
    setTimeout(() => {
        carrinho.classList.remove('mostrar-carrinho');
    }, 300);
});

// Função para adicionar um produto ao carrinho
function adicionarProdutoAoCarrinho(titulo, preco, imgProduto) {
    var nomesItensCarrinho = conteudoCarrinho.getElementsByClassName('titulo-produto');

    for (var i = 0; i < nomesItensCarrinho.length; i++) {
        if (nomesItensCarrinho[i].innerText === titulo) {
            alert("Você adicionou este item ao seu carrinho");
            return;
        }
    }

    var caixaCompraCarrinho = document.createElement('div');
    caixaCompraCarrinho.classList.add('caixa-carrinho');

    var conteudoCaixaCompra = `
        <img src="${imgProduto}" alt="" class="img-carrinho">
        <div class="detalhes-caixa-carrinho">
            <div class="titulo-produto">${titulo}</div>
            <div class="preco">${preco}</div>
            <label for="quantidade">Quantidade:</label>
            <input type="number" class="quantidade-carrinho" value="1" min="1">
        </div>
        <i class='bx bx-trash-alt remover-carrinho'></i>
    `;

    caixaCompraCarrinho.innerHTML = conteudoCaixaCompra;
    conteudoCarrinho.appendChild(caixaCompraCarrinho);

    // Adiciona listener de evento para o input de quantidade
    var inputQuantidade = caixaCompraCarrinho.getElementsByClassName('quantidade-carrinho')[0];
    inputQuantidade.addEventListener('change', atualizarTotal);

    caixaCompraCarrinho.getElementsByClassName('remover-carrinho')[0].addEventListener('click', removerItemCarrinho);

    alert("Você adicionou este item ao seu carrinho");
    atualizarTotal();

    // Incrementa a quantidade no carrinho
    quantidadeCarrinho++;
    atualizarQuantidadeCarrinho();
}

// Função para remover um item do carrinho
function removerItemCarrinho(evento) {
    var itemCarrinho = evento.target.closest('.caixa-carrinho');
    itemCarrinho.remove();
    atualizarTotal();

    // Decrementa a quantidade no carrinho
    quantidadeCarrinho--;
    atualizarQuantidadeCarrinho();
}

// Função para limpar o carrinho
function limparCarrinho() {
    while (conteudoCarrinho.hasChildNodes()) {
        conteudoCarrinho.removeChild(conteudoCarrinho.firstChild);
    }
    quantidadeCarrinho = 0;
    atualizarQuantidadeCarrinho();
}

// Função para atualizar o total no carrinho
function atualizarTotal() {
    var caixasCarrinho = conteudoCarrinho.getElementsByClassName('caixa-carrinho');
    var total = 0;

    for (var i = 0; i < caixasCarrinho.length; i++) {
        var caixaCarrinho = caixasCarrinho[i];
        var elementoPreco = caixaCarrinho.getElementsByClassName('preco')[0];
        var elementoQuantidade = caixaCarrinho.getElementsByClassName('quantidade-carrinho')[0];
        var preco = parseFloat(elementoPreco.innerText.replace('R$', ""));
        var quantidade = parseInt(elementoQuantidade.value, 10);
        total += preco * quantidade;
    }

    total = total.toFixed(2);
    precoTotalElemento.innerText = 'R$' + total;
}

// Função para atualizar a quantidade no ícone do carrinho
function atualizarQuantidadeCarrinho() {
    quantidadeCarrinhoElemento.innerText = quantidadeCarrinho.toString();

    // Se a quantidade for maior que 0, exiba o span, caso contrário, oculte
    quantidadeCarrinhoElemento.style.display = quantidadeCarrinho > 0 ? 'inline' : 'none';
}

// Adiciona event listeners para os botões 'Adicionar ao Carrinho'
var botoesAdicionarCarrinho = document.querySelectorAll('.adicionar-carrinho');

botoesAdicionarCarrinho.forEach(function (botao) {
    botao.addEventListener("click", function (evento) {
        // Evitar que o evento seja propagado para o elemento pai (i.e., div.pro)
        evento.stopPropagation();

        var produtosLoja = evento.target.closest('.pro');
        var titulo = produtosLoja.querySelector('.titulo-produto span').innerText;
        var preco = produtosLoja.querySelector('.preco').innerText;
        var imgProduto = produtosLoja.querySelector('.imagem-produto').src;

        // Parte fixa da URL dos produtos
        var parteFixaURL = '../PRODUTOS_HTML/';

        // Parte variável da URL gerada a partir do título
        var parteVariavelURL = gerarNomeArquivo(titulo) + '.html';

        // Combina as partes fixa e variável para obter a URL completa do produto
        var urlProduto = parteFixaURL + parteVariavelURL;

        // Chama a função redirecionar com a URL específica para cada produto
        redirecionar(urlProduto);

        // Chama a função adicionarProdutoAoCarrinho com os dados do produto
        adicionarProdutoAoCarrinho(titulo, preco, imgProduto);
    });
});

function redirecionar(url) {
    window.location.href = url;
}

function adicionarAoCarrinho(event, titulo, preco, imgProduto) {
    // Lógica para adicionar ao carrinho, por exemplo, exibindo uma mensagem

    // Evitar que o evento seja propagado para o elemento pai (div.pro)
    event.stopPropagation();

    // Chamar a função adicionarProdutoAoCarrinho com os dados do produto
    adicionarProdutoAoCarrinho(titulo, preco, imgProduto);
}

// Adiciona event listeners
if (iconeCarrinho) {
    iconeCarrinho.addEventListener('click', (event) => {
        event.stopPropagation();
        carrinho.classList.add('ativo');
        carrinho.classList.add('mostrar-carrinho');
    });
}

if (iconeCarrinhoMobile) {
    iconeCarrinhoMobile.addEventListener('click', () => {
        carrinho.classList.add('ativo');
        carrinho.classList.add('mostrar-carrinho');
    });
}

if (fecharCarrinho) {
    fecharCarrinho.addEventListener('click', () => {
        carrinho.classList.remove('ativo');
        carrinho.classList.remove('mostrar-carrinho');
    });
}

// Função para aparecer o alert no botão da Newsletter

function cadastrarNewsletter() {
    // Obter o valor do campo de e-mail
    var email = document.getElementById("emailInput").value;

    // Validar se o campo de e-mail não está vazio
    if (email.trim() === "") {
        alert("Por favor, insira um endereço de e-mail válido.");
    } else {
        // Exibir o alerta de sucesso
        alert("E-mail cadastrado com sucesso!");
    }
}

// Script para alerta quando usúario enviar mensagem

document.getElementById('contatoForm').addEventListener('submit', function () {
    // Limpa os campos do formulário após o envio
    document.getElementById('contatoForm').reset();
    
    // Exibe um alerta 
    alert('Mensagem enviada com sucesso!');
});