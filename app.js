const form = document.querySelector("form")
const input = document.querySelector("#pesquisa--pais")
form.addEventListener("submit", e => {
    e.preventDefault()
}
)
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") buscarDadosPais(input.value)
})

let apiData

const buscarDadosPais = function (pais) {
    fetch(`https://restcountries.com/v3.1/translation/${pais}`)
        .then((resposta) => resposta.json())
        .then((dados) => {
            if (dados.status === 404) {
                throw new Error("O pais não foi encontrado, verifique o nome!")
            }
            const paisEncontrado = dados.filter((dado) => dado.translations.por.common === pais)
            apiData = dados
            criarCard(paisEncontrado)
        }).catch(erro => alert(erro))
}

function criarCard(dados) {
    const pais = dados[0]
    const nomePais = pais.translations.por.common
    const populacao = pais.population.toLocaleString("pt-br")
    const flag = pais.flags.png
    const continente = pais.continents;
    const capital = pais.capital
    const extensao = pais.area.toLocaleString("pt-br")
    const [moeda] = Object.values(pais.currencies)

    const card = document.createElement("article");
    card.classList.add("card--pais");
    const conteudo = `<img src=${flag} alt="" class="bandeira--pais">
    <div class="card--content">
        <h2 class="nome--pais">${nomePais}</h2>
        <span class="populacao--pais"><i class="fa-solid fa-people-group"></i> ${populacao}</span>
        <span class="continente--pais"><i class="fa-solid fa-earth-americas"></i>${continente}</span>
        <span class="capital--pais"><i class="fa-solid fa-landmark-flag"></i>${capital}</span>
        <span class="moeda--pais"><i class="fa-solid fa-coins"></i>${moeda.symbol}  ${moeda.name}</span>
        <span class="tamanho--pais"><i class="fa-solid fa-map"></i>${extensao}</span>
    </div>`
    card.innerHTML = conteudo;
    document.querySelector(".container--cards").append(card);

}