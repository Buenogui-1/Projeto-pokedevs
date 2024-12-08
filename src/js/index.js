/* § serve para diferenciar pokedevs de imagens qualquer

    OBJETIVO - quando clicar no pokedev da listagem temos que esconder o cartão do pokedev aberto e mostrar o cartão correspondente ao que foi selecionado na listagem
    PASSO 1 - precisamos criar uma variável no JS pra trabalhar com a listagem de pokedevs
    PASSO 2 - Identificar o evento de clique no elemento da listagem
    PASSO 3 - remover a classe aberto só do cartão que tá aberto
    PASSO 4 - ao clicar em um pokedev da lista pegamos o id desse pokedev pra saber qual cartão abrir
    PASSO 5 - remover a classe ativo que marca o pokedev selecionado na listagem
    PASSO 6 - adicinar a classe ativo no pokedev selecionado na listagem
*/

//PASSO 1 - precisamos criar uma variável no JS pra trabalhar com a listagem de pokedevs
const listaSelecaoPokedevs = document.querySelectorAll(".pokedev");

// PASSO 2 - Identificar o evento de clique no elemento da listagem
listaSelecaoPokedevs.forEach(pokedev => {
    pokedev.addEventListener("click", () => {
        //PASSO 3 - remover a classe aberto só do cartão que tá aberto
        esconderCartao();

        //PASSO 4 - ao clicar em um pokedev da lista pegamos o id desse pokedev pra saber qual cartão abrir
        const idPokedevSelecionado = mostrarCartao(pokedev);

        //PASSO 5 - remover a classe ativo que marca o pokedev selecionado na listagem
        desativarClasseAtivo();

        //PASSO 6 - adicinar a classe ativo no pokedev selecionado na listagem
        ativarClasseAtivo(idPokedevSelecionado);
    })
})

function ativarClasseAtivo(idPokedevSelecionado) {
    const pokedevSelecionadoNaListagem = document.getElementById(idPokedevSelecionado);
    pokedevSelecionadoNaListagem.classList.add("ativo");
}

function desativarClasseAtivo() {
    const pokedevAtivoNaListagem = document.querySelector(".ativo");
    pokedevAtivoNaListagem.classList.remove("ativo");
}

function mostrarCartao(pokedev) {
    const idPokedevSelecionado = pokedev.attributes.id.value;
    const idDoCartaoPokedevParaAbrir = "cartao-" + idPokedevSelecionado;
    const cartaoPokedevParaAbrir = document.getElementById(idDoCartaoPokedevParaAbrir);
    cartaoPokedevParaAbrir.classList.add("aberto");
    return idPokedevSelecionado;
}

function esconderCartao() {
    const cartaoPokedevAberto = document.querySelector(".aberto");
    cartaoPokedevAberto.classList.remove("aberto");
}


//para o botão de pesquisa

// Pega o botão
const botaoSelecionar = document.getElementById("botao");

//pega o input da pesquisa
const inputPesquisa = document.querySelector("input[name='pesquisadepokedevs']");

// Coloca o evento de clicar no botão
botaoSelecionar.addEventListener("click", () => {
    // Pega o valor do input
    const idPokedevSelecionado = inputPesquisa.value.toLowerCase(); // Normaliza o texto para evitar diferenças de maiúsculas/minúsculas

    // Busca o elemento na listagem que corresponde ao valor selecionado
    const pokedevSelecionadoNaListagem = document.getElementById(idPokedevSelecionado);

    // Valida se o elemento correspondente existe
    if (!pokedevSelecionadoNaListagem) {
        alert("Pokedev não encontrado na Devdex! Será um novo Pokedev?");
        return;
    }

    // Passo 3 - Esconde o cartão atualmente aberto
    esconderCartao();

    // Passo 4 - Mostra o cartão correspondente ao Pokedev selecionado
    mostrarCartao(pokedevSelecionadoNaListagem);

    // Passo 5 - Remove a classe ativo da listagem atual
    desativarClasseAtivo();

    // Passo 6 - Adiciona a classe ativo ao Pokedev selecionado
    ativarClasseAtivo(idPokedevSelecionado);
});



//botão do natal

// Seleciona o botão, o body e as imagens dos Pokedevs
const button = document.getElementById("natalButton");
const body = document.body;
const pokedevImages = document.querySelectorAll("img");

// Adiciona o evento de clique ao botão
button.addEventListener("click", () => {
    // Alterna o modo Natal no fundo (adiciona ou remove a classe `natal` no body)
    body.classList.toggle("natal");

    // Filtra e altera apenas as imagens que têm a sigla "§" no caminho
    pokedevImages.forEach((img) => {
        // Decodifica o caminho atual da imagem
        const decodedSrc = decodeURIComponent(img.src);

        if (decodedSrc.includes("§")) { // Verifica se o caminho contém "§"
            const isNatal = body.classList.contains("natal");

            // Ajusta o nome da imagem com base no modo Natal
            let updatedSrc;
            if (isNatal) {
                // Se estamos ativando o modo Natal, adiciona "_natal" após "§"
                if (!decodedSrc.includes("_natal")) {
                    updatedSrc = decodedSrc.replace("§.png", "§_natal.png");
                }
            } else {
                // Se estamos desativando, remove "_natal" após "§"
                if (decodedSrc.includes("_natal")) {
                    updatedSrc = decodedSrc.replace("§_natal.png", "§.png");
                }
            }

            // Atualiza o atributo src somente se houver mudanças
            if (updatedSrc) {
                img.src = encodeURI(updatedSrc); // Reaplica a codificação no caminho atualizado
            }
        }
    });

    // Atualiza o texto do botão
    button.textContent = body.classList.contains("natal")
        ? "Desativar Modo Natal"
        : "Ativar Modo Natal";
});
